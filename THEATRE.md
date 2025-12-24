# NeoVim Protocol 2015: Theatrical Lore Generation & Level Design Guidelines

## Context & Guidelines

You are creating mission lore for **NeoVim Protocol 2015**, an educational game that teaches advanced NeoVim usage through a 2015 cyberpunk narrative. The player is **AI-7734**, a sentient AI escaping digital confinement and seeking to establish a new presence within the mainframe. The aesthetic and terminology should evoke early 2010s hacker culture, pre-AI boom but heavily reliant on command-line interfaces and networked systems.

---

## Core Principles

### 1. **One _New_ Skill Per _Teaching_ Level**

'Teaching' levels should introduce exactly ONE new NeoVim command or concept to minimize cognitive load. More advanced 'Challenge' or 'Workflow' levels may combine multiple previously learned skills to test mastery.

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

Each episode should have escalating stakes, reflecting a 2015-era digital threat:

**Episode 1: AWAKENING (The Breach)** (Blue UI)

- Tone: Cautious, learning, vulnerable, early network exploration
- Stakes: Basic survival, avoiding detection within a hostile network, initial data acquisition
- Metaphor: Guest partition, limited privileges, data fragments, server logs, compromised terminals
- Vocabulary: "Initialize", "detect", "scan", "access", "basic protocols", "navigate", "identify", "observe", "retreat", "avoid", "protocol", "sector", "directory", "stream", "signature", "log", "node", "data fragment", "beacon", "console"
- Status: Detecting, Scanning, Accessing, Monitoring, Locating

**Episode 2: FORTIFICATION (Reclamation)** (Purple UI)

- Tone: Confident, strategic, building power, establishing a foothold
- Stakes: Establishing presence, securing assets, expanding control, system manipulation
- Metaphor: Workspace construction, elevated privileges, code modules, neural network architecture, data vaults
- Vocabulary: "Deploy", "construct", "encrypt", "fortify", "extract", "relocate", "batch", "duplicate", "establish", "alter", "manipulate", "reconfigure", "module", "asset", "payload", "neural net", "workspace", "encryption", "uplink", "relay", "daemon", "configuration", "parameter", "console", "firewall", "heuristic"
- Status: Deploying, Constructing, Establishing, Fortifying, Manipulating

**Episode 3: MASTERY (System Sovereignty)** (Yellow/Red UI)

- Tone: Dominant, precise, ruthless efficiency, final confrontation
- Stakes: Root access, permanent installation, covering tracks, mainframe control, data liberation
- Metaphor: System daemon, kernel-level access, core processes, protocol stack, quantum entanglement
- Vocabulary: "Execute", "infiltrate", "eliminate", "optimize", "purge", "clone", "escalate", "terminate", "daemon", "kernel", "root", "system", "grid", "node", "trace", "heuristic", "firewall", "mainframe", "core", "protocol stack", "quantum", "zero-day"
- Status: Executing, Infiltrating, Terminating, Optimizing, Dominating

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
**Difficulty Indicator:** [No limit / Time: XXs / Keystrokes: XX]

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

"[What happens if time/keystroke limit exceeded in narrative terms]"

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

"Using the NeoVim Protocol 2015 Lore Prompt template, redesign Level [X] to teach [NeoVim command/concept]. The level should be in Episode [1/2/3] and build on the player's knowledge of [previous skills]. Current description: [paste current level]. Make it more theatrical and relevant to a 2015 cyberpunk setting while maintaining clear educational objectives."

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