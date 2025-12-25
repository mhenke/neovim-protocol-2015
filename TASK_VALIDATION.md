## 15. Recent Issue & Fix Log (Continued)
- Issue: Task required excessive 'w' motions (e.g., 13 times) to reach a target, making the experience tedious and unrealistic.
	- Fix: Updated the task to require only the minimal, natural number of 'w' motions, matching Neovim's navigation flow.
- Issue: Subsequent tasks did not follow naturally from the cursor's new position, breaking logical progression.
	- Fix: Adjusted all following tasks to start from the previous task's end position, ensuring a smooth, sequential learning experience.
## 14. Recent Issue & Fix Log (Continued)
### [2025-12-24] Standardization Requirements
- All `keyHint` fields must only show the keybinding (e.g., `w`, `l`, `gg $`), not the amount or sequence count.
- Task descriptions must not use 'Use ... to' or similar prefixes; they should state the action directly (e.g., 'Move the cursor to the ...').
- Issue: Task 2 required an exact cursor index for 'w' motion, which does not match Neovim's natural repeated word navigation.
	- Fix: Updated the task to allow repeated 'w' motions from the start of the line to reach the target word, removing strict cursor index.
- Issue: Task validation was too rigid for word motions, blocking authentic Neovim usage.
	- Fix: Adjusted validation to accept flexible, repeated motions that match real Neovim behavior and learning progression.
## 13. Recent Issue & Fix Log
- Issue: Task completed early when cursor was on the correct line but not the exact character. 
	- Fix: Added `cursorExact: true` to require precise cursor position for completion.
- Issue: Tasks allowed completion with repetitive or imprecise key usage (e.g., many 'w' presses or moving cursor by other means).
	- Fix: Optimized expectedKeySequence and cursor checks to require only the minimal, meaningful key sequence and exact target.
## 12. Key Sequence & Cursor Position Verification
- Does each task require both the correct key sequence and the correct final cursor position for completion?
- Are tasks protected against false positives (e.g., completing by moving the cursor without the intended keys)?
- Is the validation logic strict enough to ensure authentic skill demonstration, but not so rigid as to block legitimate solutions?
## 11. Clarity & Accuracy
- Are task instructions and hints unambiguous and easy to follow?
- Do expected actions and validation logic precisely match what the player is asked to do?
- Is the language free of ambiguity, ensuring players know exactly what is required for completion?
## 10. Streamlined, Non-Busywork Actions
- Are tasks designed to focus on a single, meaningful action (e.g., move to a specific character or word) rather than requiring unnecessary repetition or busywork?
- Does each task minimize steps while still teaching the intended skill?
- When possible, use precise cursor targets (e.g., "move to the 'A' in 'Agent'") to keep tasks focused and authentic.
## 9. Description Clarity & Brevity
- Are all task descriptions concise, focused, and free of unnecessary detail?
- Do they clearly communicate the required action without excessive verbosity?
## 8. Task Audit Pattern

For every task, perform an explicit audit:
- Check that the required keybindings match the actual intended player actions and the narrative context.
- Validate that the task description, expectedKeySequence, value, and keyHint are all consistent and accurate.
- If a mismatch is found (e.g., code expects 'j, k' but the real action is 'j, l'), update the task definition to reflect the true player experience.
- Document the audit and the fix, so future reviewers can trace the rationale for changes.
## 7. Integrity Check
- Do the implemented tasks match the intended design and narrative as described in documentation?
- Are the keybindings, task order, and validation logic consistent between code and design docs?
- Is there any mismatch between what the player is asked to do and what the system actually checks for?
# Tactical Intel Validation Guidelines

To ensure every level and task in NeoVim Protocol 2015 is educational, immersive, and narratively consistent, use this checklist when designing or reviewing tactical intel (tasks, micro-goals, and level flows):

## 1. Natural & Meaningful Actions
- Are all tasks framed as authentic, diegetic actions (e.g., hacking, log parsing, code injection)?
- Does each action make sense in the context of the narrative and the player's current objective?
- Are there any tasks that feel like busywork or break immersion?

## 2. Sequential & Logical Flow
- Does the order of tasks match the player's expected learning progression?
- Does each level introduce a clear set of related core skills when pedagogically appropriate, with prior skills reinforced?
- Is the sequence of actions required by the player logical and discoverable?

## 3. Learning Curve & Skill Mastery
- Does each level introduce only one new core skill (except for challenge/mastery levels)?
- Are tasks scaffolded to build confidence before increasing complexity?
- Is the optimal solution achievable and clearly communicated? (Provide an optional keystroke target for guidance; hard max limits are enforced only in Episode 3.)

