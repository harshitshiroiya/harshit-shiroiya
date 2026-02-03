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
      summary: 'Software Engineer with expertise in building scalable clinical and enterprise applications using Angular, .NET Core, and Azure cloud services. Experienced in microservices architecture, CI/CD pipelines, and mentoring development teams.',
      socialLinks: [
        { name: 'GitHub', url: appConfig.socialMedia.github, icon: 'github' },
        { name: 'LinkedIn', url: appConfig.socialMedia.linkedin, icon: 'linkedin' },
        { name: 'Twitter', url: appConfig.socialMedia.twitter, icon: 'twitter' }
      ]
    },
    professional_summary: 'Results-driven Software Engineer with experience in designing and implementing scalable web applications. Expertise in Angular, .NET Core, C#, Azure cloud services, and microservices architecture. Proven track record of reducing API response times by 35%, improving scalability by 40%, and mentoring junior developers. Committed to delivering high-quality, maintainable code and fostering collaborative development environments.',
    skills: [
      {
        category: 'Programming Languages',
        items: ['Python', 'JavaScript', 'Java', 'C', 'TypeScript', 'C#']
      },
      {
        category: 'Web Technologies & Frameworks',
        items: ['Angular', 'React', 'Node.js', 'Express.js', '.NET', 'Django', 'Flask', 'RESTful APIs', 'GraphQL']
      },
      {
        category: 'Database & Storage',
        items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Amazon RDS', 'Amazon S3', 'DynamoDB', 'Microsoft SQL Server']
      },
      {
        category: 'DevOps & Cloud',
        items: ['Azure', 'AWS', 'Docker', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Redis', 'Memcached']
      },
      {
        category: 'Tools & Practices',
        items: ['Git', 'JIRA', 'Postman', 'Selenium', 'Bitbucket', 'Crucible', 'Agile/Scrum']
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
        description: 'Developing and maintaining clinical software applications using Angular, C#, .NET Core, and Azure.',
        achievements: [
          'Developed and maintained 3 clinical software applications using Angular, C#, .NET Core, Entity Framework, and Microsoft SQL Server in a MVC architecture',
          'Reduced API response time by 35% by implementing GraphQL and RESTful APIs for faster client-server communication',
          'Optimized scalability and reduced infrastructure costs by 35% by migrating applications to Azure cloud services',
          'Refactored a monolithic application into microservices and micro-frontend architecture, improving scalability by 40% and deployment speed by 30%',
          'Led UI development initiatives for 3 major products, improving user experience scores by 25%',
          'Mentored 2 junior developers on frontend development best practices',
          'Achieved 99% alignment with business owners through effective sprint planning and communication'
        ]
      },
      {
        company: 'Indiana University',
        position: 'Software Engineer - Research Assistant',
        startDate: 'Aug 2022',
        endDate: 'May 2023',
        location: 'Bloomington, USA',
        description: 'Conducted research and data analysis on social media platforms.',
        achievements: [
          'Crawled data from 164 Scientists\' timelines using Twitter API, YouTube API, and Reddit API',
          'Extracted and processed JSON responses for data analysis',
          'Cleaned, parsed, and segmented tweets to analyze word frequency and identify emotion-related hashtags'
        ]
      },
      {
        company: 'PERQ',
        position: 'Software Engineer Intern',
        startDate: 'May 2022',
        endDate: 'Dec 2022',
        location: 'Indianapolis, USA',
        description: 'Developed full-stack web applications with focus on accessibility and cloud deployment.',
        achievements: [
          'Ensured WCAG 2.1 compliance to improve web accessibility for users with disabilities',
          'Built backend services with .NET (C#) and developed responsive frontends using Angular.js and Vue.js',
          'Managed PostgreSQL for storage and backups, and used Memcached for high-speed caching',
          'Utilized AWS S3 for static content and RDS for PostgreSQL hosting, improving scalability by 30%',
          'Automated CI/CD pipelines with AWS CodePipeline and CodeBuild, reducing release cycles by 25%'
        ]
      },
      {
        company: 'V.H Lakhi Group',
        position: 'Data Analyst Intern',
        startDate: 'Dec 2019',
        endDate: 'Feb 2020',
        location: 'Mumbai, India',
        description: 'Analyzed sales data and implemented machine learning algorithms for business insights.',
        achievements: [
          'Analyzed 2018-19 sales data using Python to identify key trends and patterns',
          'Implemented 6 machine learning algorithms, improving insights and helping boost future sales by 18%'
        ]
      }
    ],
    projects: [
      {
        title: 'FitnessDial',
        description: 'A health wellness system to monitor an individual\'s everyday activity with OAuth 2.0 authentication, video streaming, real-time chat, subscription management, and recommendation features.',
        technologies: ['Node.js', 'React', 'MongoDB', 'Angular', 'AWS', 'OAuth 2.0'],
        github: appConfig.projects.fitnessDial.github,
        link: appConfig.projects.fitnessDial.live,
        highlights: [
          'Implemented registration with OAuth 2.0 authentication',
          'Built search, recommendation, video-streaming, and chatting features',
          'Leveraged React Router to reduce application loading by 27%'
        ]
      },
      {
        title: 'Course Outcome Attainment System',
        description: 'An automated system to analyze course attainment, ensuring compliance with board standards and improving continuous quality assessment. Published research paper in JETIR journal.',
        technologies: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
        github: appConfig.projects.courseOutcome.github,
        link: appConfig.projects.courseOutcome.live,
        highlights: [
          'Processed data from 1,600+ students and faculty for performance evaluation',
          'Authored and presented a paper at ICSCSP 2020',
          'Published research in JETIR journal'
        ]
      }
    ],
    education: [
      {
        school: 'Indiana University Bloomington',
        degree: 'Master of Science',
        field: 'Computer Science',
        graduationDate: 'May 2023',
        gpa: '3.7/4.0',
        coursework: ['Software Engineering', 'Advanced Database', 'Applied Algorithms', 'Elements of AI', 'System Analysis and Design']
      },
      {
        school: 'University of Mumbai',
        degree: 'Bachelor of Engineering',
        field: 'Information Technology',
        graduationDate: 'Jun 2021',
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
