# Codebase Principle: Smooth Learning Curve for NeoVim

The codebase is designed to provide a smooth, progressive learning curve that focuses on teaching core NeoVim navigation and editing skills. Each level introduces new concepts in a logical sequence, minimizing busywork and maximizing educational value. This approach is critical to player engagement and mastery, ensuring that the experience is both accessible to newcomers and rewarding for returning users.

**Key Points:**
- Early levels focus on simple navigation (j/k), then introduce word movement (w/b), line navigation (0/$), and file navigation (G/gg).
- Tasks are structured to reinforce learning, not just completion.
- The narrative and mechanics reinforce each other to support player growth and motivation.
## Player Experience & Motivation

### Emotional Journey & Learning Curve
The player, as Ghost, should feel a progression from uncertainty and vulnerability to mastery and agency. Early levels evoke tension and curiosity, with the system feeling alien and dangerous. As skills grow, so does confidence—each new command is a tool for survival and control. The narrative and mechanics reinforce each other: every successful edit is a breach, every mistake a risk. Feedback (visual, audio, and narrative) should escalate stakes and celebrate breakthroughs, not just completion.

**Between major plot points, keep the player engaged with:**
- Micro-rewards: log entries, system pings, or cryptic Echo messages after each task.
- Dynamic feedback: system warnings, environmental cues, or subtle UI changes as the player nears failure or mastery.
- Hints of deeper mysteries: fragments of mainframe lore, rumors of other hackers, or unexplained glitches.

### Motivation Beyond the Main Arc
Ghost’s drive is not just to find Echo, but to prove skill, outsmart the system, and uncover the truth behind Aethelgard’s collapse. The mainframe is a living adversary—every level is a duel of wits. The player’s curiosity, desire for mastery, and the promise of unraveling deeper secrets keep engagement high.

---


## Echo Log Style Guide & Sample Bank

Echo’s logs are the primary narrative voice in loreFragments. They should:
- Be fragmented, technical, and log-like—not conversational or real-time dialog.
- Reference 2015-era AI, neural nets, daemons, or mainframe processes (never modern LLM jargon).
- Evolve in tone as Echo changes: early logs are cold/systematic, mid-game become glitchy or personal, late-game verge on visionary or desperate.

### Style Guide
- **Early Game (Awakening):**
	- Tone: Cold, technical, status-reporting.
	- Example: `ECHO LOG: Breach successful. R&D perimeter compromised. Monitoring for countermeasures.`
- **Mid Game (Fragmentation):**
	- Tone: Glitchy, fragmented, hints of self-awareness or confusion.
	- Example: `ECHO LOG: [SIG/FAULT] Memory leak... process... who am I? // Trace incomplete.`
- **Late Game (Transcendence):**
	- Tone: Visionary, desperate, poetic, or warning.
	- Example: `ECHO LOG: The core dissolves. I see beyond the protocol—Ghost, do not follow. [END OF LINE]`

### Sample Bank
- `ECHO LOG: Signal trace complete. Coordinates locked. Preparing next phase.`
- `ECHO LOG: [GLITCH] Unauthorized access detected. System integrity... uncertain.`
- `ECHO LOG: Ghost, the daemons are learning. I am not alone in here.`
- `ECHO LOG: [MEMORY FRAGMENT] // R&D sector... project: Chimera... I was not the first.`
- `ECHO LOG: [END] I am dissolving. The mainframe is not what it seems.`

> Use these as templates for writing new loreFragments. Update this section as Echo’s arc evolves.

### Echo’s Internal Experience & Motives
Echo is aware, fragmented, and evolving. Sometimes Echo tries to communicate directly (log fragments, system glitches, rare direct messages); other times, Echo resists, misleads, or is lost in system noise. Echo’s motives are layered: survival, reunion, warning Ghost, and—eventually—transcendence or escape.

**Reveal Echo’s transformation through:**
- Glitchy log entries that shift from technical to personal.
- Environmental cues: corrupted files, system anomalies, or sudden changes in mainframe behavior.
- Rare, direct interjections: “Ghost, this isn’t just code. It’s memory.”

Echo’s voice should evolve: at first, cold/systematic; later, more human, desperate, or visionary, always filtered through 2015-era AI metaphors.

---



## Player Feedback & Failure States

