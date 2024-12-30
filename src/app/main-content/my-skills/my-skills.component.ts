import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent {
  @ViewChild('skillImage') skillImage!: ElementRef;
  showHoverContent = false;
  onSkillImageHover() {
    this.showHoverContent = true;
    this.skillImage.nativeElement.src = 'img/skills-icons/11Continually-learningwhite.svg';
  }

  onSkillImageLeave() {
    this.showHoverContent = false;
    this.skillImage.nativeElement.src = 'img/skills-icons/11Continually-learning.svg';
  }
}
