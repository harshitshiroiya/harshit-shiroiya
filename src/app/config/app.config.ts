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
    fitnessDial: {
      github: 'https://github.com/harshitshiroiya/fitness-dial',
      live: 'https://fitness-dial.com'
    },
    courseOutcome: {
      github: 'https://github.com/harshitshiroiya/course-outcome-system',
      live: 'https://course-outcome.com',
      publication: 'https://jetir.org'
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
  appDescription: 'Software Engineer | Full Stack Developer',
  currentYear: new Date().getFullYear(),
  
  // Contact Email (for form submissions)
  contactEmail: 'harshitshiroiya@gmail.com'
};

export type AppConfig = typeof appConfig;
