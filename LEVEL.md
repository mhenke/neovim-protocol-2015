# Level Overview — Neovim Protocol: 2015

Generated: 2025-12-24T18:43:53.382Z

This document outlines the game's levels, the embedded lore beats (Echo logs), the specific Neovim skills taught in each stage, and the reinforcement/assessment strategy used to ensure players internalize muscle memory.

Principles
- Anchor (blue) = realtime advisor: occasional, lightweight interjections to guide and reassure during play.
- Echo (green) = past logs / lore: LOG_NN fragments appearing as historical narrative to advance story and reward "busy work" or milestone completion.
- Hands-off UX: minimal mouse/hover affordances; keyboard-first interactions only.

### LEVEL 1: SIGNAL WARMUP: INITIAL CONTACT

**Episode:** 1 - THE BREACH (Awakening/Breach)
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

Level 2: LOG INJECTION (Basic Insert Mode)

---

### Episode 1 — THE BREACH (Awakening/Breach) - Level Design Guidelines

This episode focuses on the player's initial entry into the mainframe, searching for Echo's traces. Levels in this episode should build upon basic navigation, introducing fundamental editing commands diegetically.

**Episode Goal:** Establish a persistent presence within the mainframe, understand the immediate threat, and uncover Echo's fragmented logs (LOG_00 to LOG_03).

**Teaching Focus:** Basic navigation (from Signal Warmup), basic Insert Mode (`i`, `a`, `o`, `I`, `A`), simple Deletion (`x`, `d`, `dw`, `dd`), and potentially basic Change (`cw`, `cc`). **Text objects (e.g., `ci"`) and advanced motions (`f`, `t`) are reserved for Episode 2.**

---

#### Example: Level 1: `signal_trace.log` (First Level of Episode 1)

### LEVEL 2: LOG INJECTION: PROTOCOL ESTABLISHMENT

**Episode:** 1 - THE BREACH (Awakening/Breach)
**Core Skill:** Basic Insert Mode (`i`, `a`, `o`, `I`, `Esc`), Save/Quit (`:w`, `:q`)
**Supporting Skills:** Basic Navigation (`h/j/k/l`, `w/b`, `0/$`)
**Difficulty Indicator:** Keystrokes: advisory

---

#### NARRATIVE HOOK (2-3 sentences)

SIGNAL STABILIZED. Your initial trace confirmed Echo's presence. Now, to establish a persistent link, you must inject bypass protocols directly into the log stream and commit these changes before exiting the session. Time is critical: the mainframe's purge routines are cycling, and any uncommitted data will be lost.

---

#### TECHNICAL OBJECTIVE (1 clear sentence)

Insert new CGI protocol headers and append critical parameters, then save and exit the `protocol_bypass.cgi` file.

---

#### TASK PROGRESSION (5 micro-goals)

**Task 1: Insert Bypass Command**

- Metaphor: "Insert a stealth bypass command."
- Mechanic: "Navigate to 'STATUS: DEACTIVATED'. Use `i` to insert 'ACTIVE' before 'DEACTIVATED'. Press `Esc`."
- Check: Line is 'STATUS: ACTIVATED'.

**Task 2: Append Authentication Token**

- Metaphor: "Append an authentication token."
- Mechanic: "Navigate to 'ROUTE: UNSECURED'. Use `a` to append '_SECURE'. Press `Esc`."
- Check: Line is 'ROUTE: UNSECURED_SECURE'.

**Task 3: Create New Log Entry**

- Metaphor: "Generate a new, unflagged log entry."
- Mechanic: "Navigate to '// APPEND_POINT'. Use `o` to create a new line below, type 'LOG_04_PING', and press `Esc`."
- Check: New line 'LOG_04_PING' exists.

**Task 4: Initialize Log Buffer State**

- Metaphor: "Activate the log buffer."
- Mechanic: "Navigate to 'BUFFER: UNINITIALIZED'. Use `I` to insert 'INIT: '. Press `Esc`."
- Check: Line is 'INIT: BUFFER: UNINITIALIZED'.

**Task 5: Commit and Exit**

