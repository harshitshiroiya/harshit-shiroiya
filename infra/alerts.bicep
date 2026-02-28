// ============================================================================
// Azure Monitor Alerts for harshitshiroiya.com
// - Error alert: fires when any [ERROR] log is detected
// - New visitor alert: fires when >5 new unique IPs visit in a 15-min window
// - Daily visitor summary: daily digest of new IPs
// All alerts email harshitshiroiya@gmail.com with IP details
// ============================================================================

@description('Resource group location')
param location string = resourceGroup().location

@description('Name of the existing Log Analytics workspace')
param logAnalyticsWorkspaceName string

@description('Email address to send alerts to')
param alertEmail string = 'harshitshiroiya@gmail.com'

@description('Container app name for filtering logs')
param containerAppName string = 'harshit-shiroiya'

// ============================================================================
// KQL query variables (regular strings support ${} interpolation in Bicep)
// ============================================================================
var errorQuery = 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[ERROR]" or Log_s has "ECONNREFUSED" or Log_s has "ENOTFOUND" or Log_s has "uncaughtException" or Log_s has "unhandledRejection" | extend IP = extract(@"IP:\\s([^\\s|]+)", 1, Log_s) | extend ErrorMessage = Log_s | project TimeGenerated, ErrorMessage, IP'

var newVisitorQuery = 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[VISITOR]" and Log_s has "New: true" | extend IP = extract(@"IP:\\s([^\\s|]+)", 1, Log_s) | extend Device = extract(@"\\|\\s(\\w+/\\w+/\\w+)\\s\\|", 1, Log_s) | where isnotempty(IP) | summarize NewIPCount = dcount(IP), IPList = make_set(IP, 100), DeviceList = make_set(Device, 100) by bin(TimeGenerated, 15m) | where NewIPCount > 5 | extend IPAddresses = strcat_array(IPList, ", ") | extend Devices = strcat_array(DeviceList, ", ") | project TimeGenerated, NewIPCount, IPAddresses, Devices'

var dailyVisitorQuery = 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[VISITOR]" and Log_s has "New: true" | extend IP = extract(@"IP:\\s([^\\s|]+)", 1, Log_s) | extend Device = extract(@"\\|\\s(\\w+/\\w+/\\w+)\\s\\|", 1, Log_s) | where isnotempty(IP) | summarize NewIPCount = dcount(IP), IPList = make_set(IP, 200) by bin(TimeGenerated, 1d) | where NewIPCount > 0'

var dashboardUrl = 'https://portal.azure.com/#@/resource${logAnalyticsWorkspace.id}/logs'

var investigateErrorKql = 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[ERROR]" | project TimeGenerated, Log_s | order by TimeGenerated desc | take 20'

var investigateVisitorKql = 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[VISITOR]" and Log_s has "New: true" | extend IP = extract(@"IP:\\s([^\\s|]+)", 1, Log_s) | extend Device = extract(@"\\|\\s(\\w+/\\w+/\\w+)\\s\\|", 1, Log_s) | summarize count() by IP, Device | order by count_ desc'

var investigateDailyKql = 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[VISITOR]" and Log_s has "New: true" | where TimeGenerated > ago(1d) | extend IP = extract(@"IP:\\s([^\\s|]+)", 1, Log_s) | extend Device = extract(@"\\|\\s(\\w+/\\w+/\\w+)\\s\\|", 1, Log_s) | summarize count() by IP, Device | order by count_ desc'

// ============================================================================
// Reference existing Log Analytics workspace
// ============================================================================
resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' existing = {
  name: logAnalyticsWorkspaceName
}

// ============================================================================
// Action Group - Email notifications
// ============================================================================
resource actionGroup 'Microsoft.Insights/actionGroups@2023-09-01-preview' = {
  name: 'ag-portfolio-alerts'
  location: 'global'
  properties: {
    groupShortName: 'PortAlerts'
    enabled: true
    emailReceivers: [
      {
        name: 'HarshitEmail'
        emailAddress: alertEmail
        useCommonAlertSchema: true
      }
    ]
  }
}

