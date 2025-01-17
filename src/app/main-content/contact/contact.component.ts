import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  mailTest = true;
  
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
    endPoint: 'https://deineDomain.de/sendMail.php',
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
        this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
          .subscribe({
            next: (response) => {
              console.log("Response from server:", response);
              this.showConfirmation();
            },
            error: (error) => {
              console.error(error);
              alert("Failed to send email. Please try again.");
            },
          });
      } else {
        console.log('Test mode: Form submitted', this.contactData);
        this.showConfirmation();
      }
    } else {
      this.validateForm();
    }

  }


  /**
   * @method showConfirmation
   * Displays a confirmation message and reloads the page after a short delay.
   */
  showConfirmation() {
    this.showConfirmationLayer = true;
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

}

