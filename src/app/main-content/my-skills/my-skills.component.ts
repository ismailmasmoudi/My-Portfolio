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


  /**
   * @method onSkillImageHover
   * Handles the mouseenter event on the skill image. 
   * Changes the image source and shows the hover content.
   */
  onSkillImageHover() {
    this.showHoverContent = true;
    this.skillImage.nativeElement.src = 'img/skills-icons/11Continually-learningwhite.svg';
  }


  /**
   * @method onSkillImageLeave
   * Handles the mouseleave event on the skill image.
   * Resets the image source and hides the hover content.
   */
  onSkillImageLeave() {
    this.showHoverContent = false;
    this.skillImage.nativeElement.src = 'img/skills-icons/11Continually-learning.svg';
  }
}
