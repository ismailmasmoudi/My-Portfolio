import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { environment } from './../environements/environment'; // Correct import path
import { BrowserModule } from '@angular/platform-browser';



const serverConfig: ApplicationConfig = {
  providers: [
    environment.ssr ? provideServerRendering() : importProvidersFrom(BrowserModule), // Conditional SSR
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

