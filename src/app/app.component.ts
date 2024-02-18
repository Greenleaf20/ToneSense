import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioRecordingService } from './audio-recording-service';

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

  constructor(private audioRecordingService: AudioRecordingService, private cd: ChangeDetectorRef) { }

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

  onConvert() {
    console.log("Converting input text")
    // this.onConvert2(this.textToConvert);
  }
}
