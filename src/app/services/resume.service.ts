import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume, PersonalInfo, Skill, Experience, Project, Education } from '../models/resume.model';
import { appConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeData: Resume = {
    personalInfo: {
      name: 'Harshit Shiroiya',
      title: 'Software Engineer II',
      email: appConfig.socialMedia.email,
      phone: appConfig.socialMedia.phone,
      location: 'Cincinnati, USA',
      profileImage: 'Harshit.jpg',
      summary: 'Software Engineer with expertise in building scalable clinical and enterprise applications using Angular, .NET Core, and Azure cloud services. Experienced in microservices and micro-frontend architecture, distributed caching, event-driven systems, CI/CD pipelines, and mentoring development teams.',
      socialLinks: [
        { name: 'GitHub', url: appConfig.socialMedia.github, icon: 'github' },
        { name: 'LinkedIn', url: appConfig.socialMedia.linkedin, icon: 'linkedin' },
        { name: 'Twitter', url: appConfig.socialMedia.twitter, icon: 'twitter' }
      ]
    },
    professional_summary: 'Results-driven Software Engineer with experience in designing and implementing scalable web applications. Expertise in Angular, .NET Core, C#, Azure cloud services (AKS, Redis, Service Bus), and microservices architecture. Proven track record of cutting API latency by 50%, improving scalability by 40%, and mentoring junior engineers. Committed to delivering high-quality, maintainable code and fostering collaborative development environments.',
    skills: [
      {
        category: 'Languages',
        items: ['Python', 'TypeScript', 'JavaScript', 'C#', 'Java', 'C', 'PHP', 'SQL']
      },
      {
        category: 'Frontend',
        items: ['Angular', 'RxJS', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery', 'AJAX', 'Selenium']
      },
      {
        category: 'Backend & APIs',
        items: ['.NET Core (C#)', 'ASP.NET', 'Node.js', 'Express.js', 'Django', 'Flask', 'GraphQL', 'RESTful APIs', 'Entity Framework', 'MVC']
      },
      {
        category: 'Cloud & DevOps',
        items: ['Azure (AKS, Container Registry, Service Bus, Blob Storage, Monitor, App Insights, Cache for Redis)', 'AWS (S3, RDS, EC2, Lambda, CodePipeline, CodeBuild)', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Azure DevOps']
      },
      {
        category: 'Databases',
        items: ['SQL Server', 'PostgreSQL', 'MongoDB', 'MySQL', 'CosmosDB', 'DynamoDB', 'Amazon RDS', 'Amazon S3', 'Redis', 'Memcached']
      },
      {
        category: 'Architecture',
        items: ['Microservices', 'Micro-frontend', 'Event-Driven Architecture', 'ESB Messaging', 'Distributed Systems', 'MVC', 'Caching Strategies']
      },
      {
        category: 'Tools',
        items: ['Git', 'GitHub', 'Bitbucket', 'JIRA', 'Postman', 'Docker', 'ServiceNow', 'OAuth 2.0', 'Agile/Scrum', 'Crucible']
      },
      {
        category: 'Certifications',
        items: ['Infosys Certified Software Engineer', 'Microsoft Certified Python Programmer', 'Star Certified Cyber User']
      }
    ],
    experience: [
      {
        company: 'Medpace, Inc.',
        position: 'Software Engineer II',
        startDate: 'Jun 2023',
        endDate: 'Present',
        location: 'Cincinnati, USA',
        current: true,
        description: 'Architecting and maintaining clinical software products using Angular, C#, .NET Core, and Azure cloud services.',
        achievements: [
          'Architected 3 clinical software products as micro-frontend Angular applications using Angular Signals for reactive state management, eliminating redundant change-detection cycles and improving rendering performance by 40%',
          'Engineered a version control system for clinical studies leveraging Azure Blob Storage to maintain 100% version histories across all study configurations, ensuring full audit traceability',
          'Orchestrated containerized microservice deployments on Azure Kubernetes Service (AKS) with Azure Container Registry, boosting scalability 40%, accelerating deployment velocity 30%, and reducing infrastructure costs by 35%',
          'Deployed a distributed caching layer using Azure Cache for Redis with .NET Core (C#) and Entity Framework, cutting API latency by 50% and reducing database load by 35% under peak workloads for 2,000+ concurrent users',
          'Established ESB-based and event-driven microservice communication via Azure Service Bus; instrumented observability with Azure Monitor and Application Insights, reducing incident mean-time-to-detect (MTTD) by 60%',
          'Introduced GraphQL alongside RESTful APIs for clinical dashboards, cutting API response time by 35% and eliminating over-fetching; refactored monolithic application into microservices, improving scalability and maintainability',
          'Led sprint planning across 3 clinical products, achieving 99% alignment with business owners on priorities and timelines; mentored 2 junior engineers and boosted UX satisfaction scores by 25%'
        ]
      },
      {
        company: 'Indiana University',
        position: 'Software Engineer - Research Assistant',
        startDate: 'Aug 2022',
        endDate: 'May 2023',
        location: 'Bloomington, USA',
        description: 'Architected distributed data pipelines and NLP-based research tools for large-scale social media analysis.',
        achievements: [
          'Architected a distributed data ingestion pipeline integrating Twitter, YouTube, and Reddit APIs to process high-volume sentiment data for 164 entities, aiding 1,000+ researchers with NLP-based emotion classification',
          'Optimized data workflows with advanced algorithms and SQL pipelines, reducing processing time by 30% and enabling insights on medication efficacy for 10,000+ patients',
          'Introduced caching and async processing alongside Azure Data Lake Storage and Azure Service Bus for large-scale data management and reliable service communication, reducing latency by 50%',
          'Designed optimized MongoDB schemas for time-series social data with compound indexes, enabling sub-second querying'
        ]
      },
      {
        company: 'PERQ',
        position: 'Software Engineer Intern',
        startDate: 'May 2022',
        endDate: 'Dec 2022',
        location: 'Indianapolis, USA',
        description: 'Built scalable full-stack web applications with focus on accessibility, cloud deployment, and marketing automation workflows.',
        achievements: [
          'Built scalable .NET Core (C#) backend microservices and WCAG 2.1-compliant frontends using Angular and Vue.js, integrating AWS S3 and Amazon RDS (PostgreSQL) to support a 30% scalability improvement across high-traffic marketing automation workflows',
          'Configured Memcached server-side caching layer, reducing database round-trips by 40% and boosting throughput for peak-load marketing campaigns serving thousands of concurrent users',
          'Automated end-to-end CI/CD pipelines using AWS CodePipeline and CodeBuild, cutting release cycle time by 25% and enabling faster, more reliable feature deployments across environments'
        ]
      }
    ],
    projects: [
      {
        title: 'Distributed Health Telemetry System',
        description: 'A cloud-native health monitoring platform on AWS (EC2, S3, Lambda) with OAuth 2.0 authentication, video streaming, real-time chat, subscription management, and personalized recommendation features.',
        technologies: ['Node.js', 'React', 'MongoDB', 'Angular', 'AWS', 'OAuth 2.0'],
        link: appConfig.projects.healthTelemetry.live,
        highlights: [
          'Built a cloud-native health monitoring platform on AWS (EC2, S3, Lambda) with OAuth 2.0 authentication, video streaming, real-time chat, and subscription management',
          'Leveraged React Router for client-side navigation, reducing Time to Interactive by 27%',
          'Backed recommendations with MongoDB aggregation pipelines for personalized content delivery'
        ]
      },
      {
        title: 'Shipment Pricing & Configuration System',
        description: 'A cost estimation system using Node.js and Express.js with SQL Server, featuring an admin interface for rate configuration and customer-facing visualization to streamline production planning.',
        technologies: ['React', 'Node.js', 'Express.js', 'SQL Server', 'RESTful APIs', 'Azure', 'Chart.js'],
        link: appConfig.projects.shipmentPricing.live,
        highlights: [
          'Engineered a cost estimation system using Node.js and Express.js with SQL Server, reducing estimation time by 95% through efficient backend logic and database optimization',
          'Designed an admin interface for rate configuration and customer-facing visualization, reducing production planning time by 30%'
        ]
      }
    ],
    education: [
      {
        school: 'Indiana University Bloomington',
        degree: 'Master of Science',
        field: 'Computer Science',
        graduationDate: 'Aug 2021 - May 2023',
        gpa: '3.7/4.0',
        coursework: ['Software Engineering', 'Advanced Database', 'Applied Algorithms', 'Elements of AI', 'System Analysis and Design']
      },
      {
        school: 'University of Mumbai',
        degree: 'Bachelor of Engineering',
        field: 'Information Technology',
        graduationDate: 'Aug 2017 - Jun 2021',
        gpa: '3.8/4.0',
        coursework: ['Operating Systems', 'Software Engineering', 'Internet Programming', 'Advanced Data Structure Algorithm']
      }
    ]
  };

  private resumeSubject = new BehaviorSubject<Resume>(this.resumeData);
  public resume$ = this.resumeSubject.asObservable();

  constructor() {}

  getResume(): Observable<Resume> {
    return this.resume$;
  }

  updatePersonalInfo(personalInfo: PersonalInfo): void {
    this.resumeData.personalInfo = personalInfo;
    this.resumeSubject.next(this.resumeData);
  }

  getSkills(): Observable<Skill[]> {
    return new Observable(observer => {
      observer.next(this.resumeData.skills);
      observer.complete();
    });
  }

  getExperience(): Observable<Experience[]> {
    return new Observable(observer => {
      observer.next(this.resumeData.experience);
      observer.complete();
    });
  }

  getProjects(): Observable<Project[]> {
    return new Observable(observer => {
      observer.next(this.resumeData.projects);
      observer.complete();
    });
  }

  getEducation(): Observable<Education[]> {
    return new Observable(observer => {
      observer.next(this.resumeData.education);
      observer.complete();
    });
  }
}
