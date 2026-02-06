import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResumeService } from '../../services/resume.service';
import { PersonalInfo } from '../../models/resume.model';
import { appConfig } from '../../config/app.config';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  personalInfo: PersonalInfo | null = null;
  appConfig = appConfig;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.resume$.subscribe(resume => {
      this.personalInfo = resume.personalInfo;
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