- Metaphor: "Commit your changes and securely exit."
- Mechanic: "Type `:w` and `Enter` to save. Then type `:q` and `Enter` to quit."
- Check: Commands `:w` and `:q` executed successfully.

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"`i` inserts before the cursor. `a` appends after the cursor. `o` creates a new line below. `I` inserts at the beginning of the line. Press `Esc` to exit Insert Mode. Type `:w` to save. Type `:q` to quit."

**Environmental Clue:**
"PURGE CYCLE: IMMINENT. Commit changes to prevent data loss."

---

#### SUCCESS MESSAGE

"PROTOCOL ESTABLISHED."
"Bypass protocols injected. Persistent link secured. Echo trace sustained."

---

#### FAILURE CONDITIONS (if applicable)

"PURGE COMPLETE."
"Security protocols detected anomalous activity. Log segment purged. Connection lost."

---

#### BUILDS ON:

Level 1: SIGNAL WARMUP (Basic Navigation)

#### LEADS TO:

Level 3: PROTOCOL RECONFIGURATION (Text Objects)

---

### LEVEL 3: PROTOCOL RECONFIGURATION: TEXT OBJECTS

**Episode:** 1 - THE BREACH (Awakening/Breach)
**Core Skill:** Text Objects (`ci"`, `ci(`, `ci[`, `cit`, `ci{`), Deletion (`diw`, `daw`), Undo (`u`)
**Supporting Skills:** Basic Navigation, Insert Mode
**Difficulty Indicator:** Keystrokes: advisory

---

#### NARRATIVE HOOK (2-3 sentences)

SYSTEM PROTOCOL INTRUSION. An alien configuration file, `config_alien.json`, is actively resisting your bypass attempts. Its parameters are locked within complex delimiters. You must precisely target and reconfigure critical values using specialized text manipulation to establish a backdoor before the mainframe purges your connection.

---

#### TECHNICAL OBJECTIVE (1 clear sentence)

Use Neovim's text objects to modify configuration parameters within specific delimiters and perform precise data deletions.

---

#### TASK PROGRESSION (8 micro-goals)

**Task 1: Change Connection Protocol**

- Metaphor: "Override a network protocol from an insecure standard to an encrypted one."
- Mechanic: "With the cursor on the line containing 'http', type `ci` then `'` to change the protocol to 'https'."
- Check: `'protocol': 'https'` is present.

**Task 2: Adjust System Port**

- Metaphor: "Reroute a critical system port to a secure, less monitored channel."
- Mechanic: "With the cursor on the line containing '8080', type `ci` then `(` to change the port to '443'."
- Check: `'port': '443'` is present.

**Task 3: Elevate User Privileges**

- Metaphor: "Escalate user privileges by modifying a user count value."
- Mechanic: "With the cursor on the line containing 'user_alpha_5', type `ci` then `[` to change the user count '5' to '10'."
- Check: `'user_alpha_10'` is present.

**Task 4: Reclassify Data Tag**

- Metaphor: "Reclassify a sensitive data tag within an XML-like structure to evade monitoring."
- Mechanic: "With the cursor on the line containing '<tag>', type `ci` then `t` to change the data tag to 'telemetry'."
- Check: `<tag>telemetry</tag>` is present.

**Task 5: Update Configuration ID**

- Metaphor: "Rotate a configuration ID to mask your presence."
- Mechanic: "With the cursor on the line containing '{123}', type `ci` then `{` to change the config ID to '456'."
- Check: `'config_id': '456'` is present.

**Task 6: Purge Stray Token**

- Metaphor: "Eliminate a stray, non-functional token that could flag your activity."
- Mechanic: "With the cursor on 'corrupt_word_here', type `di` then `w` to delete the inner word."
- Check: `corrupt_word_here` is missing.

**Task 7: Remove Redundant Entry**

- Metaphor: "Remove a redundant log entry and its surrounding space."
- Mechanic: "With the cursor on 'delete_me', type `da` then `w` to delete the word and its adjacent space."
- Check: `delete_me` is missing.

**Task 8: Correct Critical Message Casing and Confirm Undo**

