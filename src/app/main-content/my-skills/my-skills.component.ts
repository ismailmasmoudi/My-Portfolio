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
      this.updateHoverBackgroundImageUrl(); 
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


  /**
 * Updates the URL of the hover background image based on the current language.
 * Subscribes to the `isGerman$` observable to react to language changes
 * and sets the `hoverBackgroundImageUrl` accordingly.
 */
  updateHoverBackgroundImageUrl() {
    this.isGerman$.subscribe(isGerman => {
      this.hoverBackgroundImageUrl = isGerman ? 'img/skills-icons/white-background-german.png' : 'img/skills-icons/white-background.svg';
    });
  }


  /**
* Scrolls the page smoothly to the element with the given ID.
*
* @param sectionId The ID of the HTML element to scroll to.
*/
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
