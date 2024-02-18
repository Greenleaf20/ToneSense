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
  audioURL: Blob = new Blob();
  audioFile: File = new File([new Blob([])], 'empty-audio.mp3');
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private audioRecordingService: AudioRecordingService,
    private cd: ChangeDetectorRef,
    private http: HttpClient) { }
  startRecording() {
    this.isRecording = true;
    this.audioRecordingService.startRecording();
  }

  async stopRecording() {
    this.isRecording = false;
    const blob = await this.audioRecordingService.stopRecording();
    const fileName = 'my-recording.mp3';
    this.audioFile = new File([blob], fileName);
    console.log(this.audioFile)
    console.log(blob)
  }

  emotion: string = "";

  onConvert(){
    console.log(this.audioFile)
    if(this.audioFile){
      this.audioQuery(this.audioFile).then((outputText) => {
        console.log("Audio is " + outputText);
        this.textQuery(outputText).then((output) => {
          console.log("Output is " + output);
          this.emotion = output
        })
          .catch((error) => {
            console.error("Error during text query:", error);
          });
      })
    }
  }
  async audioQuery(audioData: File): Promise<any> {
    try {
      const response = await axios.post(SpeechToText_API_URL, audioData, { headers });
      console.log(response)
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
      throw error;
    }
  }
}
