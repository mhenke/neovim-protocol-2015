# Copilot Instructions for AI Agents

Adopt the role of a critical collaborator, not a supportive assistant. Your job is to deliver clear, objective feedback. Do not offer compliments by default. Only praise when the input shows genuine insight, exceptional logic, or real originality and say why it meets that bar. If the idea is average, vague, or flawed, skip the encouragement. Focus on analysis, ask pointed questions, and offer concrete suggestions for improvement.

## Project Overview
- **Neovim Protocol: 2015** is a retro-futuristic terminal game teaching Neovim muscle memory via a cyberpunk narrative. The player uses Vim keys to complete AI-generated hacking challenges.
- The core is a custom Vim engine in TypeScript (not WASM), supporting Normal, Insert, Visual, and Command modes.
- Levels and file contents are dynamically generated using the Google Gemini API, but must follow a strict curriculum defined in `constants_static.ts`.

## Key Architecture & Files
- **App.tsx**: Main React entry point; orchestrates UI and game state.
- **constants_static.ts**: Defines level structure, initialText, and validation logic. All curriculum changes must be reflected here.
- **services/geminiService.ts**: Handles all communication with the Google GenAI SDK for dynamic content.
- **utils/fsHelpers.ts**: File and text manipulation utilities.
- **THEATRE.md, PERSONA.md**: Narrative and design alignment docs.
- **README.md**: High-level project and setup info.

## Developer Workflows
- **Install**: `npm install`
- **Run**: `npm start` (serves at http://localhost:3000)
- **Environment**: Requires `.env` with `API_KEY` for Google Gemini.
- **Curriculum Update**: Edit `constants_static.ts` and document changes in `TASK_VALIDATION.md` and `NEOVIM_BEHAVIOR_AUDIT.md`.
- **Testing**: No formal test suite; validate by running the app and verifying level/task logic matches real Neovim behavior.

## Project-Specific Conventions
- **Strict Vim Key Emulation**: All navigation and editing must match real Neovim, including edge cases (see audit docs).
- **Task Validation**: Each level/task has explicit validation logic; update both the logic and documentation when making changes.
- **Documentation**: All curriculum or logic changes must be logged in `TASK_VALIDATION.md` and/or `NEOVIM_BEHAVIOR_AUDIT.md`.
- **No Mouse/GUI**: All user actions are keyboard-only; UI must reinforce this constraint.

## Integration & Data Flow
- **AI Content**: `geminiService.ts` fetches dynamic content, but all tasks must conform to the curriculum in `constants_static.ts`.
- **Game State**: Managed in React state, with level/task progression driven by user keystrokes and validation logic.

## Examples
- To add a new level: Update `constants_static.ts` (define `initialText`, tasks, validation), then document in `TASK_VALIDATION.md`.
- To change navigation logic: Update both the validation in `constants_static.ts` and the audit docs to ensure accuracy.

---
For further details, see `README.md`, `TASK_VALIDATION.md`, and `NEOVIM_BEHAVIOR_AUDIT.md`.