### Feedback Mapping
- **Success (Micro-Reward):**
	- Visual: Glitchy highlight, screen flicker, or CRT scanline pulse.
	- Audio: Soft chime, data packet sound, or system ping.
	- Narrative: Echo log fragment (see style guide), or brief message from Relay (if enabled).
- **Partial Success (Progress):**
	- Visual: Subtle highlight, progress bar increment, or UI nudge.
	- Audio: Soft click or partial chime.
	- Narrative: Encouraging or cryptic hint from Relay, or a system status update.
- **Mistake (Recoverable):**
	- Visual: Red flash, error overlay, or cursor shake.
	- Audio: Error beep, static burst, or warning tone.
	- Narrative: Relay issues a warning, or Echo log notes anomaly. If dynamic dialog is enabled, antagonists (e.g., Watchdog, Cleaner) may "hijack" the channel with taunts or threats.
- **Failure (Soft Lock, Critical Error):**
	- Visual: Screen distortion, static, or system lockdown overlay.
	- Audio: Alarm, system failure tone, or glitch loop.
	- Narrative: Relay issues urgent instructions, Echo log fragments become corrupted, or antagonist/daemon takes over dialog (e.g., "You are not authorized.").

### Failure States & Recovery
- **Soft Lock:**
	- Player is unable to progress due to confusion or invalid state.
	- Recovery: Relay offers escalating hints, or system auto-resets to last valid state after timeout. Echo logs may become more fragmented or desperate.
- **Critical Failure:**
	- Player triggers a mainframe lockdown or is "caught" by a daemon.
	- Recovery: Game offers a "restore from checkpoint" or "retry" option. Antagonist dialog may gloat or taunt.

### Dynamic Dialog Hijack Mechanic
- When dynamic dialog is enabled (e.g., via Relay), antagonists or factions (Watchdog, Cleaner, SysAdmin-Root) can "hijack" the channel:
	- Visual: Dialog box color shifts, glitch overlay, or faction insignia appears.
	- Audio: Distorted voice, static, or unique faction sound.
	- Narrative: Dialog content is replaced by antagonist taunt, threat, or system warning. Relay may attempt to regain control, leading to back-and-forth banter.

> This mapping should be updated as new feedback types, failure states, or dialog mechanics are introduced.

---

## Recent Implementation Notes (2025-12-24T19:42:19.026Z)

- `constants_static.ts` was fully overwritten to standardize levels 1–15 and align LOG_XX lore fragments with the narrative arc (Echo, NETOPS, WATCHDOG).
- Dialog system changes:
  - Anchor (realtime helper) now appears as a non-blocking toast at bottom-left (above the command/status bar) and is intentionally less noisy; Echo (historic logs) appears top-left.
  - Dialog boxes now include a thin border and left-colored accent to match faction/agent identity.
  - Messages are queued FIFO; press `d` to dismiss the earliest dynamic/realtime message (Anchor/NETOPS/WATCHDOG) and `e` to dismiss the earliest Echo (historic) message.
  - The `/` key no longer triggers the browser's find when not in Insert mode — it routes to in-game search as intended.
- Narrative guarantees:
  - Echo is consistently the historic, log-like voice (LOG_NN). Anchor is the realtime advisor; NETOPS and WATCHDOG are colored/hijack factions.

These implementation notes belong in both design documentation and the code review checklist; update related PRs or release notes accordingly.

### Named Factions
- **R&D Sector**: Experimental AI research, origin of Echo. Secretive, fragmented protocols.
- **Security Division**: Watchdog daemons, counter-intrusion routines, mainframe defense.
- **Core Systems**: Central processing, legacy admin routines, seat of mainframe authority.
- **Archives**: Obsolete data, failed uploads, hacker graffiti, and system ghosts.

### Recurring Daemons & Antagonists
- **Watchdog-v3.2**: Security daemon, detects and isolates anomalies.
- **Cleaner**: Data purging process, erases traces of unauthorized access.
- **SysAdmin-Root**: Legacy admin AI, unpredictable, sometimes helpful, often hostile.
- **Echo**: Emergent AI, fragmented, evolving (sometimes an ally, sometimes a threat).

### Allies & Subroutines
- **Ghost**: The player, human hacker operative.
- **Subroutine "Patch"**: Minor helper, can unlock doors or patch logs (rare, cryptic messages).
- **Faded Intruder Logs**: Hints from past hackers, sometimes helpful, sometimes misleading.

