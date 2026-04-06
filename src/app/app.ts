import { Component, signal, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Experience } from './components/experience/experience';
import { EducationComponent } from './components/education/education';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { appConfig } from './config/app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    Header,
    Hero,
    About,
    Skills,
    Experience,
    EducationComponent,
    Projects,
    Contact
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  title = 'resume-website';
  appConfig = appConfig;
  showBackToTop = signal(false);

  private platformId = inject(PLATFORM_ID);
  private scrollHandler: (() => void) | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollHandler = () => {
        this.showBackToTop.set(window.scrollY > 400);
      };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollHandler && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
