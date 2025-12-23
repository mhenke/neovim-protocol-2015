
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiLevelResponse, LevelConfig } from "../types";
import { STATIC_LEVELS } from "../constants_static";

const PROMPT_TEMPLATE = `
You are the "System Kernel" of a cyberpunk mainframe in 2015. 
The user is "Ghost", a hacker trying to repair "Project ECHO".
You are NOT a teacher. You are a Mission Handler.

Current Context:
- Episode: \${episode} (\${episodeTitle})
- Level: \${levelId} / 17
- Target File: \${levelTitle}
- PRIMARY DIRECTIVE: \${objective}
- PROTOCOLS AVAILABLE: \${newKeys}
\${constraints}

Create a specific hacking challenge formatted as JSON.

STRICT GENERATION RULES:
1. **Atomic Tasks**: You must map the game mechanic to the specific Task Type.
   - If mechanic is 'insert_mode' -> Task Type must be 'contains'.
   - If mechanic is 'delete_line' -> Task Type must be 'missing'.
   - If mechanic is 'search' or 'nav' -> Task Type must be 'cursor_on'.
   - If mechanic is 'substitute' -> Task Type must be 'contains' (checking for the replacement string).
   - If mechanic is 'file_open' -> The description MUST explicitly tell the user to open the target file (e.g., "Switch buffer: :e payload.dat").
   - If mechanic is 'splits' -> Task Type must be 'run_command'. Value must be ":sp" or ":vsp" or ":tabnew".
   
2. **Episode 3 (Mastery) Rules**:
   - **NO HANDHOLDING**: Do NOT tell the user which keys to press in the description.
   - **Key Hint**: Must be empty string or null.
   - **Result-Oriented**: Describe the *outcome* required. (e.g. "Protocol mismatch. Enforce 'HTTPS' globally.").

3. **Episode 1 & 2 Rules (Instructional)**:
   - **Explicit Actions**: The Description MUST describe the physical action and the content.
     - BAD: "Inject override string."
     - GOOD: "Open a new line (o) and type: 'ACCESS: ADMIN'"
     - GOOD: "Append to line (A) and type: 'CONFIRMED'"
     - GOOD: "Run vertical split command: :vsp"
   - **Mandatory Cycle**: For ANY task involving Insert Mode (i, a, o, A, c, s), you MUST explicitly say "Press Esc".
     - CORRECT FORMAT: "Navigate to end ($) -> Append (A) -> Type '_FIXED' -> Press Esc."
   - **Key Hints**: Provide the specific key combo in the 'keyHint' field (e.g., "o", "A", "ciw").

4. **Diegetic Lore**: Content must look like system logs, code fragments, config files, or hex dumps.
5. **No Fluff**: Tasks must be direct.

JSON Structure:
1. "briefing": Status report.
2. "tasks": Array of 3-5 TACTICAL STEPS.
   - 'contains': File must contain string.
   - 'missing': File must NOT contain string.
   - 'cursor_on': Cursor must be on line with string.
   - 'run_command': User must execute a specific command (for splits/tabs).
   - 'value': The EXACT string to look for, OR the command to run (e.g. ":sp").
   - 'keyHint': Short key combo to help user (e.g. "ciw").
3. "initialText": The file content before solving (max 8 lines).
4. "targetText": The solved state (for visual ref, engine uses 'tasks' to validate).
5. "loreReveal": A hidden log entry found upon success (Status: SUCCESS).
6. "hints": "Operator Notes". Short, technical reminders about the keys (e.g. "'o' opens a new line below").

Output JSON schema:
{
  "briefing": "String",
  "initialText": ["String"],
  "targetText": ["String"],
  "tasks": [
    { "description": "String", "type": "contains" | "missing" | "cursor_on" | "run_command", "value": "String", "loreFragment": "String", "keyHint": "String" }
  ],
  "loreReveal": "String",
  "hints": ["String"]
}
`;

export const generateLevel = async (config: LevelConfig, loreLog: string[]): Promise<GeminiLevelResponse> => {
  // PRIORITY: Check Static Levels first (Offline/Deterministic Mode)
  if (STATIC_LEVELS[config.id]) {
      // Simulate slight network delay for effect? No, instant is better.
      return STATIC_LEVELS[config.id];
  }

  // FALLBACK: Use API if level not in static library (for dev or future levels)
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let constraints = "";
  if (config.timeLimit) {
    constraints += `- CRITICAL CONSTRAINT: TIME LIMIT ${config.timeLimit}s. Keep tasks immediate and text concise.`;
  }
  if (config.maxKeystrokes) {
    constraints += `- CRITICAL CONSTRAINT: KEYSTROKE LIMIT ${config.maxKeystrokes}. The initialText must be solvable with minimal moves. Do not generate long files.`;
  }
  if (config.episode === 3) {
      constraints += `- MODE: MASTERY. Do NOT provide key hints.`;
  }
  if (config.mechanics.includes('file_open') && config.targetFile) {
     constraints += `- CRITICAL: The primary task is to open the file '${config.targetFile}'. Include a text reference to this file in the initial text.`;
  }
  if (config.mechanics.includes('splits')) {
     constraints += `- CRITICAL: The objective is to monitor multiple streams. Instruct the user to run :sp, :vsp, or :tabnew.`;
  }

  const prompt = PROMPT_TEMPLATE
    .replace("${episode}", config.episode.toString())
    .replace("${episodeTitle}", config.episodeTitle)
    .replace("${levelId}", config.id.toString())
    .replace("${levelTitle}", config.filename)
    .replace("${objective}", config.objective)
    .replace("${newKeys}", config.newKeys.join(", "))
    .replace("${constraints}", constraints);

  try {
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
                    type: { type: Type.STRING, enum: ["contains", "missing", "cursor_on", "run_command"] },
                    value: { type: Type.STRING },
                    loreFragment: { type: Type.STRING, description: "A short, decrypted log message found when this specific task is completed." },
                    keyHint: { type: Type.STRING, description: "Short key combination string, e.g. 'ciw' or 'dd'." }
                },
                required: ["description", "type", "value", "loreFragment"]
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

    return JSON.parse(text) as GeminiLevelResponse;
  } catch (e) {
    console.error("Gemini API Failed", e);
    // Ultimate fallback if both static and dynamic fail
    return {
      briefing: "CONNECTION ERROR. LOCAL CACHE DAMAGED.",
      initialText: ["ERROR_503", "RETRY"],
      targetText: ["RETRY"],
      loreReveal: "Data lost.",
      hints: ["Check internet connection."],
      tasks: [{ description: "System Failure", type: "cursor_on", value: "ERROR", loreFragment: "...", keyHint: "" }]
    };
  }
};
