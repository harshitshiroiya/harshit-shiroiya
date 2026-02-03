import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  professionalSummary = '';

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.resume$.subscribe(resume => {
      this.professionalSummary = resume.professional_summary;
    });
  }
}