- Metaphor: "Temporarily alter a critical system message to confirm write access, then revert to original state, verifying history."
- Mechanic: "Navigate to 'SYSTEM_INTEGRITY_COMPROMISED'. Use `x` to change 'S' to 's', then `u` to undo."
- Check: The text 'SYSTEM_INTEGRITY_COMPROMISED' is present and unchanged after the sequence.

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"Type `ci` (change inside) followed by `'` to change text inside single quotes. This enters Insert Mode. Type `ci` then `(` to change text inside parentheses. Type `ci` then `[` to change text inside square brackets. Type `ci` then `t` to change text inside XML/HTML-like tags. Type `ci` then `{` to change text inside curly braces. Type `di` (delete inside) then `w` to delete the inner word. Type `da` (delete around) then `w` to delete a word and its surrounding space. `x` deletes a character under the cursor. `u` undoes the last change."

**Environmental Clue:**
"FILE INTRUSION: config_alien.json. Parameters are delimited by various brackets and quotes common in 2015 config files."

---

#### SUCCESS MESSAGE

"PROTOCOL RECONFIGURED."
"Alien configuration bypassed. Backdoor established. Prepare for data injection."

---

#### FAILURE CONDITIONS (if applicable)

"INTEGRITY VIOLATION."
"Configuration altered incorrectly. Protocol integrity violated. Connection purge initiated."

---

#### BUILDS ON:

Level 2: LOG INJECTION (Basic Insert Mode)

#### LEADS TO:

Level 4: DATA PURGE (Deletion, Yanking/Pasting)

---

### LEVEL 4: DATA PURGE: ANOMALY MANAGEMENT

**Episode:** 1 - THE BREACH (Awakening/Breach)
**Core Skill:** Deletion (`dd`), Yanking/Pasting (`yy`, `p`)
**Supporting Skills:** Basic Navigation, Insert Mode
**Difficulty Indicator:** Keystrokes: advisory

---

#### NARRATIVE HOOK (2-3 sentences)

SYSTEM FAULT DETECTED. The mainframe's memory banks are exhibiting dynamic, self-correcting behaviors, with compromised log entries triggering latent subroutines. You must swiftly purge these anomalies and duplicate verified data fragments to prevent a system-wide cascade.

---

#### TECHNICAL OBJECTIVE (1 clear sentence)

Delete specific corrupted log entries and duplicate a verified status line within the current buffer.

---

#### TASK PROGRESSION (5 micro-goals)

**Task 1: Purge Critical Process Failure**

- Metaphor: "Eliminate a critical process failure entry that signals a system vulnerability."
- Mechanic: "Navigate to the first 'ERROR:' line and use `dd` to delete it."
- Check: Line containing "CRITICAL_PROCESS_FAIL" is missing.

**Task 2: Purge Memory Allocation Error**

- Metaphor: "Eliminate a memory allocation error entry."
- Mechanic: "Navigate to the next 'ERROR:' line and use `dd` to delete it."
- Check: Line containing "MEMORY_ALLOCATION_FAIL" is missing.

**Task 3: Purge Unknown Module Warning**

- Metaphor: "Eliminate a warning for an unknown module load."
- Mechanic: "Navigate to the 'WARN:' line and use `dd` to delete it."
- Check: Line containing "UNKNOWN_MODULE_LOAD" is missing.

**Task 4: Purge Corrupt Filesystem Error**

- Metaphor: "Eliminate a corrupt filesystem error entry."
- Mechanic: "Navigate to the final 'ERROR:' line and use `dd` to delete it."
- Check: Line containing "CORRUPT_FILESYSTEM" is missing.

**Task 5: Replicate Verified Login Event**

- Metaphor: "Duplicate a successful user login event to reinforce system stability metrics."
- Mechanic: "Navigate to 'INFO: USER_LOGIN_GHOST' line and use `yy` to yank (copy) it, then `p` to paste it on the line below."
- Check: A duplicate line 'INFO: USER_LOGIN_GHOST' exists below the original.

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"`dd` deletes the current line. `yy` yanks (copies) the current line. `p` pastes the yanked content below the cursor. `u` can undo your last action."

**Environmental Clue:**
"ANOMALY STATUS: Fluctuating. System integrity at 60%. Prioritize data consolidation."

---

#### SUCCESS MESSAGE

"DATA SANITIZED."
"Corrupted logs purged. Verified data replicated. Mainframe stability restored."

