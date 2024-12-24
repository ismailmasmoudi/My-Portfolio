import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,inject,  ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm') contactForm!: NgForm;

  // ... your other code

  validateForm() {
    if(this.contactForm) {
     Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.controls[key].markAsTouched();
    });
  }
    // This function can also be used to check the form's overall validity
    // if you need to enable/disable buttons or perform other actions.
  }

  ngOnInit() {
    // You likely no longer need this as validation will occur on input
   // this.contactForm.controls[controlName].markAsTouched();       }


  // ... your other code
}
  http= inject(HttpClient);

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

  // ngOnInit() {
  //   for (const controlName in this.contactForm.controls) {
  //     if (this.contactForm.controls.hasOwnProperty(controlName)) {
  //       this.contactForm.controls[controlName].markAsTouched();
  //     }
  //   }
  // }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            // du kannst hier was hinzufügen
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {

      ngForm.resetForm();
    }
  }
  // onFocus(fieldName: string) {
  //   // No specific action needed here, but you can add if required.
  //  }
   
  //  onBlur(fieldName: string) {
  //   // No specific action needed here, but you can add if required. For instance resetting border if desired
  //  }
   }
   
