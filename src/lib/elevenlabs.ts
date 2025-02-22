
import axios from "axios";

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

export async function generateSpeech(text: string, voiceId: string = "21m00Tcm4TlvDq8ikWAM") {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  try {
    const response = await axios.post(
      `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error generating speech:", error);
    throw new Error("Failed to generate audio");
  }
}
