import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService } from '../../services/resume.service';
import { Skill } from '../../models/resume.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements OnInit {
  skills: Skill[] = [];

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }
}
