import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { RouterLink, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
  showBurgerMenu: boolean = false;
  translationIconSrc: string | undefined;
  burgerMenuIconSrc: string = 'img/menu.svg';
  changeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);
  constructor() {
    this.isGerman$.subscribe(isGerman => {
      this.translationIconSrc = isGerman ? 'img/translate/german.png' : 'img/translate/english.png';
    });
  }


  /**
   * @description Toggles the application's language between German and English.
   * Updates the translation icon and toggles the 'active' class on the toggle element.
   */
  toggleTranslation(): void {
    this.translationService.toggleTranslation();
    const toggleElement = document.querySelector('.translation-toggle');
    if (toggleElement) {
      toggleElement.classList.toggle('active');
    }
  }


  /**
   * @description Toggles the burger menu's visibility.
   * Updates the burger menu icon, triggers change detection, and toggles the 'open' class.
   */
  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu;
    this.burgerMenuIconSrc = this.showBurgerMenu ? 'img/close.svg' : 'img/menu.svg';
    this.changeDetectorRef.detectChanges();
    const burgerIcon = document.querySelector('.burger-menu-icon');
    if (burgerIcon) {
      burgerIcon.classList.toggle('open');
    }
  }


  /**
  * @description Closes the burger menu.
  * Sets showBurgerMenu to false, resets the burger menu icon, and triggers change detection.
  */
  closeBurgerMenu() {
    this.showBurgerMenu = false;
    this.burgerMenuIconSrc = 'img/menu.svg';
    this.changeDetectorRef.detectChanges();
  }


/**
 * Scrolls to a specific section on the page after navigating to the current route.
 * This method uses the Angular Router to navigate to the current route, then uses 
 * `scrollIntoView` to smoothly scroll to the targeted section. The `setTimeout` 
 * ensures the DOM is fully updated before attempting to scroll.
 *
 * @param sectionId The ID of the HTML element representing the section to scroll to 
 *                  (e.g., 'about-me', 'skills', 'contact').
 */
 scrollToSection(sectionId: string): void {
  this.router.navigate(['./']).then(() => { 
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  });}


  /**
  * @method scrollToTop
  * Scrolls the window to the top smoothly.
  */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

