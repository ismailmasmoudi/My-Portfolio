import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private isGermanSubject = new BehaviorSubject<boolean>(false);
  isGerman$ = this.isGermanSubject.asObservable();

  toggleTranslation(): void {
    this.isGermanSubject.next(!this.isGermanSubject.value);
  }
}
