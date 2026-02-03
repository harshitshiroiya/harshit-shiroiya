import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService } from '../../services/resume.service';
import { Project } from '../../models/resume.model';
import { appConfig } from '../../config/app.config';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  projects: Project[] = [];
  appConfig = appConfig;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
