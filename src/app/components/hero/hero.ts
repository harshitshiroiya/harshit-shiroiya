import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
export class Hero implements OnInit, OnDestroy {
  personalInfo: PersonalInfo | null = null;
  appConfig = appConfig;
  typedTitle = '';
  showCursor = true;
  heroVisible = false;

  private platformId = inject(PLATFORM_ID);
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;
  private cursorInterval: ReturnType<typeof setInterval> | null = null;
  private fullTitle = '';
  private typingIndex = 0;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.resume$.subscribe(resume => {
      this.personalInfo = resume.personalInfo;
      if (this.personalInfo && isPlatformBrowser(this.platformId)) {
        this.fullTitle = this.personalInfo.title;
        this.startTyping();
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.heroVisible = true;
      });
      this.cursorInterval = setInterval(() => {
        this.showCursor = !this.showCursor;
      }, 530);
    }
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }

  private startTyping(): void {
    if (this.typingIndex < this.fullTitle.length) {
      this.typedTitle += this.fullTitle.charAt(this.typingIndex);
      this.typingIndex++;
      this.typingTimeout = setTimeout(() => this.startTyping(), 50 + Math.random() * 40);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
