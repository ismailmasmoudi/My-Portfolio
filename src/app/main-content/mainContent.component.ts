import { Component } from '@angular/core';
import { AboutMeComponent } from "./about-me/aboutMe.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { MySkillsComponent } from "./my-skills/mySkills.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [AboutMeComponent, IntroductionComponent, MySkillsComponent, PortfolioComponent, ContactComponent],
  templateUrl: './mainContent.component.html',
  styleUrl: './mainContent.component.scss'
})
export class MainContentComponent {

}
