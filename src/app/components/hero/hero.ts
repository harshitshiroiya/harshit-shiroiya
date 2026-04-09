import { Component, OnInit, OnDestroy, AfterViewInit, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
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
export class Hero implements OnInit, OnDestroy, AfterViewInit {
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

  private cdr = inject(ChangeDetectorRef);

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
      this.cursorInterval = setInterval(() => {
        this.showCursor = !this.showCursor;
      }, 530);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.heroVisible = true;
        this.cdr.detectChanges();
      }, 50);
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
