import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent , FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

 /**
   * Initializes the AOS library on component initialization.
   * This ensures that AOS is set up after the component is loaded and ready,
   * and only if the application is running in a browser environment.
   */
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { 
      AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset :200,
      startEvent: 'load',
        });
  }
;
}}
