# Level Overview — Neovim Protocol: 2015

Generated: 2025-12-24T18:43:53.382Z

This document outlines the game's levels, the embedded lore beats (Echo logs), the specific Neovim skills taught in each stage, and the reinforcement/assessment strategy used to ensure players internalize muscle memory.

Principles
- Anchor (blue) = realtime advisor: occasional, lightweight interjections to guide and reassure during play.
- Echo (green) = past logs / lore: LOG_NN fragments appearing as historical narrative to advance story and reward "busy work" or milestone completion.
- Hands-off UX: minimal mouse/hover affordances; keyboard-first interactions only.

### LEVEL 1: SIGNAL WARMUP: INITIAL CONTACT

**Episode:** 1 - THE SEARCH (Awakening/Breach)
**Core Skill:** Basic Navigation (`h/j/k/l`)
**Supporting Skills:** Word Navigation (`w/b`), Line Navigation (`0/$`)
**Difficulty Indicator:** Dynamic (tasks target efficient movement, no strict limit)

---

#### NARRATIVE HOOK

"SYSTEM BOOT SEQUENCE INITIATED. You, Ghost, are attempting to establish initial contact with the Aethelgard mainframe. Basic network protocols are failing, but a faint, corrupted signal—possibly Echo's—flickers in the outermost sector. You need to navigate this fragmented data stream to stabilize the connection and trace the source."

---

#### TECHNICAL OBJECTIVE

Use fundamental NeoVim movement commands to traverse a corrupted log file, pinpointing key data fragments and establishing a stable trace.

---

#### TASK PROGRESSION

**Task 1: Stabilize Data Stream**

- Metaphor: "Locate and stabilize the primary data stream anomaly."
- Mechanic: "Move the cursor down to the marked 'DATA_STREAM_INIT' line using `j` and right to the critical error point using `l`."
- Check: Cursor is on a specific character within the 'DATA_STREAM_INIT' error.

**Task 2: Isolate Signal Source**

- Metaphor: "Isolate the flickering signal's origin within the fragmented log."
- Mechanic: "From current position, move to the beginning of the line using `0`, then move quickly through words to the signal identifier using `w`."
- Check: Cursor is on the first character of the signal identifier.

**Task 3: Confirm Echo Fragment**

- Metaphor: "Confirm the presence of an Echo-signature fragment."
- Mechanic: "Move to the end of the line using `$`, then back to the beginning of the previous word using `b` to verify the log entry timestamp."
- Check: Cursor is on the first character of the timestamp of the previous word.

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"Use `h`, `j`, `k`, `l` for basic cardinal movements. `w` moves to the start of the next word, `b` to the start of the previous word. `0` moves to the start of the current line, `$` to the end."

**Environmental Clue:**
"CORRUPTED SECTOR: Outer Ring. Faint echo signature detected near unstable log entries."

---

#### SUCCESS MESSAGE

"SIGNAL ESTABLISHED."
"Initial contact confirmed. Echo signature detected. Proceeding with trace protocols."

---

#### FAILURE CONDITIONS

"CONNECTION LOST."
"Signal destabilized. Retrying boot sequence. Initial trace lost."

---

#### BUILDS ON:

(N/A, this is the first level)

#### LEADS TO:

Level 2: signal_trace.log (Episode 1 - THE SEARCH)

---

### Episode 1 — THE SEARCH (Awakening/Breach) - Level Design Guidelines

This episode focuses on the player's initial entry into the mainframe, searching for Echo's traces. Levels in this episode should build upon basic navigation, introducing fundamental editing commands diegetically.

**Episode Goal:** Establish a persistent presence within the mainframe, understand the immediate threat, and uncover Echo's fragmented logs (LOG_00 to LOG_03).

**Teaching Focus:** Basic navigation (from Signal Warmup), basic Insert Mode (`i`, `a`, `o`, `I`, `A`), simple Deletion (`x`, `d`, `dw`, `dd`), and potentially basic Change (`cw`, `cc`). **Text objects (e.g., `ci"`) and advanced motions (`f`, `t`) are reserved for Episode 2.**

---

#### Example: Level 2: `signal_trace.log` (First Level of Episode 1)

### LEVEL 2: LOG INJECTION: PROTOCOL ESTABLISHMENT

**Episode:** 1 - THE SEARCH (Awakening/Breach)
**Core Skill:** Basic Insert Mode (`i`, `a`, `o`)
**Supporting Skills:** Basic Navigation (`h/j/k/l`, `w/b`, `0/$`)
**Difficulty Indicator:** Keystrokes: Target efficiency.

---

#### NARRATIVE HOOK

"SIGNAL STABILIZED. Your initial trace has confirmed Echo's presence, but the system is actively attempting to sever the connection. You need to inject a series of bypass protocols directly into the mainframe's log stream to establish a persistent link and prevent further data loss. Time is critical: the system's automated purge routines are cycling."

---

#### TECHNICAL OBJECTIVE

Insert new log entries and append critical parameters within the `signal_trace.log` file to bypass a security protocol.

---

#### TASK PROGRESSION

**Task 1: Inject Bypass Command**

