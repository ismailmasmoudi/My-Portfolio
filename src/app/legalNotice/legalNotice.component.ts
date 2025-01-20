import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './legalNotice.component.html',
  styleUrl: './legalNotice.component.scss'
})
export class LegalNoticeComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
}
