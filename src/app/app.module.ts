import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { TextComponent } from './text/text.component';
import { AudioComponent } from './audio/audio.component';

@NgModule({
    declarations: [
      AppComponent,
    ],
    imports: [
      BrowserModule,
      MatIconModule,
      MatTabsModule,
      BrowserAnimationsModule, 
      CommonModule,
      TextComponent,
      AudioComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  
  export class AppModule { 
  
  }