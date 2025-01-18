import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacyPolicy.component.html',
  styleUrl: './privacyPolicy.component.scss'
})
export class PrivacyPolicyComponent {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
}
