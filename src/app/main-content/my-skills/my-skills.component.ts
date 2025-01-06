import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
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

  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
  hoverBackgroundImageUrl!: string;

  constructor() {
    this.isGerman$.subscribe(isGerman => {
      this.updateHoverBackgroundImageUrl(); // Update on language change
    });
  }

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

  updateHoverBackgroundImageUrl() { // Update method
    this.isGerman$.subscribe(isGerman => {
      this.hoverBackgroundImageUrl = isGerman ? 'img/skills-icons/white-background-german.png' : 'img/skills-icons/white-background.svg';
    });
  }
}
