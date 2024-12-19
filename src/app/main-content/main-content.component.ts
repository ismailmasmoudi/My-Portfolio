import { Component } from '@angular/core';
import { AboutMeComponent } from "./about-me/about-me.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { MySkillsComponent } from "./my-skills/my-skills.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [AboutMeComponent, IntroductionComponent, MySkillsComponent, PortfolioComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
