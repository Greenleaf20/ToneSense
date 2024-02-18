import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  private chunks: any[] = [];
  private mediaRecorder: any;
  private audioContext: AudioContext = new AudioContext();
  private audioBlobSubject = new Subject<Blob>();
  private audioBlob = new Blob();

  audioBlob$ = this.audioBlobSubject.asObservable();

  // async startRecording() {
  //   if (this.audioContext.state === 'suspended') {
  //     await this.audioContext.resume();
  //   }

  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   this.mediaRecorder = new MediaRecorder(stream);
  //   this.mediaRecorder.ondataavailable = (event: any) => this.chunks.push(event.data);
  //   this.mediaRecorder.start();
  // }

  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   this.mediaRecorder = new MediaRecorder(stream);
  //   this.mediaRecorder.ondataavailable = (event: any) => this.chunks.push(event.data);
  //   this.mediaRecorder.start();
  // }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    this.mediaRecorder=new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable=(event:any) => this.chunks.push(event.data);
    this.mediaRecorder.start();
  }

  // async stopRecording() {
  //   if (this.mediaRecorder) {
  //     this.mediaRecorder.onstop = async () => {
  //       const audioData = await new Blob(this.chunks).arrayBuffer();
  //       const audioBuffer = await this.audioContext.decodeAudioData(audioData);
  //       const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
  //       this.audioBlobSubject.next(wavBlob);
  //       this.chunks = [];
  //     };

  //     this.mediaRecorder.stop();
  //   }
  // }

    async stopRecording() {
        if (this.mediaRecorder) {
            try {
                await new Promise<void>((resolve) => {
                    this.mediaRecorder.onstop = () => {
                        this.audioBlob = new Blob(this.chunks, { type: 'audio/wav' });
                        console.log(this.audioBlob);
                        this.audioBlobSubject.next(this.audioBlob);
                        this.chunks = [];
                        resolve(); // Signal completion
                    };
                    this.mediaRecorder.stop();
                });
            } catch (error) {
                console.error('Error stopping recording:', error);
                // Handle error appropriately, e.g., throw a custom error
                throw new Error('Recording failed');
            }
        }
        return this.audioBlob;
    }


  // async saveAudioToFile() {
  //   if(this.chunks.length>0) {
  //     const audioData = await new Blob(this.chunks).arrayBuffer();
  //     const audioBuffer = await this.audioContext.decodeAudioData(audioData);
  //     const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
  //     FileSaver.saveAs(wavBlob, 'Audio.wav');
  //   }
  // }

  async saveAudioToFile() {
      //FileSaver.saveAs(audioBlob, 'Audio.wav');
      return this.audioBlob
  }
}
