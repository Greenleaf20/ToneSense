import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import axios from 'axios';

const SpeechToText_API_URL = "https://api-inference.huggingface.co/models/codenamewei/speech-to-text";
const API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions";
const headers = { Authorization: "Bearer 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" };

async function textQuery(text: string): Promise<any> {
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

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));

textQuery("I got divorced")
  .then((output) => {
    console.log("Output is " + output);
  })
  .catch((error) => {
    console.error("Error during text query:", error);
  });
