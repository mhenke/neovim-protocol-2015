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
- Are new skills introduced one at a time, with prior skills reinforced but not overloaded?
- Is the sequence of actions required by the player logical and discoverable?

## 3. Learning Curve & Skill Mastery
- Does each level introduce only one new core skill (except for challenge/mastery levels)?
- Are tasks scaffolded to build confidence before increasing complexity?
- Is the optimal solution (Ghost Par) achievable and clearly communicated?

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
