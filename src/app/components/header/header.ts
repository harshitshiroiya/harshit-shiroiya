import { Component, signal, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { appConfig } from '../../config/app.config';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  appConfig = appConfig;
  isMobileMenuOpen = signal(false);
  activeSection = signal('home');
  scrollProgress = signal(0);
  headerShrunk = signal(false);

  private platformId = inject(PLATFORM_ID);
  private scrollHandler: (() => void) | null = null;
  private sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollHandler = () => this.onScroll();
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollHandler && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private onScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    this.headerShrunk.set(scrollTop > 50);

    // Find active section
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.sections[i]);
      if (el && el.getBoundingClientRect().top <= 150) {
        this.activeSection.set(this.sections[i]);
        break;
      }
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }
}
