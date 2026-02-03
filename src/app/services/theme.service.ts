import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private platformId = inject(PLATFORM_ID);
  
  // Signal for reactive theme state - default to dark mode
  isDarkMode = signal<boolean>(true);

  constructor() {
    // Only access localStorage in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      // Default to dark if no saved preference
      const prefersDark = savedTheme === null ? true : savedTheme === 'dark';
      this.isDarkMode.set(prefersDark);
      this.applyTheme(prefersDark);

      // Effect to apply theme changes
      effect(() => {
        this.applyTheme(this.isDarkMode());
      });
    }
  }

  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, this.isDarkMode() ? 'dark' : 'light');
    }
  }

  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
    }
  }
}
