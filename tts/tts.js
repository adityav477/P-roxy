import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: new URL('../stt/.env', import.meta.url).pathname })



// Option 2: Using ElevenLabs (Best for natural conversations)
async function textToSpeechElevenLabs(text) {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  const VOICE_ID = 'dxhwlBCxCrnzRlP4wDeE'; // Default voice, get yours from elevenlabs.io

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs TTS failed: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    return Buffer.from(audioBuffer);

  } catch (error) {
    console.error('Error in ElevenLabs TTS:', error);
    throw error;
  }
}

async function isBotStillActive(botId) {
  const RECALL_API_KEY = process.env.RECALL_API_KEY;
  const RECALL_REGION = process.env.RECALL_REGION; // unify region (e.g., 'us-east-1')

  const resp = await fetch(`https://${RECALL_REGION}.recall.ai/api/v1/bot/${botId}`, {
    headers: { Authorization: `Token ${RECALL_API_KEY}` }
  });
  if (!resp.ok) return false;

  const botData = await resp.json();
  const changes = botData.status_changes || [];
  const last = Array.isArray(changes) ? changes[changes.length - 1] : botData.status_changes?.latest;
  const code = last?.code || botData.status || botData.state;

  const active = code === 'in_call_recording' || code === 'in_call_not_recording' || code === 'in_call';
  console.log(`[isBotStillActive] region=${RECALL_REGION} code=${code} active=${active}`);
  return active;
}

// Fixed function to check bot status with better error handling
async function waitForBotReady(botId, maxWaitTime = 60000) {
  const RECALL_API_KEY = process.env.RECALL_API_KEY;
  const RECALL_REGION = process.env.RECALL_REGION || 'us-east-1';

  console.log('⏳ Waiting for bot to join meeting...');
  console.log(`Bot ID: ${botId}`);

  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const response = await fetch(
        `https://${RECALL_REGION}.recall.ai/api/v1/bot/${botId}`,
        {
          headers: {
            'Authorization': `Token ${RECALL_API_KEY}`,
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get bot status: ${response.statusText} - ${errorText}`);
      }

      const botData = await response.json();

      // Log the full response to see the structure
      console.log('Bot data:', JSON.stringify(botData, null, 2));

      // Try different possible status field locations
      const status = botData.status_changes?.latest ||
        botData.status ||
        botData.state ||
        botData.recording_status;

      console.log(`Bot status: ${status}`);

      // Check various possible "ready" states
      if (status === 'in_call_recording' ||
        status === 'recording' ||
        status === 'in_call' ||
        status === 'ready') {
        console.log('✅ Bot is ready!');
        return true;
      }

      // If status is still undefined after multiple tries, maybe the bot is already ready
      // Try to send a test request
      if (!status && Date.now() - startTime > 10000) {
        console.log('⚠️ Status undefined, attempting to send audio anyway...');
        return true;
      }

      // Wait 2 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error('Error checking bot status:', error.message);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  throw new Error('Bot did not join meeting within timeout period');
}

// Send audio to Recall.ai bot
// Send audio to Recall.ai bot using Output Audio endpoint
async function sendAudioToRecall(audioBuffer, botId) {
  const RECALL_API_KEY = process.env.RECALL_API_KEY;
  const RECALL_REGION = process.env.RECALL_REGION || 'us-west-2'; // or 'us-west-2'

  try {
    // Check if bot is still active before sending
    const isActive = await isBotStillActive(botId);
    if (!isActive) {
      throw new Error('Bot is no longer active in the call. Cannot send audio.');
    } else {
      console.log("📤 Bot is active")
    }

    console.log('📤 Sending audio to Recall.ai bot...');

    // Convert audio buffer to base64
    const b64Audio = audioBuffer.toString('base64');

    console.log(`Audio buffer size: ${audioBuffer.length} bytes`);
    console.log(`Base64 string length: ${b64Audio.length} characters`);

    // Recall.ai Output Audio endpoint
    // Docs: https://docs.recall.ai/docs/output-audio-in-meetings
    const response = await fetch(
      `https://${RECALL_REGION}.recall.ai/api/v1/bot/${botId}/output_audio/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${RECALL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kind: 'mp3',
          b64_data: b64Audio
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Recall.ai API failed: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Audio sent successfully to Recall.ai');
    return result;

  } catch (error) {
    console.error('Error sending audio to Recall:', error);
    throw error;
  }
}

async function speakInMeeting(text, botId, ttsProvider = 'elevenlabs') {
  try {
    console.log('🎤 Converting text to speech...');

    // Step 1: Convert text to audio
    let audioBuffer;
    switch (ttsProvider) {
      case 'elevenlabs':
        audioBuffer = await textToSpeechElevenLabs(text);
        break;
      default:
        throw new Error(`Unknown TTS provider: ${ttsProvider}`);
    }

    console.log(`✅ Audio generated (${audioBuffer.length} bytes)`);

    // Optional: Save audio locally for debugging
    const audioPath = path.join(process.cwd(), 'temp', `response_${Date.now()}.mp3`);
    fs.mkdirSync(path.dirname(audioPath), { recursive: true });
    fs.writeFileSync(audioPath, audioBuffer);
    console.log(`💾 Audio saved to: ${audioPath}`);

    // function isValidBase64(s) {
    //   try {
    //     const buf = Buffer.from(s, 'base64');
    //     return buf.length > 0 && Buffer.from(buf).toString('base64') === s.replace(/\s+/g, '');
    //   } catch {
    //     return false;
    //   }
    // }
    // if (!isValidBase64(silentB64)) {
    //   console.error('[BOT] Invalid base64 in base64example.txt');
    //   process.exit(1);
    // } else {
    //   console.log("valid base64 example");;
    // }

    let result;
    const isActive = await isBotStillActive(botId);

    if (isActive) {
      console.log('📤 Bot is active, sending audio...');
      result = await sendAudioToRecall(audioBuffer, botId);
      console.log('🎉 Speech delivered to meeting!');
      return result;
    } else {
      console.warn('⚠️ Bot is not active in sendAudio call, skipping send.');
      return { success: false, reason: 'bot_not_active' };
    }
  } catch (error) {
    console.error('Error in speakInMeeting:', error);
    throw error;
  }
}

// speakInMeeting("How are you?", "23343");

//Export functions
export {
  textToSpeechElevenLabs,
  sendAudioToRecall,
  speakInMeeting
};

// Example usage:
// import { speakInMeeting } from './tts-recall.js';
// const llmResponse = "Hey team, here's what I found...";
// await speakInMeeting(llmResponse, 'your-bot-id', 'openai');