- Metaphor: "Insert a stealth bypass command at the start of the critical log block."
- Mechanic: "Navigate to the designated log line. Use `I` to enter Insert Mode at the beginning of the line, then type 'BYPASS_SEC_0X00: ' and exit Insert Mode with `Esc`."
- Check: Designated line starts with 'BYPASS_SEC_0X00: '.

**Task 2: Append Authentication Token**

- Metaphor: "Append an authentication token to an existing protocol entry."
- Mechanic: "Navigate to the end of the next log line. Use `A` to enter Insert Mode at the end of the line, then type ' [TOKEN_VALID]' and exit Insert Mode with `Esc`."
- Check: Designated line ends with ' [TOKEN_VALID]'.

**Task 3: Create New Log Entry**

- Metaphor: "Generate a new, unflagged log entry to mask your activity."
- Mechanic: "Navigate to a blank line. Use `o` to create a new line below and enter Insert Mode, then type 'LOG_00_ECHO_PING_RECEIVED' and exit Insert Mode with `Esc`."
- Check: A new line `LOG_00_ECHO_PING_RECEIVED` exists at the correct position.

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"`i` inserts before the cursor, `a` appends after. `I` inserts at the start of the line, `A` appends at the end. `o` creates a new line below and enters Insert Mode, `O` creates a new line above. Press `Esc` to exit Insert Mode."

**Environmental Clue:**
"PROTOCOL: INITIATING PURGE CYCLE. Log activity monitored. Stealth required."

---

#### SUCCESS MESSAGE

"PROTOCOL ESTABLISHED."
"Bypass protocols injected. Persistent link secured. Echo trace sustained."

---

#### FAILURE CONDITIONS

"PURGE COMPLETE."
"Security protocols detected anomalous activity. Log segment purged. Connection lost."

---

#### BUILDS ON:

SIGNAL TRACE: INITIAL CONTACT (Basic Navigation)

#### LEADS TO:

Level 3: protocol_entry.log (Episode 1 - THE SEARCH)

Episode 2 — The Trace (Efficiency)
- Levels: firewall_rules.json, blockchain_ledger.dat, neural_net.py, config_array.ini, code_analysis.cpp
- Core Lore: Echo fragments deepen and hint at R&D anomalies and replication patterns.
- Teaches: text-objects (ci" ci' ci( ci{ ci[), visual modes (v, V, Ctrl+v), find/t motions (f t F T), bracket-matching (%), counts & dot command
- Reinforced: time-limited runs and repeatable drills to reward the dot-command and counts mastery

Episode 3 — The Core (Mastery)
- Levels: source_code.js, reality.sys, terminal_capture.log, macro_sequence.dat, FINAL_GATE.lock
- Core Lore: late-stage LOG_xx fragments reveal Echo’s fate and the release protocol.
- Teaches: macros, advanced window/buffer workflow, global substitute/regex (:%s), indentation (gg=G), join/format techniques
- Reinforced: large-scale integrated challenges where players must combine skills under pressure

Narrative & Reinforcement Strategy
- Echo logs (LOG_NN) surface at moments of narrative progress or during "busy work" (keystroke bursts). They should read like post-hoc logs, not live dialog.
- Anchor provides sparse, useful, non-annoying hints. Increase Anchor frequency only on first-time errors or long idle periods.
- Hijack events (NETOPS / WATCHDOG) remain rare, high-contrast narrative events to communicate system hostility.

Implementation Notes
- Echo lore must remain in constants_static.ts as LOG_NN loreFragment strings.
- Anchor realtime messages live in App.tsx messages pool and are rate-limited.
- Keep hover interactions removed; all interactions should be accessible by keyboard alone.

If approved, a short "Signal Warmup" level will be added to STATIC_LEVELS and the curriculum. Say "implement" to add it, or request tweaks to any level's learning objectives or LOG_NN wording.

---

## Recent Constants Update (2025-12-24T19:42:19.026Z)

- The file `constants_static.ts` has been fully overwritten to standardize levels 1–15, consolidate lore, and correct prior inconsistencies.
- Episode I: Echo is presented as fragmented/ambiguous but still a coherent historic narrator; LOG_00–LOG_03 provide the early signal fragments and guide navigation tasks.
- Episode II: The mainframe bureaucracy and emergent unreliability of Echo are represented via LOG_20–LOG_28 entries; NETOPS (relay) and WATCHDOG (antagonist) appear as live/hijack factions intermingled with Anchor messages.
- Episode III: Echo's degradation into system noise and takeover by adversarial processes is represented in late LOG_XX fragments and final-level lore.

### Guarantees
- Echo remains consistently named "Echo" across all lore fragments and level data.
- Lore fragments are sequentially numbered (LOG_00..LOG_150) and thematically aligned with the episode arcs.
- Gameplay fixes applied: verify_key_sequence handling, dialog queueing with dismissal keys (E for Echo, D for dynamic/Anchor messages), and prevention of browser find on '/'.

Refer to THEATRE.md and NEOVIM_BEHAVIOR_AUDIT.md for implementation notes and exact behavior details. If anything in this summary needs rewording, say which line to edit.