## 4. Feedback & Engagement
- Are micro-rewards, narrative feedback, and system responses present after each task?
- Does the player receive clear, motivating feedback for both success and failure?
- Are hints and environmental cues available but not intrusive?

## 5. Narrative & Ludonarrative Consistency
- Do all tasks reinforce the story, world-building, and character motivations?
- Are all `loreFragment` fields written as Echo's logs (Echo's voice, not generic mission logs)?
- Echo cannot communicate in real time at this stage; all loreFragments are post-action logs. Real-time comms (e.g., a handler or unknown helper) may be introduced in future arcs.
- Are Echo’s interjections, system messages, and lore fragments used to deepen immersion?
- Is there any ludonarrative dissonance (mechanics that contradict the story)?

## 6. Open Progression & Flexibility
- Can tasks be completed in any order where appropriate, or is strict sequencing justified by the narrative?
- Are validation criteria clear, but not so rigid that they block authentic player solutions?

---

**Use this checklist as a critical review tool for every new or revised level.**
If a task fails any of these criteria, revise it for clarity, authenticity, and educational value.

---

## Recent Changes & Notes (2025-12-24T19:42:19.026Z)
- `verify_key_sequence` handling now clears short-term command history when a matching task completes to avoid accidental retriggers; make sure complex sequences nested within `sequence` tasks manage history appropriately.
- Dialog/UI behavior updates:
  - Dialog messages are queued FIFO. Playtesters can dismiss dialogs with hotkeys: `d` for dynamic/Anchor/NETOPS/WATCHDOG messages and `e` for Echo historic logs.
  - The `/` key now routes to in-game search in NORMAL mode and will not trigger browser find; update any level instructions that previously assumed browser search behavior.

Ensure tests cover these updated behaviors (history clearing, dialog dismissal, and `/` key handling) when validating tasks.

- Recent Policy Update (2025-12-24T20:36:13.362Z): Removed the 'Ghost Par' / idealKeystrokes metric from the codebase and docs; keystroke targets remain advisory for Episodes 1–2, while hard maximum keystroke limits are enforced only in Episode 3 levels. THEATRE.md was updated to allow introducing related skill clusters per teaching level instead of a strict single-new-skill rule.

---

## Example: Level 2 Tactical Intel (Protocol Injection) — 2025-12-24T22:05:01.255Z

Goal: Tighten Level 2 tactical intel to follow the Level 1 pattern: provide 3–5 concise, diegetic, and sequential micro-tasks that map directly to validation logic.

Rewritten Tactical Intel — Protocol Injection

Level context: THE BREACH — You have a fragile window to leave a persistent trace in the protocol log. Tasks are ordered narratively and must be performed in sequence.

Tasks (3–5, sequential):

1) Insert persistent bypass header
- Description: Insert the string "BYPASS_SEC_0X00: " at the start of the line containing `PROTOCOL_STATUS: DEACTIVATED` and exit Insert Mode (I, Esc).
- Type: verify_key_sequence
- Value: "BYPASS_SEC_0X00: PROTOCOL_STATUS: DEACTIVATED"
- KeyHint: I

2) Append valid token
- Description: Append " [TOKEN_VALID]" to the end of the `CONNECTION_ROUTE: UNSECURED` line and exit Insert Mode (A, Esc).
- Type: verify_key_sequence
- Value: "CONNECTION_ROUTE: UNSECURED [TOKEN_VALID]"
- KeyHint: A

3) Create a new echo ping entry
- Description: Open a new line below `// APPEND_POINT_B`, add `LOG_04_ECHO_PING_RECEIVED`, and exit Insert Mode (o, Esc).
- Type: verify_key_sequence
- Value: "LOG_04_ECHO_PING_RECEIVED"
- KeyHint: o

4) Commit changes
- Description: Save the buffer with an Ex command (:w) to commit the injected entries.
- Type: run_command
- Value: ":w"
- KeyHint: :w

Validation notes:
- Each task must be checked against the exact content (contains/missing) and, when required, cursorExact should be set to true for positional tasks.
- expectedKeySequence should list the minimal meaningful keys (operator/motion/insert characters are acceptable), but validation must allow natural repeated motions (e.g., multiple 'w' presses) rather than rigid index counts.
- Command-mode detection uses the commandPrefix/commandBuffer model; ensure run_command checks the executed command (full prefix+buffer) for equality.
- Tasks are sequential: later tasks should assume the state resulting from previous tasks unless explicitly marked as order-independent.

Keystroke guidance: advisory target ~25 keystrokes for Level 2 (informational only; not enforced).

Use this example as the canonical Level 2 tactical intel template when authoring or reviewing static and AI-generated content.
