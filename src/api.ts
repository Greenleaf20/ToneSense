import axios from 'axios';

const SpeechToText_API_URL = "https://api-inference.huggingface.co/models/codenamewei/speech-to-text";
const API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions";
const headers = { Authorization: "Bearer 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" };

async function textQuery(text: string): Promise<any> {
  try {
    const response = await axios.post(API_URL, text, { headers });

    if (!response.data.ok) {
      throw new Error(`Error: ${response.data.status} - ${response.data.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error during query:', error);
    throw error; // Re-throw for comprehensive error handling
  }
}

