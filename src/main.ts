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
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
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

async function fetchAndSetFile() {
  try {
    const fileLink = "assets/sample2.ogg";
    const response = await fetch(fileLink);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const file = new File([blob], 'filename.wav');
    return await audioQuery(file)
  } catch (error) {
    console.error('Error fetching or setting file:', error);
  }
}

fetchAndSetFile().then((outputText) => {
  console.log("Audio is " + outputText);
})
textQuery("Under the golden canopy of a sun-kissed sky, laughter dances like sparkling sunlight on the waves of a tranquil sea. Joy unfurls its wings, painting the world in vibrant hues of blissful abandon. Each moment becomes a symphony of jubilant melodies, orchestrating a chorus of laughter and song that echoes through the tapestry of life. Hearts swell with gratitude, like blossoms unfurling their petals to the warm embrace of spring, as the simple pleasures of existence take on a radiant glow. Every smile becomes a beacon of light, illuminating the path ahead with the promise of endless possibility and boundless love. In the embrace of companionship and camaraderie, souls find solace and strength, weaving a tapestry of connection that transcends the boundaries of time and space. And in the gentle rhythm of each passing day, there is a melody of hope, a reminder that within the depths of the human spirit, happiness blooms eternal")
    .then((output) => {
      console.log("Output is " + output);
    })
    .catch((error) => {
      console.error("Error during text query:", error);
    });
  console.log("Upload button clicked!");
