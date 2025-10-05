import axios from 'axios'
import 'dotenv/config'
import promptSync from 'prompt-sync'
const prompt = promptSync()


console.log('[BOT] Starting Recall.ai bot for Zoom → AssemblyAI integration')

import fs from 'fs'

const saveBotIdToEnv = (botId) => {
  const envFile = '.env'
  let envContents = fs.readFileSync(envFile, 'utf-8')

  if (/^BOT_ID=.*/m.test(envContents)) {
    envContents = envContents.replace(/^BOT_ID=.*/m, `BOT_ID=${botId}`)
  } else {
    envContents += `\nBOT_ID=${botId}\n`
  }

  fs.writeFileSync(envFile, envContents)
  console.log(`[BOT] Saved Bot ID to .env: BOT_ID=${botId}`)
}

const recall = axios.create({
  baseURL: `https://${process.env.RECALL_REGION}.recall.ai/api/v1`,
  headers: {
    'authorization': `token ${process.env.RECALL_API_KEY}`,
    'content-type': 'application/json'
  },
  timeout: 10000
})

console.log(`[BOT] Configured for region: ${process.env.RECALL_REGION}`)
console.log(`[BOT] API endpoint: https://${process.env.RECALL_REGION}.recall.ai/api/v1`)


const silentB64 = fs.readFileSync('base64example.txt', 'utf-8')
  .replace(/\s+/g, '')                // remove newlines/whitespace
  .replace(/^data:audio\/\w+;base64,/, '');

function isValidBase64(s) {
  try {
    const buf = Buffer.from(s, 'base64');
    return buf.length > 0 && Buffer.from(buf).toString('base64') === s.replace(/\s+/g, '');
  } catch {
    return false;
  }
}
if (!isValidBase64(silentB64)) {
  console.error('[BOT] Invalid base64 in base64example.txt');
  process.exit(1);
} else {
  console.log("valid base64 example");;
}

const connectBot = async (meetingURL) => {
  try {
    console.log(`[BOT] Creating bot for meeting: ${meetingURL}`)
    console.log(`[BOT] Webhook endpoint: ${process.env.WEBHOOK_URL}/meeting_transcript`)

    const payload = {
      meeting_url: meetingURL,
      bot_name: "Transcription Bot",
      automatic_audio_output: {
        in_call_recording: {
          data: {
            kind: "mp3",
            b64_data: "..."// Your silent MP3 base64 string
          }
        }
      },

      recording_config: {
        transcript: {
          // This tells Recall.ai to use AssemblyAI's streaming API
          // for real-time transcription processing
          provider: {
            assembly_ai_v3_streaming: {
              // Enable formatted text with punctuation and proper casing
              format_turns: true
            }
          }
        },
        realtime_endpoints: [
          {
            type: "webhook",
            // These events give us both final and partial transcripts
            // - transcript.data: Final transcript segments
            // - transcript.partial_data: Real-time partial transcripts
            events: [
              "transcript.data",
              "transcript.partial_data"
            ],
            url: `${process.env.WEBHOOK_URL}/meeting_transcript`
          }
        ]
      },
    }

    console.log(`[API] POST /bot - Creating bot with AssemblyAI integration`)
    const response = await recall.post('/bot', payload)

    console.log(`[API] Bot created successfully`)
    console.log(`[BOT] Bot ID: ${response.data.id}`)
    console.log(`[BOT] Status: ${response.data.status}`)

    if (response.data.id) {
      saveBotIdToEnv(response.data.id);
    }

    return response.data.id

  } catch (err) {
    console.error(`[BOT] ERROR creating bot:`, err.response?.data || err.message)
    if (err.response?.status === 401) {
      console.error(`[BOT] Check your RECALL_API_KEY in .env`)
    }
    if (err.response?.status === 400) {
      console.error(`[BOT] Invalid configuration - check AssemblyAI setup in Recall.ai dashboard`)
    }
    return null
  }
}

const leaveMeeting = async (meetingID) => {
  try {
    console.log(`[BOT] Leaving meeting: ${meetingID}`)
    await recall.post(`/bot/${meetingID}/leave_call`)
    console.log(`[BOT] Successfully left meeting`)
  } catch (err) {
    console.error(`[BOT] ERROR leaving meeting:`, err.response?.data || err.message)
  }
}

// Main application flow
const runApp = async () => {
  console.log(`[BOT] Starting application...`)

  // Validate environment configuration
  console.log(`[BOT] Validating configuration...`)

  if (!process.env.RECALL_API_KEY) {
    console.error('[BOT] ERROR: RECALL_API_KEY not found in .env file')
    console.error('[BOT] Get your API key from your Recall.ai dashboard')
    process.exit(1)
  }

  if (!process.env.RECALL_REGION) {
    console.error('[BOT] ERROR: RECALL_REGION not found in .env file')
    process.exit(1)
  }

  const validRegions = ['us-west-2', 'us-east-1', 'eu-central-1', 'ap-northeast-1']
  if (!validRegions.includes(process.env.RECALL_REGION)) {
    console.error(`[BOT] ERROR: RECALL_REGION must be one of: ${validRegions.join(', ')}`)
    process.exit(1)
  }

  if (!process.env.WEBHOOK_URL) {
    console.error('[BOT] ERROR: WEBHOOK_URL not found in .env file')
    console.error('[BOT] Start ngrok first: ngrok http 8000')
    process.exit(1)
  }

  console.log(`[BOT] ✓ Configuration valid`)
  console.log(`[BOT] ✓ Region: ${process.env.RECALL_REGION}`)
  console.log(`[BOT] ✓ Webhook: ${process.env.WEBHOOK_URL}`)

  // Get meeting URL from user
  console.log(`[BOT] Ready to join meeting and start transcription`)
  const meetingURL = prompt('What is your meeting URL?: ')

  // Create and deploy bot
  const meetingID = await connectBot(meetingURL)

  if (!meetingID) {
    console.error('[BOT] Failed to create bot. Exiting...')
    process.exit(1)
  }

  console.log(`[BOT] ✓ Bot deployed successfully`)
  console.log(`[BOT] Bot is joining meeting and will start sending transcripts to webhook`)
  console.log(`[BOT] Check Terminal 2 for real-time transcripts`)

  // Wait for user to stop transcription
  const endMeeting = prompt('Type "STOP" to end transcription: ')
  if (endMeeting.toLowerCase() === 'stop') {
    await leaveMeeting(meetingID)
    console.log(`[BOT] Transcription ended`)
  }
}

runApp()
