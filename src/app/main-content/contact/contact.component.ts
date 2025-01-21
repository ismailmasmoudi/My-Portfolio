import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  translationService = inject(TranslationService);
  isGerman$ = this.translationService.isGerman$;
  imageUrl = 'img/Go-up-button.svg';
  privacyAgreementChecked = false;
  checkboxHover = false;
  checkboxImageUrl = 'img/Check-button.svg';
  showConfirmationLayer = false;
  mailTest = false;
  
  /**
    * Injected HttpClient service for making HTTP requests.
    */
  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: ''
  }

  post = {
    endPoint: 'https://ismail-masmoudi.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  @ViewChild('contactForm') contactForm!: NgForm;

  /**
   * @method getCheckboxImage
   * Returns the appropriate checkbox image URL based on checked state and hover state.
   * @returns {string} The URL of the checkbox image.
   */
  getCheckboxImage() {
    if (this.privacyAgreementChecked) {
      return this.checkboxHover ? 'img/Check-button-checked-hover.svg' : 'img/Check-button-checked.svg';
    } else {
      return this.checkboxHover ? 'img/Check-button-hover.svg' : 'img/Check-button.svg';
    }
  }


  /**
  * @method validateForm
  * Marks all form controls as touched to trigger validation display.
  */
  validateForm() {
    if (this.contactForm) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.controls[key].markAsTouched();
      });
    }

  }


  /**
 * @method ngOnInit
 * Initializes the component and sets the checkbox image.
 */
  ngOnInit() {
    this.updateCheckboxImage();
  }


  /**
  * @method togglePrivacyAgreement
  * Toggles the privacy agreement checkbox and updates the checkbox image.
  */
  togglePrivacyAgreement() {
    this.privacyAgreementChecked = !this.privacyAgreementChecked;
    this.updateCheckboxImage();
  }


  /**
   * @method updateCheckboxImage
   * Updates the checkbox image based on the privacy agreement checked state and hover state.
   */
  updateCheckboxImage() {
    if (this.privacyAgreementChecked) {
      this.checkboxImageUrl = this.checkboxHover ? './img/Check-button-checked-hover.svg' : './img/Check-button-checked.svg';
    } else {
      this.checkboxImageUrl = this.checkboxHover ? './img/Check-button-hover.svg' : './img/Check-button.svg';
    }
  }


  /**
  * @method scrollToTop
  * Scrolls the window to the top smoothly.
  */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  /**
   * @method onSubmit
   * Handles the form submission.  Sends the data to the server if valid and privacy agreement is checked.
   * @param {NgForm} ngForm - The form object.
   */
  onSubmit(ngForm: NgForm) {
    if (!this.privacyAgreementChecked) {
      this.validateForm();
      return;
    }
    if (ngForm.valid) {
      if (!this.mailTest) {
        this.http.post(this.post.endPoint, this.post.body(this.contactData), {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'text' as 'json'})
          .subscribe({
            next: (response) => {
              this.showConfirmation(ngForm);
            },
            error: (error) => {
              console.error(error);
              alert("Failed to send email. Please try again.");
            },
          });
      } else {
        this.showConfirmation(ngForm);
    
      }
    } else {
      this.validateForm();
    }

  }


  /**
   * @method showConfirmation
   * Displays a confirmation message and reloads the page after a short delay.
   */
  showConfirmation(ngForm: NgForm) {
    this.showConfirmationLayer = true;
    setTimeout(() => {
      ngForm.resetForm();
      this.privacyAgreementChecked = false;
      this.updateCheckboxImage();
      this.showConfirmationLayer = false; 
    }, 1500);
  }

}

