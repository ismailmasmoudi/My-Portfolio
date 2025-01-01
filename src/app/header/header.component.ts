import { Component, inject } from '@angular/core';
import {  CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule ], // Import here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;

  translationIconSrc: string | undefined;

  constructor() { // Use the observable in the constructor
     this.isGerman$.subscribe(isGerman => {
       this.translationIconSrc = isGerman ? 'img/translate/german.png' : 'img/translate/english.png';
     });
  }


  // In header.component.ts:
  toggleTranslation(): void {
    this.translationService.toggleTranslation();

    // No need to manually change the image source here. The isGerman$ observable handles it.

    const toggleElement = document.querySelector('.translation-toggle');
    if (toggleElement) {
      toggleElement.classList.toggle('active');
    }
  }



  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

