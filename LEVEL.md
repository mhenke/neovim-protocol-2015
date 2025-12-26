# Level Overview — Neovim Protocol: 2015

This document outlines the game's 15-level curriculum, mapping the narrative arc to a logical, progressive skill acquisition for Neovim. The curriculum is designed to be practical, teaching real-world workflows from the start.

## Episode 1: Foundation (Levels 1-5)
**Goal:** Achieve functional productivity in a single file. The player learns to navigate, edit, and save.

---

### LEVEL 1: NAVIGATION
**Core Skill:** `h/j/k/l`, `w/b`, `0/$`, `gg/G`, `Ctrl-u`/`Ctrl-d` (scrolling)
**Narrative:** Initial breach. Ghost must navigate a corrupted log file to find Echo's first trace. Efficient scrolling is key to parsing large data streams.

---

### LEVEL 2: INSERTION & INSERT MODE EDITING
**Core Skill:** `i/a/o/O/I/A` (Insert Mode), `Esc`, `Ctrl-w`/`Ctrl-u` (Insert Mode Editing)
**Narrative:** Ghost must inject data into a volatile log, correcting typos on the fly without breaking the connection by switching modes unnecessarily.

---

### LEVEL 3: BASIC EDITING
**Core Skill:** `x`, `r`, `dd`, `D`, `cw`, `ciw`, `C`
**Narrative:** The system is hostile. Ghost must sanitize corrupted data, replace incorrect characters, and alter malicious commands to survive.

---

### LEVEL 4: COPY, PASTE, UNDO, & REGISTERS
**Core Skill:** `yy/p/P`, `u/Ctrl-r`, `"+y/p` (System Clipboard), `"ay/ap` (Named Registers)
**Narrative:** Ghost must copy security keys between system files (using both internal and system clipboards), undo mistakes, and manage multiple copied fragments using named registers.

---

### LEVEL 5: FILE OPERATIONS
**Core Skill:** `:w`, `:q`, `:wq`, `:q!`, `:e`
**Narrative:** Ghost has secured a foothold. The final step of the foundation is to commit changes to the mainframe's storage and open new security manifests.

---

## Episode 2: Efficiency (Levels 6-10)
**Goal:** Move beyond basic editing to efficient, precise text manipulation.

---

### LEVEL 6: TEXT OBJECTS
**Core Skill:** `ci"`, `diw`, `daw`, `ci(`, etc.
**Narrative:** Ghost must surgically edit delimited data within complex configuration files (`.json`, `.xml`) to bypass security without triggering alarms.

---

### LEVEL 7: SEARCH & SCREEN POSITIONING
**Core Skill:** `/`, `?`, `n/N`, `*`, `#`, `:nohl`, `zz`
**Narrative:** Echo's traces are scattered. Ghost must hunt down specific error codes, then center the screen (`zz`) to see the surrounding context.

---

### LEVEL 8: VISUAL MODE & VISUAL BLOCK EDITING
**Core Skill:** `v/V/Ctrl-v`, `>/<`, and `I/A` in Visual Block mode
**Narrative:** Ghost must select and reformat large blocks of corrupted code, and use visual block mode to comment out multiple lines of hostile code at once.

---

### LEVEL 9: ADVANCED INTRA-LINE MOTION
**Core Skill:** `f`, `t`, `;`, `,`, `%`
**Narrative:** Data streams are becoming denser. Ghost must master precise, single-line jumps to edit function calls and data structures with surgical accuracy.

---

### LEVEL 10: EFFICIENCY & BLOCK NAVIGATION
**Core Skill:** `.`, counts (`5j`, `d2w`), `{`/`}` (Paragraph/Block Navigation)
**Narrative:** The mainframe deploys repetitive countermeasures. Ghost must use counts, the dot command, and paragraph jumps to automate fixes and outpace system defenses.

---

## Episode 3: Mastery (Levels 11-15)
**Goal:** Manage complex, multi-file workflows and leverage Neovim's most powerful features.

---

### LEVEL 11: BUFFER & WINDOW MANAGEMENT
**Core Skill:** `:ls`, `:bn`, `:sp`, `:vs`, `Ctrl-w`
**Narrative:** The investigation now spans multiple systems. Ghost must manage and view several files at once to correlate intel between security logs, personnel files, and network diagrams.

---

### LEVEL 12: INDENTATION & LINE JOINING
**Core Skill:** `>>`, `<<`, `==`, `gg=G`, `J`
**Narrative:** A critical piece of code is unreadable. Ghost must fix the indentation and join broken lines to understand its logic and uncover a hidden backdoor.

---

### LEVEL 13: GLOBAL SUBSTITUTION
**Core Skill:** `:%s///g`, `:%s///gc`
**Narrative:** A rogue AI process is propagating a malicious token across the entire system. Ghost must use a global substitute command to eradicate it everywhere at once.

---

### LEVEL 14: MARKS & JUMPS
**Core Skill:** `m`, `'`, `` ` ``, `Ctrl-o`, `Ctrl-i`, `''`
**Narrative:** The final clues to Echo's location are hidden across vast, interconnected files. Ghost must plant markers and navigate the jump history to trace the path without getting lost.

---

### LEVEL 15: FINAL GATE
**Core Skill:** Synthesis of all learned commands.
**Narrative:** The Core is protected by the Final Gate, a multi-layered defense mechanism that requires all of Ghost's acquired skills to bypass under pressure. This is the final confrontation to release Echo.