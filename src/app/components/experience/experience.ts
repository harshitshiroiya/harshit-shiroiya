import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ResumeService } from '../../services/resume.service';
import { Experience as ExperienceModel } from '../../models/resume.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatBadgeModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {
  experiences: ExperienceModel[] = [];

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getExperience().subscribe(experiences => {
      this.experiences = experiences;
    });
  }
}
