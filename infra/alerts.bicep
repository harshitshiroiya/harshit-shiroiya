// ============================================================================
// Azure Monitor Alerts for harshitshiroiya.com
// - Error alert: fires when any [ERROR] log is detected
// - New visitor alert: fires when >5 new unique IPs visit in a 15-min window
// Both alerts email harshitshiroiya@gmail.com with IP details
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
// Fires when any error log ([ERROR] or console.error) is detected
// Includes the error message and IP (if available) in the email
// ============================================================================
resource errorAlert 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = {
  name: 'alert-portfolio-errors'
  location: location
  properties: {
    displayName: 'Portfolio Website - Error Detected'
    description: 'Fires when an error is logged in the container app. Check the custom properties for error details and IP addresses.'
    severity: 1 // Sev1 = Error
    enabled: true
    evaluationFrequency: 'PT5M' // Check every 5 minutes
    windowSize: 'PT5M'          // Look at last 5 minutes of data
    scopes: [
      logAnalyticsWorkspace.id
    ]
    criteria: {
      allOf: [
        {
          query: '''
            ContainerAppConsoleLogs_CL
            | where ContainerAppName_s == "${containerAppName}"
            | where Log_s has "[ERROR]" or Log_s has "Error" or Log_s has "ECONNREFUSED" or Log_s has "ENOTFOUND" or Log_s has "uncaughtException" or Log_s has "unhandledRejection"
            | extend IP = extract(@"IP:\s([^\s|]+)", 1, Log_s)
            | extend ErrorMessage = Log_s
            | project TimeGenerated, ErrorMessage, IP
          '''
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
        'Dashboard': 'https://portal.azure.com/#@/resource${logAnalyticsWorkspace.id}/logs'
        'KQL to investigate': 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[ERROR]" or Log_s has "Error" | project TimeGenerated, Log_s | order by TimeGenerated desc | take 20'
      }
    }
  }
}

// ============================================================================
// Alert 2: New Visitor Surge
// Fires when more than 5 new unique IPs visit within a 15-minute window
// Includes all the new IP addresses in the email custom properties
// ============================================================================
resource newVisitorAlert 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = {
  name: 'alert-portfolio-new-visitors'
  location: location
  properties: {
    displayName: 'Portfolio Website - 5+ New Visitors Detected'
    description: 'More than 5 new unique IP addresses visited the website in the last 15 minutes. Check custom properties for the IP list.'
    severity: 3 // Sev3 = Informational
    enabled: true
    evaluationFrequency: 'PT15M' // Check every 15 minutes
    windowSize: 'PT15M'          // Look at last 15 minutes of data
    scopes: [
      logAnalyticsWorkspace.id
    ]
    criteria: {
      allOf: [
        {
          query: '''
            ContainerAppConsoleLogs_CL
            | where ContainerAppName_s == "${containerAppName}"
            | where Log_s has "[VISITOR]" and Log_s has "New: true"
            | extend IP = extract(@"IP:\s([^\s|]+)", 1, Log_s)
            | extend Device = extract(@"\|\s(\w+/\w+/\w+)\s\|", 1, Log_s)
            | where isnotempty(IP)
            | summarize
                NewIPCount = dcount(IP),
                IPList = make_set(IP, 100),
                DeviceList = make_set(Device, 100)
              by bin(TimeGenerated, 15m)
            | where NewIPCount > 5
            | extend IPAddresses = strcat_array(IPList, ", ")
            | extend Devices = strcat_array(DeviceList, ", ")
            | project TimeGenerated, NewIPCount, IPAddresses, Devices
          '''
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
        'Dashboard': 'https://portal.azure.com/#@/resource${logAnalyticsWorkspace.id}/logs'
        'KQL to see IPs': 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[VISITOR]" and Log_s has "New: true" | extend IP = extract(@"IP:\\s([^\\s|]+)", 1, Log_s) | extend Device = extract(@"\\|\\s(\\w+/\\w+/\\w+)\\s\\|", 1, Log_s) | summarize count() by IP, Device | order by count_ desc'
      }
    }
  }
}

// ============================================================================
// Alert 3: All Visitor Summary (Daily digest of new IPs with addresses)
// Fires once per day if there were any new visitors — includes IP list
// ============================================================================
resource dailyVisitorSummary 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = {
  name: 'alert-portfolio-daily-visitors'
  location: location
  properties: {
    displayName: 'Portfolio Website - Daily New Visitor Summary'
    description: 'Daily summary of all new visitor IPs. Check custom properties for the full IP list and KQL query.'
    severity: 4 // Sev4 = Verbose/Info
    enabled: true
    evaluationFrequency: 'P1D'  // Check once per day
    windowSize: 'P1D'           // Look at last 24 hours
    scopes: [
      logAnalyticsWorkspace.id
    ]
    criteria: {
      allOf: [
        {
          query: '''
            ContainerAppConsoleLogs_CL
            | where ContainerAppName_s == "${containerAppName}"
            | where Log_s has "[VISITOR]" and Log_s has "New: true"
            | extend IP = extract(@"IP:\s([^\s|]+)", 1, Log_s)
            | extend Device = extract(@"\|\s(\w+/\w+/\w+)\s\|", 1, Log_s)
            | where isnotempty(IP)
            | summarize
                NewIPCount = dcount(IP),
                IPList = make_set(IP, 200)
              by bin(TimeGenerated, 1d)
            | where NewIPCount > 0
          '''
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
        'Alert Type': 'Daily Visitor Summary'
        'KQL to see all IPs today': 'ContainerAppConsoleLogs_CL | where ContainerAppName_s == "${containerAppName}" | where Log_s has "[VISITOR]" and Log_s has "New: true" | where TimeGenerated > ago(1d) | extend IP = extract(@"IP:\\s([^\\s|]+)", 1, Log_s) | extend Device = extract(@"\\|\\s(\\w+/\\w+/\\w+)\\s\\|", 1, Log_s) | summarize count() by IP, Device | order by count_ desc'
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
