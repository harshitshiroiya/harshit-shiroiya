import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class App {
  title = 'resume-website';
  appConfig = appConfig;
}
