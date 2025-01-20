import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule , RouterLink ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;

 /**
  * @method scrollToTop
  * Scrolls the window to the top smoothly.
  */
 scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}