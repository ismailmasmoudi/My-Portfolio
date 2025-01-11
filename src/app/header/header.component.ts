import { Component, inject ,ChangeDetectorRef} from '@angular/core';
import {  CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule ],
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
  constructor() { 
     this.isGerman$.subscribe(isGerman => {
       this.translationIconSrc = isGerman ? 'img/translate/german.png' : 'img/translate/english.png';
     });
  }


  toggleTranslation(): void {
    this.translationService.toggleTranslation();
    const toggleElement = document.querySelector('.translation-toggle');
    if (toggleElement) {
      toggleElement.classList.toggle('active');
    }
  }


  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu;
    this.burgerMenuIconSrc = this.showBurgerMenu ? 'img/close.svg' : 'img/menu.svg';
    this.changeDetectorRef.detectChanges();
      const burgerIcon = document.querySelector('.burger-menu-icon');
      if (burgerIcon) {
        burgerIcon.classList.toggle('open');
      }
  }


  closeBurgerMenu() {
    this.showBurgerMenu = false;
    this.burgerMenuIconSrc = 'img/menu.svg';
    this.changeDetectorRef.detectChanges();
  }


  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

