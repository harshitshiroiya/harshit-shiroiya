import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ResumeService } from '../../services/resume.service';
import { Education } from '../../models/resume.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent implements OnInit {
  education: Education[] = [];

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getEducation().subscribe(education => {
      this.education = education;
    });
  }
}