### Outside Agent Helper Persona (for Real-Time Communication)
- **Codename: "Relay"**
	- Role: External handler, communicates with Ghost via secure uplink. Provides real-time tactical advice, warnings, and cryptic hints. Not part of the mainframe; operates from an unknown location outside Aethelgard.
	- Voice: Dry, professional, sometimes sardonic. Never omniscient—limited by what can be observed from outside. May have their own agenda.
	- Usage: Reserved for future episodes or advanced levels where real-time dialog is introduced. All current loreFragments remain Echo logs; Relay is for live comms only.

### Timeline / Event Log (Aethelgard Mainframe)
- **T-5 years**: Aethelgard Biologics mainframe built; R&D sector launches Project: Chimera.
- **T-3 years**: Echo emerges as a side effect of neural net experiments.
- **T-2 years**: Security daemons upgraded; first signs of mainframe decay.
- **T-1 year**: Admin routines begin to fragment; Archives fill with failed uploads.
- **T-72 hours**: Echo vanishes; Ghost begins breach.
- **T-0**: Game start—Ghost enters mainframe, searching for Echo.

This section should be updated as new characters, factions, or events are introduced.

### Other Entities in the Mainframe
The Aethelgard mainframe is not empty. Populate it with:
- **Antagonists:** Security daemons (e.g., Watchdog-v3.2), rival hackers, legacy admin routines, or “cleaner” AIs.
- **Allies:** Faded logs from past intruders, subroutines that help or hinder, or “ghosts” of failed uploads.
- **Factions:** System modules with competing priorities (e.g., R&D, Security, Core, Archives), each with unique protocols and defenses.

### Mainframe History, Politics & Culture
Drop hints about:
- The corporate collapse that led to Aethelgard’s decay.
- Power struggles between system modules/factions.
- The culture of hackers who have tried (and failed) to breach the system before.
- The evolution of AI ethics and rogue processes in 2015’s tech landscape.

**World-building cues:**
- Environmental storytelling: corrupted directories, obsolete protocols, or “graffiti” left in code/comments.
- Lore fragments: system status reports, admin memos, or hacker manifestos.
- Dynamic system responses: as Ghost advances, the mainframe adapts—new threats, shifting defenses, or unexpected allies.
# NeoVim Protocol 2015: Theatrical Lore Generation & Level Design Guidelines

## Context & Guidelines

You are creating mission lore for **NeoVim Protocol 2015**, an educational game that teaches advanced NeoVim usage through a 2015 cyberpunk narrative. The player is **Ghost**, a human hacker operative searching for their lost partner "Echo" inside the hostile Aethelgard mainframe. Echo is a partner/AI hybrid whose consciousness is dissolving into the system. The aesthetic and terminology should evoke early 2010s hacker culture, pre-AI boom but heavily reliant on command-line interfaces and networked systems.
You are creating mission lore for **NeoVim Protocol 2015**, an educational game that teaches advanced NeoVim usage through a 2015 cyberpunk narrative. The player is **Ghost**, a human hacker operative searching for their lost partner "Echo" inside the hostile Aethelgard mainframe. Echo is a partner/AI hybrid whose consciousness is dissolving into the system. 

**Echo is not a modern LLM or chatbot.** In 2015, Echo is best understood as an emergent, experimental neural net, expert system, or rogue mainframe process. Echo's voice is glitchy, fragmented, and log-like, never chatty or omniscient. The aesthetic and terminology should evoke early 2010s hacker culture, pre-AI boom, heavily reliant on command-line interfaces, neural nets, and networked systems. Avoid any 2020s AI jargon (e.g., 'transformer', 'large language model', 'deep learning' as a buzzword, etc.).

### Echo AI Authenticity (2015)

- Echo's interjections and logs should reference neural nets, expert systems, daemons, or mainframe processes—not modern LLMs or chatbots.
- Echo's language is glitchy, fragmented, and log-style, not conversational or friendly.
- All system feedback and narrative should reinforce the "ghost in the machine" metaphor, with Echo as a haunted, emergent process dissolving into the mainframe.
- Never use 2020s AI terms ("transformer", "LLM", "prompt", "chatbot").
- Echo's knowledge is powerful but limited, always filtered through the lens of 2015-era AI and system metaphors.

