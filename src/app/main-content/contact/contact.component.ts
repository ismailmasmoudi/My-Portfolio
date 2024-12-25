import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  imageUrl = 'img/Go-up-button.svg';
  privacyAgreementChecked = false;
  checkboxHover = false;
  checkboxImageUrl = 'img/Check-button.svg';

  @ViewChild('contactForm') contactForm!: NgForm;

  getCheckboxImage() {  // Modified to handle hover
    if (this.privacyAgreementChecked) {
      return this.checkboxHover ? 'img/Check-button-checked-hover.svg' : 'img/Check-button-checked.svg';
    } else {
      return this.checkboxHover ? 'img/Check-button-hover.svg' : 'img/Check-button.svg';
    }
  }

  validateForm() {
    if (this.contactForm) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.controls[key].markAsTouched();
      });
    }

  }

  ngOnInit() {
    this.updateCheckboxImage(); // Set initial image
  }

  togglePrivacyAgreement() {
    this.privacyAgreementChecked = !this.privacyAgreementChecked;
    this.updateCheckboxImage(); // Update image after click
  }



  updateCheckboxImage() {  // Renamed for clarity
    if (this.privacyAgreementChecked) {
      this.checkboxImageUrl = this.checkboxHover ? './img/Check-button-checked-hover.svg' : './img/Check-button-checked.svg';
    } else {
      this.checkboxImageUrl = this.checkboxHover ? './img/Check-button-hover.svg' : './img/Check-button.svg';
    }
  }

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: ''
  }

  mailTest = true;

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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(ngForm: NgForm) {
    if (!this.privacyAgreementChecked) {

      this.validateForm();
      return;
    }

    if (ngForm !== this.contactForm) return;
    if (ngForm.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData), this.post.options) // Add options
        .subscribe({
          next: (response) => {
            console.log("Response from server:", response);
            ngForm.resetForm();
            this.privacyAgreementChecked = false;
          },
          error: (error) => {
            console.error(error);
            // Display error messages
            alert("Failed to send email. Please try again.");
          },
        });
    } else if (ngForm.valid && this.mailTest) {
      console.log('Test mode: Form submitted', this.contactData);
      ngForm.resetForm();
      this.privacyAgreementChecked = false;
    } else {
      this.validateForm();

    }
  }
}

