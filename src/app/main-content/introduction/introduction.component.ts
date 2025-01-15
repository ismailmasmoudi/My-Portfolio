import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service'; // Adjust path if necessary
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss', './introduction-responsive.component.scss'],
})
export class IntroductionComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;

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