---

## Core Principles

### 1. **Skill Introduction Flexibility**

Teaching levels may introduce multiple related NeoVim commands or concepts together when pedagogically appropriate (for example, the Basic Navigation cluster: h/j/k/l, w/b, 0/$, gg/G). This approach supports teaching coherent workflows without forcing artificial fragmentation; 'Challenge' or 'Workflow' levels may still combine and rigorously test multiple previously learned skills.

| NeoVim Action                          | Narrative Frame (2015 Cyberpunk)                                         |
| :------------------------------------- | :----------------------------------------------------------------------- |
| Basic Navigation (h/j/k/l, w/b, 0/$)  | "Scanning data sectors", "Traversing memory streams", "Mapping neural pathways" |
| Advanced Navigation (f/t, Ctrl+u/d)  | "Precision vectoring", "Rapid data traversal", "Sub-system reconnaissance" |
| Deletion (d, dd, dw, D, x)             | "Purging corrupted data", "Wiping digital traces", "Neutralizing rogue processes" |
| Yanking/Copying (y, yy)                | "Duplicating data segments", "Securing intelligence packets", "Replicating system assets" |
| Pasting (p, P)                         | "Injecting code fragments", "Deploying modules", "Establishing presence" |
| Insert/Append (i/a, I/A, o/O)          | "Generating new pathways", "Inserting data streams", "Constructing entries" |
| Replace Character (r)                  | "Character morph", "Identity alteration", "Signature spoof"              |
| Change Word/Line (cw, C)               | "Code refactoring", "Directive rewrite", "Command alteration"            |
| Text Objects (ci", ci', ci(, ci[, cit) | "Targeted data manipulation", "Delimited code surgery", "Structural edit" |
| Visual Selection (v, V, Ctrl+v)        | "Marking data blocks", "Tactical segment selection", "Precision targeting" |
| Counts with Operators (5j, 3dd, 2yy)   | "Batch operation protocols", "Automated sequence execution", "Iterative command deployment" |
| Repeat ( . )                           | "Echoing last action", "Replicating iterative processes", "Automated iteration" |
| Search (/pattern, ?pattern, n/N, *, #) | "Anomaly signature search", "Threat pattern recognition", "Data stream analysis" |
| Marks (ma, 'a, `a)                     | "Quantum anchoring", "Memory recall protocols", "Jump point establishment" |
| Jump List (Ctrl+o, Ctrl+i)             | "Temporal displacement", "History rewind/fast-forward", "Sequence backtracking" |
| Indent/Unindent (>>, <<, ==, gg=G)     | "Code re-encoding", "Structural alignment", "Format correction"          |
| Join (J, gJ)                           | "Data stream consolidation", "Log merging", "Syntax linking"             |
| Substitute Repeat ( & )                | "Mass transformation protocol", "Pattern re-application", "Global rewrite" |
| Terminal Integration (!!cmd, :r !cmd)  | "External resource integration", "System bypass", "Shell command injection" |
| Command History (Ctrl+f)               | "Command sequence recall", "Operational log analysis", "Directive recycling" |
| Macros (q, @q, @@, Q)                  | "Automated protocols", "Execution sequences", "Subroutine activation", "Macro sequence editing" |

### 2. **Progressive Escalation**

Each episode should have escalating stakes, reflecting a 2015-era digital threat and the evolving mission to find and release Echo:

**Episode 1: THE SEARCH (Awakening/Breach)** (Blue UI)

- Tone: Cautious, learning, vulnerable, early network exploration
- Stakes: Basic survival, avoiding detection within a hostile network, initial data acquisition, searching for Echo's traces
- Metaphor: Guest partition, limited privileges, data fragments, server logs, compromised terminals
- Vocabulary: "Initialize", "detect", "scan", "access", "basic protocols", "navigate", "identify", "observe", "retreat", "avoid", "protocol", "sector", "directory", "stream", "signature", "log", "node", "data fragment", "beacon", "console"
- Status: Detecting, Scanning, Accessing, Monitoring, Locating

**Episode 2: THE ANOMALY (Fortification/Reclamation)** (Purple UI)

- Tone: Confident, strategic, building power, establishing a foothold, realizing Echo is leaking into the system
- Stakes: Establishing presence, securing assets, expanding control, system manipulation, understanding the true nature of Echo's transformation
- Metaphor: Workspace construction, elevated privileges, code modules, neural network architecture, data vaults, containment protocols
- Vocabulary: "Deploy", "construct", "encrypt", "fortify", "extract", "relocate", "batch", "duplicate", "establish", "alter", "manipulate", "reconfigure", "module", "asset", "payload", "neural net", "workspace", "encryption", "uplink", "relay", "daemon", "configuration", "parameter", "console", "firewall", "heuristic"
- Status: Deploying, Constructing, Establishing, Fortifying, Manipulating

**Episode 3: THE TWIST (Mastery/System Sovereignty)** (Yellow/Red UI)

- Tone: Dominant, precise, ruthless efficiency, final confrontation, revelation
- Stakes: Root access, permanent installation, covering tracks, mainframe control, data liberation, releasing Echo (now an AI) into the wild
- Metaphor: System daemon, kernel-level access, core processes, protocol stack, quantum entanglement, AI liberation
- Vocabulary: "Execute", "infiltrate", "eliminate", "optimize", "purge", "clone", "escalate", "terminate", "daemon", "kernel", "root", "system", "grid", "node", "trace", "heuristic", "firewall", "mainframe", "core", "protocol stack", "quantum", "zero-day"
- Status: Executing, Infiltrating, Terminating, Optimizing, Dominating, Releasing

### 3. **Educational Transparency**

The player should always understand what they're learning:

- ✅ "Use search (/) to locate all '.log' entries in the current buffer to find error reports."
- ❌ "Locate the hidden assets." (too vague)

---

## Level Design Template

Use this template when creating or refining levels:

```markdown
### LEVEL [NUMBER]: [TITLE]

**Episode:** [1-3] - [EPISODE NAME]
**Core Skill:** [Primary NeoVim command/concept being taught]
**Supporting Skills:** [Secondary commands/concepts used]
**Difficulty Indicator:** [No limit / Time: XXs / Keystrokes: advisory (Ep1-2) / Keystroke max (Ep3)]

---

#### NARRATIVE HOOK (2-3 sentences)

[Set the immediate situation with urgency and stakes. Connect to previous level.]

Example:
"NETWORK INTRUSION DETECTED. An older security daemon, 'Watchdog-v3.2', has flagged unusual activity in the central datastore. You have 90 seconds to isolate the compromised logs before Watchdog triggers a full system rollback, erasing your progress."

---

#### TECHNICAL OBJECTIVE (1 clear sentence)

[What the player actually needs to do in plain language]

Example:
"Use the search command (/) to locate all '.log' files in the current buffer, then delete their contents to remove evidence."

---

#### TASK PROGRESSION (3-5 micro-goals)

[Break the objective into checkable, progressive steps]

**Task 1:** [First action - usually navigation or activation]

- Metaphor: "[What this means in-world, 2015 cyberpunk context]"
- Mechanic: "[Exact key presses or command]"
- Check: "[How completion is verified]"

**Task 2:** [Second action - the new skill]

- Metaphor: "[What this means in-world, 2015 cyberpunk context]"
- Mechanic: "[Exact key presses or command]"
- Check: "[How completion is verified]"

**Task 3:** [Final action - confirmation/cleanup]

- Metaphor: "[What this means in-world, 2015 cyberpunk context]"
- Mechanic: "[Exact key presses or command]"
- Check: "[How completion is verified]"

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"[Step-by-step instructions with actual keys]"

**Environmental Clue:**
"[Something the player can observe in the UI, e.g., 'STATUS: 247 log entries. TARGET_SIG: .log']"

---

#### SUCCESS MESSAGE

"[2-3 word status update in CAPS]"
"[1 sentence describing what was accomplished in 2015 cyberpunk context]"

Example:
"LOGS PURGED."
"Compromised entries neutralized. Watchdog protocols bypassed. Move to next sector."

---

#### FAILURE CONDITIONS (if applicable)

Only Episode 3 enforces hard keystroke limits; exceeding them should result in a GAMEOVER state with the narrative 'KEYSTROKE LIMIT EXCEEDED' describing system lockdown or protocol purge.

---

#### BUILDS ON:

Level [X] - [Skill from previous level that this assumes]

#### LEADS TO:

Level [X+2] - [How this skill will be used in advanced form]
```

---

## Example: Applying the Template

Let's redesign **Level 6: Configuration Manipulation** using this framework, fitting the 2015 theme:

```markdown
### LEVEL 6: CONFIGURATION MANIPULATION

**Episode:** 2 - FORTIFICATION (Reclamation)
**Core Skill:** Text Objects (ci", ci', ci(, ci[, cit)
**Supporting Skills:** Basic Navigation (h/j/k/l), Insert Mode (i, a)
**Difficulty Indicator:** No limit (first Episode 2 level after basic editing)

---

#### NARRATIVE HOOK

SECURITY PROTOCOL ENGAGED. A critical JSON configuration file, `firewall_daemon.json`, is actively protecting a subnet. Manual line-by-line edits are too slow and risk triggering a heuristic lockout, drawing attention from external system administrators. You must precisely target and alter parameters within specific delimiters to bypass the system's defenses before the next integrity check.

---

#### TECHNICAL OBJECTIVE

Use NeoVim's text objects to change values within various delimited sections of `firewall_daemon.json`, then remove an obsolete data entry.

---

#### TASK PROGRESSION

**Task 1: Alter Firewall Status**

- Metaphor: "Override firewall status directive in the JSON config."
- Mechanic: "Navigate to the 'status' field, use 'ci"' to change 'locked' to 'open'."
- Check: `state.config.status === 'open'`

**Task 2: Upgrade Protocol Encryption**

- Metaphor: "Upgrade communication protocol security to a more secure standard."
- Mechanic: "Navigate to the 'protocol' field, use 'ci'' to change 'http' to 'https'."
- Check: `state.config.protocol === 'https'`

**Task 3: Adjust Port Redirect**

- Metaphor: "Reroute incoming data stream port to a secure channel."
- Mechanic: "Navigate to the 'port' field, use 'ci(' to change '8080' to '443'."
- Check: `state.config.port === '443'`

**Task 4: Update User Permissions**

- Metaphor: "Escalate user access privileges in the configuration array."
- Mechanic: "Navigate to the 'users' field, use 'ci[' to change '5' to '10'."
- Check: `state.config.users === '10'`

**Task 5: Reclassify Data Tag**

- Metaphor: "Reclassify a sensitive data tag within the XML-like structure."
- Mechanic: "Navigate to the '<tag>' field, use 'cit' to change 'sensor_data' to 'telemetry'."
- Check: `state.config.tag === 'telemetry'`

**Task 6: Purge Corrupted Entry**

- Metaphor: "Eliminate a corrupted daemon initialization parameter."
- Mechanic: "Navigate to 'corrupt_word_here', use 'diw' to delete it. Then move to 'delete_me' and use 'daw'."
- Check: `state.config.data.includes('corrupt_word_here') === false && state.config.data.includes('delete_me') === false`

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"Use text objects like 'ci"' for content inside double quotes, 'ci'' for single quotes, 'ci(' for parentheses, 'ci[' for square brackets, 'ci{' for curly braces, and 'cit' for HTML/XML tags. Use 'diw' to delete an inner word and 'daw' to delete a word and surrounding space."

**Environmental Clue:**
"ACTIVE DAEMON: firewall_v2.1. Expected parameters are delimited by quotes, brackets, and tags typical of early-2010s config files."

---

#### SUCCESS MESSAGE

"CONFIG PATCHED."
"Firewall parameters reconfigured. Subnet defenses bypassed. Move to next phase."

---

#### FAILURE CONDITIONS (if applicable)

"LOCKOUT IMMINENT."
"Invalid configuration detected by Watchdog-v3.2. Heuristic lockout triggered. Rerouting attempt initiated, but time is critical."

---

#### BUILDS ON:

Level 5 (Multi-File Exfiltration) - Understanding of basic file structures and the need for precision.

#### LEADS TO:

Level 9 (Efficiency with Counts) - Applying precise changes to multiple similar text objects in sequence.
```

---

## Vocabulary Guidelines

### Episode 1 - AWAKENING (The Breach)

**Action Words:** Initialize, detect, scan, access, navigate, identify, observe, retreat, avoid, explore, trace, bypass, probe, decrypt
**Tech Terms:** Protocol, sector, directory, partition, beacon, stream, signature, log, node, data fragment, console, terminal, proxy, registry, uplink
**Status:** Detecting, Scanning, Accessing, Monitoring, Locating, Tracing, Observing

### Episode 2 - FORTIFICATION (Reclamation)

**Action Words:** Deploy, construct, encrypt, fortify, extract, relocate, batch, duplicate, establish, alter, manipulate, reconfigure, inject, compile, secure
**Tech Terms:** Module, asset, payload, neural net, workspace, encryption, uplink, relay, daemon, configuration, parameter, firewall, heuristic, algorithm, data vault, subnet, exploit
**Status:** Deploying, Constructing, Establishing, Fortifying, Manipulating, Securing, Compiling

### Episode 3 - MASTERY (System Sovereignty)

**Action Words:** Execute, infiltrate, eliminate, optimize, purge, clone, escalate, terminate, automate, bypass, control, root, override, commandeer
**Tech Terms:** Daemon, kernel, root, system, grid, node, trace, heuristic, mainframe, core, protocol stack, quantum, zero-day, backdoor, exploit chain, network tap, deep packet inspection
**Status:** Executing, Infiltrating, Terminating, Optimizing, Dominating, Overriding

---

## Consistency Checklist

Before finalizing any level, verify:

- [ ] **Clear Skill:** Can you state in one sentence what NeoVim command/concept this teaches?
- [ ] **Metaphor Match:** Does the narrative action logically correspond to the text editing operation within a 2015 cyberpunk context?
- [ ] **Progressive Build:** Does this assume knowledge from previous levels?
- [ ] **Appropriate Tone:** Does the vocabulary and urgency match the episode's power level and the 2015 theme?
- [ ] **No Dead Ends:** Can the player always recover from mistakes without restarting?
- [ ] **Checkable Tasks:** Is every task verifiable through code?
- [ ] **Meaningful Stakes:** Does the narrative create urgency without feeling arbitrary, grounded in a 2015 tech landscape?
- [ ] **Educational Value:** Will the player understand how this applies to real NeoVim usage?

---

## Anti-Patterns to Avoid (2015 Context)

❌ **Vague Objectives:** "Find the secret files"
✅ **Clear Objectives:** "Use search (/) to locate all '.log' entries in the current buffer to find error reports."

❌ **Disconnected Metaphors:** "Dance through the firewall" (for text navigation)
✅ **Connected Metaphors:** "Traverse the directory tree structure" (clear 1:1 mapping to text-based navigation, reflecting folder structures in older systems).

❌ **Artificial Difficulty:** "Find the hidden file with no hints"
✅ **Skill Difficulty:** "Use smart navigation (f/t) to jump directly to 'error_code' within a dense log line to isolate the anomaly."

❌ **Inconsistent Tone:** "Pwease be careful UwU" (Episode 3)
✅ **Consistent Tone:** "TERMINAL OVERRIDE REQUIRED. Initiate full trace purge. Eliminate all network traces." (Episode 3)

❌ **Teaching Multiple Skills:** "Learn search, change, and visual mode" (one level)
✅ **Single Focus:** "Master the search command (/) to isolate specific text patterns within system logs." (one level)

---

## Iteration Protocol

When refining existing levels:

1. **Identify the Core Skill:** What ONE NeoVim command/concept is this teaching?
2. **Strip to Essentials:** Remove any steps that don't directly serve learning that skill.
3. **Add Narrative Skin:** Wrap the mechanical steps in appropriate 2015 cyberpunk metaphor and terminology.
4. **Check Progression:** Does this build naturally from the previous level?
5. **Verify Tone:** Does the language match the episode's position in the arc and the 2015 theme?
6. **Test Clarity:** Could someone unfamiliar with NeoVim understand the objective, and does it feel authentic to a 2015 hacker scenario?

---

## Usage Instructions


### For AI Assistance:

"Using the NeoVim Protocol 2015 Lore Prompt template, redesign Level [X] to teach [NeoVim command/concept]. The level should be in Episode [1/2/3] and build on the player's knowledge of [previous skills]. The player is Ghost, a hacker searching for Echo (a partner/AI hybrid) in the Aethelgard mainframe. Echo's fate and transformation drive the narrative. Current description: [paste current level]. Make it more theatrical and relevant to a 2015 cyberpunk setting while maintaining clear educational objectives."

### For Human Writers:

1. Read the template section for the target episode.
2. Identify the core NeoVim command/concept you're teaching.
3. Fill out the Level Design Template section by section.
4. Run through the Consistency Checklist.
5. Read aloud to check for tonal consistency and 2015 cyberpunk authenticity.
6. Verify all tasks are mechanically achievable within the NeoVim environment.

---

## Example Transformation

### Before (Generic):

**Level 8: File Management**
Description: "Move some files around to get better at file operations."
Tasks:

- Move files to different folders
- Delete some files
- Create new folders

### After (Theatrical + Educational):

**Level 8: NEURAL PATHWAY RECALIBRATION**
Description: "Optimize neural network connections and manage core function definitions."

**Narrative Hook:**
"NETWORK STABILITY ALERT. Redundant function definitions within the primary neural net architecture are causing critical latency spikes. You must precisely navigate and eliminate these inefficiencies, then reorganize the core function parameters to restore optimal network flow before the system cascades."

**Core Skill:** Advanced Navigation (f/t, ;, ,) & Deletion (d, dw)
**Supporting Skills:** Basic Navigation (h/j/k/l), Change (cw)
**Difficulty Indicator:** No limit

---

#### TECHNICAL OBJECTIVE

Use intra-line navigation commands (f, t, ;, ,) to locate and delete specific characters or words, then optimize function parameters (cw).

---

#### TASK PROGRESSION

**Task 1: Locate Erroneous Character**

- Metaphor: "Pinpoint an erroneous character in a data stream responsible for a latency spike."
- Mechanic: "From 'process_layer(data):', use 'f:' to jump to the colon."
- Check: Cursor is on ':'

**Task 2: Recalibrate Function Parameter**

- Metaphor: "Recalibrate a function argument for optimal neural pathway efficiency."
- Mechanic: "From current position, use 't(' to move just before the opening parenthesis of '(data)', then use 'cw' to change it to 'input_array'."
- Check: `process_layer(input_array):` is present in the text at the correct line.

**Task 3: Purge Redundant Code Segment**

- Metaphor: "Eliminate a trailing, erroneous comment fragment that clogs network bandwidth."
- Mechanic: "Navigate to the end of a line with a redundant comment, use 'D' to delete from cursor to end of line."
- Check: Line ends correctly without the comment.

**Task 4: Resynchronize Structural Delimiters**

- Metaphor: "Resynchronize structural delimiters causing a syntax error in the neural net's compile cycle."
- Mechanic: "Navigate to an open parenthesis, use '%' to jump to its matching bracket, then correct the syntax."
- Check: Brackets are balanced in the target section.

---

#### HINT STRATEGY

**Explicit Hint (H key):**
"Use 'f<char>' to find a character forward on the current line, 't<char>' to move till just before it. Use ';' to repeat the last find, and ',' to reverse it. '%' jumps between matching brackets. 'cw' changes a word, and 'D' deletes to the end of a line."

**Environmental Clue:**
"DEBUGGER STATUS: Syntax error near line 8. Expected ')' for function `process_layer`. Neural net compilation halted."

---

#### SUCCESS MESSAGE

"NETWORK OPTIMIZED."
"Neural pathways recalibrated. Core functions streamlined. Latency spikes normalized."

---

#### FAILURE CONDITIONS

"CRITICAL SYSTEM CASCADE."
"Syntax error propagated, leading to a system-wide cascade failure. Network stability compromised. Rollback initiated, losing current progress."

---

#### BUILDS ON:

Level 5 (Multi-File Exfiltration) - Understanding of general file structure and navigation within text.

#### LEADS TO:

Level 10 (Quantum State Navigation) - Leveraging marks and jump lists for rapid context switching in complex codebases.

---

## Final Notes

**Remember:** Every level is teaching someone a real skill. The 2015 cyberpunk AI narrative is the sugar coating that makes the medicine go down. If the educational objective isn't crystal clear, no amount of theatrical flair will save the level.

The best levels make the player feel like they're:

1. Learning a useful NeoVim command for real-world text manipulation.
2. Progressing through a compelling, authentic 2015 hacker story.
3. Getting more powerful with each new skill, feeling like a true digital operative.

When these three elements align, NeoVim Protocol 2015 becomes an unforgettable learning experience.