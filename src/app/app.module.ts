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

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


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
      AudioComponent,
      FormsModule,
      MatToolbarModule,
      MatGridListModule,
      MatButtonModule,
      HttpClientModule  
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  
  export class AppModule { 
  
  }