/**
 * Application Configuration
 * Centralized configuration for all application settings
 */

export const appConfig = {
  // Social Media Links
  socialMedia: {
    github: 'https://github.com/harshitshiroiya',
    linkedin: 'https://linkedin.com/in/harshitshiroiya',
    twitter: 'https://twitter.com/Harshit_077',
    email: 'harshitshiroiya@gmail.com',
    phone: '+1 (812) 802-3758'
  },

  // Project Links
  projects: {
    healthTelemetry: {
      github: 'https://github.com/harshitshiroiya/distributed-health-telemetry',
      live: 'https://health-telemetry.com'
    },
    shipmentPricing: {
      github: 'https://github.com/harshitshiroiya/shipment-pricing-system',
      live: 'https://shipment-pricing.com'
    }
  },

  // External Resources
  externalLinks: {
    resume: 'https://drive.google.com/your-resume-link',
    portfolio: 'https://harshitshiroiya.com',
    blog: 'https://blog.harshitshiroiya.com'
  },

  // Application Metadata
  appName: 'Harshit Shiroiya',
  appDescription: 'Software Engineer II | Full Stack Developer',
  currentYear: new Date().getFullYear(),
  
  // Contact Email (for form submissions)
  contactEmail: 'harshitshiroiya@gmail.com'
};

export type AppConfig = typeof appConfig;
