import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './legalNotice/legalNotice.component';
import { MainContentComponent } from './main-content/mainContent.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacyPolicy.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent }, 
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent }
];
