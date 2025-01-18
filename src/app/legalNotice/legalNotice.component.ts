import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legalNotice.component.html',
  styleUrl: './legalNotice.component.scss'
})
export class LegalNoticeComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
}
