import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutMe.component.html',
  styleUrl: './aboutMe.component.scss'
})
export class AboutMeComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
}
