import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioRecordingService } from './audio-recording-service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import axios from 'axios';

const SpeechToText_API_URL = "https://api-inference.huggingface.co/models/codenamewei/speech-to-text";
const API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions";
const headers = { Authorization: "Bearer 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" };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sentiment-analysis';
  isRecording = false;
  audioURL: string | null = null;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private audioRecordingService: AudioRecordingService, 
    private cd: ChangeDetectorRef,
    private http: HttpClient) { }

  ngOnInit() {
    this.audioRecordingService.audioBlob$.subscribe(blob => {
      this.audioURL = window.URL.createObjectURL(blob);
      this.audioPlayer.nativeElement.src = this.audioURL;
      this.cd.detectChanges();
    });
  }

  startRecording() {
    this.isRecording = true;
    this.audioRecordingService.startRecording();
  }

  stopRecording() {
    this.isRecording = false;
    this.audioRecordingService.stopRecording();
  }

  audiofile: any;

  onConvert() {
    console.log("Converting input text");

    if (this.audioURL) {
      // this.http.get(this.audioURL, { responseType: 'blob' }).subscribe(async (blob: Blob) => {
      //   // Save the Blob as a file locally
      //   saveAs(blob, 'audio_file.mp3');
      // });

      this.fetchAndSetFile().then((outputText: any) => {
        console.log("Audio is " + outputText);
        this.textQuery(outputText).then((output: any) => {
          console.log("Output is " + output);
        })
          .catch((error: any) => {
            console.error("Error during text query:", error);
          });
      });
    } else {
      console.log("Audio save failed")
    }
    
    // this.onConvert2(this.textToConvert);
  }

  async audioQuery(audioData: File): Promise<any> {
    try {
      const response = await axios.post(SpeechToText_API_URL, audioData, { headers });
      if (response.status != 200) {
        throw new Error("Error");
      }
      return response.data.text; // Assuming response JSON structure
    } catch (error) {
      console.error('Error during query:', error);
      throw error;
    }
  }
  async textQuery(text: string): Promise<any> {
    try {
      const response = await axios.post(API_URL, text, { headers });
      if (response.status != 200) {
        throw new Error("Error");
      }
      return response.data[0][0].label;
    } catch (error) {
      console.error('Error during query:', error);
      throw error; // Re-throw for comprehensive error handling
    }
  }

  async fetchAndSetFile() {
    try {
      // const fileLink = "assets/OAF_back_angry.wav";
      // const fileLink = this.audioURL;
      var response;
      if (this.audioURL) {
        this.http.get(this.audioURL, { responseType: 'blob' }).subscribe(async (blob: Blob) => {
          // Save the Blob as a file locally
          await saveAs(blob, 'audio_file.wav');
          var blob2: any;
          setTimeout(async function(){
            response = await fetch('audio_file.wav');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            blob2 = await response.blob();
          },5000);
          const file = new File([blob2], 'filename.wav');
          return await this.audioQuery(file)
          
        });
        
      } else {
        console.log("I got problems")
      }
    
    } catch (error) {
      console.error('Error fetching or setting file:', error);
    }
  }
}
