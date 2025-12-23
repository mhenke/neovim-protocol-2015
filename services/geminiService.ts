
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiLevelResponse, LevelConfig } from "../types";

const PROMPT_TEMPLATE = `
You are the "System Kernel" of a cyberpunk mainframe in 2015. 
The user is "Ghost", a hacker trying to repair "Project ECHO".
You are NOT a teacher. You are a Mission Handler.

Current Context:
- Episode: \${episode} (\${episodeTitle})
- Level: \${levelId} / 15
- Target File: \${levelTitle}
- PRIMARY DIRECTIVE: \${objective}
- PROTOCOLS AVAILABLE: \${newKeys}
\${constraints}

Create a specific hacking challenge formatted as JSON.

STRICT LORE RULES:
1. DO NOT create generic tasks like "write a shopping list" or "fix this sentence".
2. All content must look like system logs, code fragments, config files, or hex dumps.
3. Tasks must be "Delete corrupt sector", "Inject override code", "Align memory block", etc.
4. "briefing" must be a tense, theatrical status report.

JSON Structure:
1. "briefing": Status report.
2. "tasks": Array of 3-5 TACTICAL STEPS. Format descriptions as imperative commands.
   - 'contains': File must contain string.
   - 'missing': File must NOT contain string.
   - 'cursor_on': Cursor must be on line with string.
3. "initialText": The file content before solving (max 8 lines).
4. "targetText": The solved state.
5. "loreReveal": A hidden log entry found upon success that reveals a piece of the conspiracy.
6. "hints": "Operator Notes". Short, technical reminders about the keys.

Output JSON schema:
{
  "briefing": "String",
  "initialText": ["String"],
  "targetText": ["String"],
  "tasks": [
    { "description": "String", "type": "contains" | "missing" | "cursor_on", "value": "String" }
  ],
  "loreReveal": "String",
  "hints": ["String"]
}
`;

// Fix: Removed apiKey argument to use process.env.API_KEY directly
export const generateLevel = async (config: LevelConfig, loreLog: string[]): Promise<GeminiLevelResponse> => {
  // Fix: Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let constraints = "";
  if (config.timeLimit) {
    constraints += `- CRITICAL CONSTRAINT: TIME LIMIT ${config.timeLimit}s. Keep tasks immediate and text concise.`;
  }
  if (config.maxKeystrokes) {
    constraints += `- CRITICAL CONSTRAINT: KEYSTROKE LIMIT ${config.maxKeystrokes}. The initialText must be solvable with minimal moves. Do not generate long files.`;
  }

  const prompt = PROMPT_TEMPLATE
    .replace("${episode}", config.episode.toString())
    .replace("${episodeTitle}", config.episodeTitle)
    .replace("${levelId}", config.id.toString())
    .replace("${levelTitle}", config.filename)
    .replace("${objective}", config.objective)
    .replace("${newKeys}", config.newKeys.join(", "))
    .replace("${constraints}", constraints);

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          briefing: { type: Type.STRING },
          initialText: { type: Type.ARRAY, items: { type: Type.STRING } },
          targetText: { type: Type.ARRAY, items: { type: Type.STRING } },
          loreReveal: { type: Type.STRING },
          hints: { type: Type.ARRAY, items: { type: Type.STRING } },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["contains", "missing", "cursor_on"] },
                value: { type: Type.STRING }
              },
              required: ["description", "type", "value"]
            }
          }
        },
        required: ["briefing", "initialText", "targetText", "loreReveal", "hints", "tasks"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  try {
    return JSON.parse(text) as GeminiLevelResponse;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      briefing: "KERNEL PANIC. RECOVERY MODE.",
      initialText: ["ERROR_0xDEADBEEF", "RETRY_INIT"],
      targetText: ["RETRY_INIT"],
      loreReveal: "Memory sector recovered.",
      hints: ["Keys: " + config.newKeys.join(" ")],
      tasks: [{ description: "Manually override error", type: "cursor_on", value: "ERROR" }]
    };
  }
};
