import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class Header {
  appConfig = appConfig;

  constructor(public themeService: ThemeService) {}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
