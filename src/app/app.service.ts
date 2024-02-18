import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import axios from 'axios';

const SpeechToText_API_URL = "https://api-inference.huggingface.co/models/codenamewei/speech-to-text";
const API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions";
const headers = { Authorization: "Bearer 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" };

@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor() { 

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

  onConvert(inputText: string) {
    console.log("Input text is", inputText)
    var op = "..."
    this.textQuery(inputText)
    .then((output) => {
        // console.log("Output is " + output);
        setTimeout(function(){
            op = output
        }, 2000);
        // setTimeout({
            // this.output = output
        // },2000);     
    })
    .catch((error) => {
        console.error("Error during text query:", error);
    });

    setTimeout(function(){
        console.log("aftertimeout",op)
    },5000)
    return this.op
  }
}
    
