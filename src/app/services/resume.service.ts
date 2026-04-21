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
      summary: 'Full-stack Software Engineer with 4+ years of experience building and shipping distributed, cloud-native systems across .NET Core, Angular, React, and Azure. Skilled in microservices, event-driven architecture, performance tuning, and observability, with hands-on experience integrating GenAI tooling (GitHub Copilot, LLM agents, RAG) into production engineering workflows. Active contributor to code reviews, unit and integration testing, and on-call rotations in regulated environments.',
      socialLinks: [
        { name: 'GitHub', url: appConfig.socialMedia.github, icon: 'github' },
        { name: 'LinkedIn', url: appConfig.socialMedia.linkedin, icon: 'linkedin' },
        { name: 'Twitter', url: appConfig.socialMedia.twitter, icon: 'twitter' }
      ]
    },
    professional_summary: 'Full-stack Software Engineer with 4+ years of experience building and shipping distributed, cloud-native systems across .NET Core, Angular, React, and Azure. Skilled in microservices, event-driven architecture, performance tuning, and observability, with hands-on experience integrating GenAI tooling (GitHub Copilot, LLM agents, RAG) into production engineering workflows. Active contributor to code reviews, unit and integration testing, and on-call rotations in regulated environments.',
    skills: [
      {
        category: 'AI / ML & GenAI',
        items: ['GitHub Copilot', 'Azure OpenAI', 'LangChain', 'RAG', 'LLM prompt engineering', 'AI Agent development', 'PyTorch', 'scikit-learn', 'TensorFlow', 'Azure AI Search', 'embeddings', 'NLP']
      },
      {
        category: 'Languages & Frontend',
        items: ['Python', 'TypeScript', 'JavaScript', 'C#', 'Java', 'SQL', 'Angular (Signals, RxJS)', 'React', 'Vue.js', 'HTML5', 'Bootstrap']
      },
      {
        category: 'Backend & APIs',
        items: ['.NET Core (C#)', 'ASP.NET', 'Node.js', 'Express.js', 'Django', 'Flask', 'GraphQL', 'RESTful APIs', 'Entity Framework', 'MVC']
      },
      {
        category: 'Cloud, DevOps & Data',
        items: ['Azure (AKS, Service Bus, Blob Storage, App Insights, Cache for Redis, OpenAI, AI Search)', 'AWS (S3, RDS, EC2, Lambda, CodePipeline)', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Azure DevOps', 'SQL Server', 'PostgreSQL', 'MongoDB', 'CosmosDB', 'Redis', 'Memcached']
      },
      {
        category: 'Architecture & Practices',
        items: ['Microservices', 'Micro-frontends', 'Event-Driven', 'ESB Messaging', 'Distributed Systems', 'System Design', 'Code Review', 'Unit Testing', 'Integration Testing', 'TDD', 'Pair Programming', 'On-Call', 'Git', 'JIRA', 'Postman', 'OAuth 2.0', 'Agile/Scrum']
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
        description: 'Building and shipping clinical software products using Angular, .NET Core, Azure, and GenAI tooling.',
        achievements: [
          'Developed 3 clinical software products as micro-frontend Angular applications using Angular Signals for reactive state management, eliminating redundant change-detection cycles and improving rendering performance by 40%',
          'Built and deployed custom GenAI agents and internal Copilot-style assistants on Azure OpenAI + LangChain to automate clinical-study metadata generation, code scaffolding, and PR-review summarization; drove team-wide GitHub Copilot adoption with shared prompting standards and code-review guardrails',
          'Prototyped a retrieval-augmented generation (RAG) assistant over internal clinical documentation using Azure AI Search and embedding models, cutting average time-to-answer for study-configuration questions from hours to under 2 minutes',
          'Deployed containerized microservices on Azure Kubernetes Service (AKS) with Azure Container Registry, improving scalability 40% and reducing infrastructure costs by 35%; authored unit and integration tests and participated in weekly code reviews across 3 product squads',
          'Rolled out a distributed caching layer using Azure Cache for Redis with .NET Core (C#) and Entity Framework, cutting API latency by 50% under peak workloads for 2,000+ concurrent users',
          'Designed event-driven microservice communication via Azure Service Bus; instrumented observability with Azure Monitor and Application Insights and supported on-call rotations, reducing incident mean-time-to-detect (MTTD) by 60%',
          'Built a version-control system for clinical studies on Azure Blob Storage ensuring full audit traceability for regulatory review; introduced GraphQL alongside REST, cutting API response time by 35% and eliminating over-fetching'
        ]
      },
      {
        company: 'Indiana University',
        position: 'Software Engineer - Research Assistant',
        startDate: 'Aug 2022',
        endDate: 'May 2023',
        location: 'Bloomington, USA',
        description: 'Built distributed data pipelines and NLP-based research tools for large-scale social media sentiment analysis.',
        achievements: [
          'Built a distributed data-ingestion pipeline integrating Twitter, YouTube, and Reddit APIs to process high-volume sentiment data for 164 entities; optimized SQL workflows to cut processing time 30% and surface medication-efficacy insights across records for 10,000+ patients, enabling NLP-based emotion classification for 1,000+ researchers',
          'Introduced caching and async processing alongside Azure Data Lake Storage and Azure Service Bus for large-scale data management and reliable service communication, reducing latency by 50%',
          'Designed optimized MongoDB schemas for time-series social data with compound indexes, enabling sub-second querying across multi-million-document collections'
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
          'Built scalable .NET Core (C#) backend microservices and WCAG 2.1-compliant frontends using Angular and Vue.js, integrating AWS S3 and Amazon RDS (PostgreSQL) to support a 30% scalability improvement across high-traffic marketing-automation workflows',
          'Configured a Memcached server-side caching layer that reduced database round-trips by 40% and boosted throughput for peak-load campaigns; automated CI/CD pipelines using AWS CodePipeline, cutting release cycle time by 25%'
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