// ============================================================================
// Alert 1: Error Detection
// Fires when any error log ([ERROR]) is detected in the container app
// Email includes custom properties with KQL to investigate + dashboard link
// ============================================================================
resource errorAlert 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = {
  name: 'alert-portfolio-errors'
  location: location
  properties: {
    displayName: 'Portfolio Website - Error Detected'
    description: 'Fires when an error is logged in the container app. Check the custom properties for the KQL query to investigate and see IP addresses.'
    severity: 1
    enabled: true
    evaluationFrequency: 'PT5M'
    windowSize: 'PT5M'
    scopes: [
      logAnalyticsWorkspace.id
    ]
    criteria: {
      allOf: [
        {
          query: errorQuery
          timeAggregation: 'Count'
          operator: 'GreaterThan'
          threshold: 0
          dimensions: []
          failingPeriods: {
            numberOfEvaluationPeriods: 1
            minFailingPeriodsToAlert: 1
          }
        }
      ]
    }
    autoMitigate: true
    actions: {
      actionGroups: [
        actionGroup.id
      ]
      customProperties: {
        'Alert Type': 'Error in Portfolio Website'
        Dashboard: dashboardUrl
        'KQL to investigate': investigateErrorKql
      }
    }
  }
}

// ============================================================================
// Alert 2: New Visitor Surge
// Fires when more than 5 new unique IPs visit within a 15-minute window
// KQL query extracts IP list and device info, included via custom properties
// ============================================================================
resource newVisitorAlert 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = {
  name: 'alert-portfolio-new-visitors'
  location: location
  properties: {
    displayName: 'Portfolio Website - 5+ New Visitors Detected'
    description: 'More than 5 new unique IP addresses visited the website in the last 15 minutes. Check custom properties for the KQL query to see all IPs.'
    severity: 3
    enabled: true
    evaluationFrequency: 'PT15M'
    windowSize: 'PT15M'
    scopes: [
      logAnalyticsWorkspace.id
    ]
    criteria: {
      allOf: [
        {
          query: newVisitorQuery
          timeAggregation: 'Count'
          operator: 'GreaterThan'
          threshold: 0
          dimensions: []
          failingPeriods: {
            numberOfEvaluationPeriods: 1
            minFailingPeriodsToAlert: 1
          }
        }
      ]
    }
    autoMitigate: true
    actions: {
      actionGroups: [
        actionGroup.id
      ]
      customProperties: {
        'Alert Type': 'New Visitor Surge on Portfolio Website'
        Dashboard: dashboardUrl
        'KQL to see IPs': investigateVisitorKql
      }
    }
  }
}

// ============================================================================
// Alert 3: Daily Visitor Summary
// Fires once per day if there were any new visitors
// ============================================================================
resource dailyVisitorSummary 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = {
  name: 'alert-portfolio-daily-visitors'
  location: location
  properties: {
    displayName: 'Portfolio Website - Daily New Visitor Summary'
    description: 'Daily summary of all new visitor IPs. Check custom properties for the KQL query to see the full IP list.'
    severity: 4
    enabled: true
    evaluationFrequency: 'P1D'
    windowSize: 'P1D'
    scopes: [
      logAnalyticsWorkspace.id
    ]
    criteria: {
      allOf: [
        {
          query: dailyVisitorQuery
          timeAggregation: 'Count'
          operator: 'GreaterThan'
          threshold: 0
          dimensions: []
          failingPeriods: {
            numberOfEvaluationPeriods: 1
            minFailingPeriodsToAlert: 1
          }
        }
      ]
    }
    autoMitigate: false
    actions: {
      actionGroups: [
        actionGroup.id
      ]
      customProperties: {
        'Alert Type': 'Daily Visitor Summary'
        'KQL to see all IPs today': investigateDailyKql
      }
    }
  }
}

// ============================================================================
// Outputs
// ============================================================================
output actionGroupId string = actionGroup.id
output errorAlertId string = errorAlert.id
output newVisitorAlertId string = newVisitorAlert.id
output dailySummaryAlertId string = dailyVisitorSummary.id
