import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service'; // Adjust path if necessary
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
}
