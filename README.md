## What is?
- just like the name suggests it acts as a proxy agent for you that attends meetings for you 

## My motivation behind this:
- The motivation behind this idea was the boring meetings on updates and scrum meetings which do not require your attention 
- If you hate **"FORCED-FUN"** (silly team bonding meetings) then Proxy should be able to do this too (Future Scope)
- Fast token generation of **Cerebras**. It would be nearly impossible to mimic human like answers if the llm's where slow

## Solution
- The AI is your Co-Pilot: It handles the routine, informational tasks. It responds to standard checks, pulls up data instantly, and communicates status reports. This is the "What did you do yesterday? What's the PR number for that fix?" part of the meeting (this also includes laughing at the jokes(lame or !lame) of your co workers)
- You are the Lead Pilot: You handle the complex, hands-on, and visual maneuvers that require judgment and direct control. This is the screen-sharing demo, the deep technical discussion, and the strategic planning.

## The overview of system 
![Screenshot of the system arch](images/system.png)


## Explanation
 ### LLM1:
- decides if the questions needs the context from the Github and Slack or from the past responses
- if no then the llm1 gives the human like response

### LLM2:
- the llm 2 is specifically for designing the query search for the Github API because vector search is not possible 
traditional rag can take too much time and decided to utilize the githubs inbuilt search
- comparatively quite smaller reasoning model

### TTS and STT:
text to speec and speech to text 

### Features that will be good:
- Same voice that tough real time is tough (Must to fool your co workers)
- maybe we could also do chat injestion instead of necessary voice (but implementing voice > implementing text)
- the key lies in the prompts of the llm's
- Add a text input option if llm hallucinates then you can intervene in between to give your personalised answer

### Note & Problems:
- selection of prompts and models will be decided based on trial and error 
- privacy with exposing your codebase to LLM'S
- Yet to test the latency (which is highly reduced thanks to Cerebras)




