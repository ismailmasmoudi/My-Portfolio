import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private isGermanSubject = new BehaviorSubject<boolean>(false);
  isGerman$ = this.isGermanSubject.asObservable();

  
   /**
   * @description Toggles the application's language between German and English.
   * Emits the new language state through the `isGerman$` observable.
   */
  toggleTranslation(): void {
    this.isGermanSubject.next(!this.isGermanSubject.value);
  }
}
