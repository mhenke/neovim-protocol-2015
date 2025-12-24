
# Neovim Protocol: 2015

> "The mouse is disabled. The GUI is gone. Welcome to the breach."

**Neovim Protocol: 2015** is an immersive, retro-futuristic terminal simulator designed to teach Neovim muscle memory through a cyberpunk narrative. You play as "Ghost", an operative trying to rescue a lost AI consciousness ("Echo") from the Aethelgard Biologics mainframe.

The application uses **Google Gemini 1.5 Flash** to dynamically generate hacking challenges, ensuring that file contents, specific targets, and lore fragments change slightly every time you play, while adhering to a strict pedagogical curriculum.

## ⚡ Features

*   **Immersive Simulation**: A custom-built Vim engine in TypeScript (not WASM) supporting Normal, Insert, Visual, and Command modes.
*   **AI-Driven Levels**: The `@google/genai` SDK generates unique file contents (logs, hex dumps, code) and tasks for every level based on the current difficulty curve.
*   **Narrative Progression**: A 3-Episode arc (Foundation, Efficiency, Mastery) with unfolding lore.
*   **Performance Metrics**: Tracks time remaining and keystroke counts to grade your efficiency; keystroke targets are advisory for Episodes 1–2, and hard maximum keystroke limits are enforced only for Episode 3 (Mastery) levels.
*   **Retro UI**: CRT scanlines, screen flicker, and glitch text effects powered by TailwindCSS.

## 🕹️ Controls & Mechanics

### The Core Loop
1.  **Read the Briefing**: Understand your objective (e.g., "Inject override credentials").
2.  **Navigate & Edit**: Use strictly Vim keys (`h`, `j`, `k`, `l`, `i`, `Esc`, etc.) to manipulate the text.
3.  **Commit Changes**: Type `:w` to verify your tasks. If all logic checks pass, the level is secured.

### Global Shortcuts
*   **Alt + 1** (or F1): System Manual (Help / List of active keys)
*   **Alt + 2** (or F2): Network Map (Level Select)
*   **Alt + 3** (or F3): Operator Notes (Hints & Objective)

## 📚 Curriculum

### Episode 1: THE BREACH (Foundation)
*Focus: Movement & Basic Editing*
*   **Lvl 1-5**: `hjkl` navigation, `i`nsert mode, `d`eletion, basic search (`/`), and file saving (`:w`).

### Episode 2: THE TRACE (Efficiency)
*Focus: Speed & Precision (Time Limits)*
*   **Lvl 6-10**: Text Objects (`ciw`, `di"`), Visual Mode (`v`), Block selection, and Counts (`5j`, `d2w`).

### Episode 3: THE CORE (Mastery)
*Focus: Complex Manipulation (Keystroke max limits enforced)*
*   **Lvl 11-15**: Registers (`"ay`), Macros (`q`, `@`), Global Substitution (`:%s`), and Advanced Motions (`f`, `t`).

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/neovim-protocol-2015.git
    cd neovim-protocol-2015
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    This application requires a Google Gemini API Key.
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: TailwindCSS (Custom animations for CRT effects)
*   **AI/LLM**: Google GenAI SDK (`@google/genai`)
*   **Font**: Fira Code & VT323 (Google Fonts)

## 📝 License

MIT License.
