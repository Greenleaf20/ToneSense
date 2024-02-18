import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { Observable, of } from 'rxjs';
import axios from 'axios';
import { CommonModule } from '@angular/common';

const SpeechToText_API_URL = "https://api-inference.huggingface.co/models/codenamewei/speech-to-text";
const API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions";
const headers = { Authorization: "Bearer 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" };

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    CommonModule
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {
  constructor(private appService: AppService) {

  }

  textToConvert: string = "";
  emotion: string = "";

  onConvert() {
    // console.log("Converting input text")
    this.onConvert2(this.textToConvert);
  }

  async textQuery(text: string): Promise<any> {
    try {
      const response = await axios.post(API_URL, text, { headers });
      if (response.status != 200) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.data[0][0].label;
    } catch (error) {
      console.error('Error during query:', error);
      throw error; // Re-throw for comprehensive error handling
    }
  }

  op: string = "";

  onConvert2(inputText: string) {
    // console.log("Input text is", inputText)
    var op = "..."
    this.textQuery(inputText)
    .then((output) => {
        console.log("Output is " + output);
        this.emotion = output;
    })
    .catch((error) => {
        console.error("Error during text query:", error);
    });
  }

}
