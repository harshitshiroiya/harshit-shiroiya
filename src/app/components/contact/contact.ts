import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ResumeService } from '../../services/resume.service';
import { PersonalInfo } from '../../models/resume.model';
import { appConfig } from '../../config/app.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  personalInfo: PersonalInfo | null = null;
  appConfig = appConfig;
  formData = {
    name: '',
    email: '',
    message: ''
  };
  submitted = false;
  sending = false;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private resumeService: ResumeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.resumeService.resume$.subscribe(resume => {
      this.personalInfo = resume.personalInfo;
    });
  }

  submitForm(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.snackBar.open('Please fill in all fields', 'Close', { duration: 3000 });
      return;
    }

    this.sending = true;

    // Create mailto link with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact from ${this.formData.name}`);
    const body = encodeURIComponent(
      `Name: ${this.formData.name}\nEmail: ${this.formData.email}\n\nMessage:\n${this.formData.message}`
    );
    const mailtoLink = `mailto:${appConfig.contactEmail}?subject=${subject}&body=${body}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(mailtoLink, '_blank');
    }

    this.submitted = true;
    this.sending = false;
    this.snackBar.open('Opening email client...', 'Close', { duration: 3000 });

    setTimeout(() => {
      this.formData = { name: '', email: '', message: '' };
      this.submitted = false;
    }, 2000);
  }
}
