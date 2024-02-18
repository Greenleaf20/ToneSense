import {AppModule} from './app/app.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import axios from 'axios';

const SpeechToText_API_URL = "https://api-inference.huggingface.co/models/codenamewei/speech-to-text";
const API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions";
const headers = { Authorization: "Bearer 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" };

async function audioQuery(audioData: File): Promise<any> {
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
async function textQuery(text: string): Promise<any> {
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

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));

async function fetchAndSetFile() {
  try {
    const fileLink = "assets/OAF_back_angry.wav";
    const response = await fetch(fileLink);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const file = new File([blob], 'filename.wav');
    console.log(file)
    return await audioQuery(file)
  } catch (error) {
    console.error('Error fetching or setting file:', error);
  }
}

fetchAndSetFile().then((outputText) => {
  console.log("Audio is " + outputText);
  textQuery(outputText).then((output) => {
    console.log("Output is " + output);
  })
    .catch((error) => {
      console.error("Error during text query:", error);
    });
})