---

#### FAILURE CONDITIONS (if applicable)

"MEMORY OVERLOAD."
"Uncontained anomalies have led to memory overflow. System reset initiated. Previous progress lost."

---

#### BUILDS ON:

Level 3: PROTOCOL RECONFIGURATION (Text Objects)

#### LEADS TO:

Level 5: ANOMALY: EMERGENT BEHAVIOR (Visual Mode)

---

### LEVEL 5: ANOMALY: EMERGENT BEHAVIOR (Visual Mode)

**Episode:** 1 - THE BREACH (Awakening/Breach)
**Core Skill:** Visual Modes (`v`, `V`, `Ctrl+v`)
**Supporting Skills:** Deletion (`d`), Yanking/Pasting (`y`, `p`)
**Difficulty Indicator:** Keystrokes: advisory

---

#### NARRATIVE HOOK (2-3 sentences)

ANOMALY DETECTED: Emergent behavior observed in Sector-04. Subversive daemons are manipulating metadata, causing unpredictable responses and cultural drift within the mainframe. You must isolate and reconfigure these anomalies, but be precise—collateral damage will trigger Watchdog protocols.

---

#### TECHNICAL OBJECTIVE (1 clear sentence)

Use visual modes to selectively delete anomalous tokens, duplicate critical trace data, and excise corrupt code segments.

---

#### TASK PROGRESSION (3 micro-goals)

**Task 1: Select and Delete Anomalous Token**

- Metaphor: "Isolate and purge a volatile daemon signature from the anomaly report."
- Mechanic: "Navigate to 'SUBVERSIVE_DAEMON_ACTIVITY'. Use `v` to select the entire token, then `d` to delete it."
- Check: Text `SUBVERSIVE_DAEMON_ACTIVITY` is missing.

**Task 2: Visual-Line Duplicate Trace Data**

- Metaphor: "Replicate a critical kernel trace entry to analyze its propagation pattern."
- Mechanic: "Navigate to the 'TRACE: kernel_hooked' line. Use `V` to select the entire line, then `y` to yank it, and `p` to paste it directly below."
- Check: The line `TRACE: kernel_hooked` appears twice consecutively.

**Task 3: Block Excise Corrupt Code Segment**

- Metaphor: "Precisely excise a corrupt segment from the code without affecting surrounding data."
- Mechanic: "Navigate to 'F00D' on the 'CODE: F00D00F0' line. Use `Ctrl+v` to select the 'F00D' characters as a block, then `d` to delete them."
- Check: The line 'CODE: 00F0' is present.

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"Trust patterns, not first impressions. Visual inspection matters. Use 'v' to select characters, 'V' for lines, 'Ctrl+v' for blocks."

**Environmental Clue:**
"ANOMALY STATUS: UNSTABLE. Expect rapid metadata flux. Precision is critical."

---

#### SUCCESS MESSAGE

"ANOMALY CONTAINED."
"Emergent behavior reconfigured. Watchdog protocols bypassed. Proceed to next sector."

---

#### FAILURE CONDITIONS (if applicable)

"CORRUPTION SPREADING."
"Uncontained anomaly detected. System rollback initiated. All recent activity erased."

---

#### BUILDS ON:

Level 4: DATA PURGE (Deletion, Yanking/Pasting)

#### LEADS TO:

Level 6: DATA STREAMS (Search and Navigation)

Episode 2 — The Trace (Efficiency)
- Levels: firewall_rules.json (Level 7), blockchain_ledger.dat (Level 8), neural_net.py (Level 9), config_array.ini (Level 10), code_analysis.cpp (Level 11)
- Core Lore: Echo fragments deepen and hint at R&D anomalies and replication patterns.
- Teaches: text-objects (ci" ci' ci( ci{ ci[), visual modes (v, V, Ctrl+v), find/t motions (f t F T), bracket-matching (%), counts & dot command
- Reinforced: time-limited runs and repeatable drills to reward the dot-command and counts mastery

Episode 3 — The Core (Mastery)
- Levels: source_code.js (Level 12), reality.sys (Level 13), terminal_capture.log (Level 14), macro_sequence.dat (Level 15), FINAL_GATE.lock (Level 16)
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