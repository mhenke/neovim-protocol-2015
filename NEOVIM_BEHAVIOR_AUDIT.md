# Real NeoVim Behavior Audit Guide

This document provides a framework for auditing the NeoVim Protocol 2015 curriculum and level design against actual NeoVim behavior. Use this guide to ensure that all tasks, keybindings, and navigation flows in the game accurately reflect how NeoVim operates in real-world usage.

## Audit Steps

1. **Identify the Skill or Command**
   - Clearly state the NeoVim command or motion being taught (e.g., 'w', 'b', '0', '$').

2. **Describe the Intended In-Game Task**
   - Summarize the task as presented in the curriculum (e.g., "Use 'w' to jump to 'OFFLINE.' from the start of the line").

3. **Test in Real NeoVim**
   - Open a real NeoVim session with a file that matches the in-game `initialText`.
   - Perform the task exactly as described, noting the number of keypresses and cursor behavior.
   - Record any discrepancies (e.g., number of 'w' or 'b' needed, cursor stops, edge cases).

4. **Fetch and Reference Official Documentation**
   - Use the NeoVim help system (`:help <command>`) or official documentation online to confirm expected behavior.
   - If needed, fetch additional resources or community guides for clarification.

5. **Compare and Document Findings**
   - Note any differences between the curriculum and real NeoVim behavior.
   - Suggest curriculum or level design changes to better match authentic NeoVim usage.

6. **Update Curriculum and Tasks**
   - Revise task descriptions, expected key sequences, and validation logic to reflect real NeoVim behavior.
   - Document the audit and changes for future reference.

## Example Audit Entry

**Skill:** Word Navigation ('w', 'b')

**Curriculum Task:** Use 'w' to jump to 'OFFLINE.' from the start of the 'STATUS' line.

**Real NeoVim Test:**
- Starting at the beginning of the line, it takes 7 'w' to reach 'OFFLINE.'
- To return to the start, 2 'b' are needed.

**Documentation Reference:**
- [NeoVim :help w](https://neovim.io/doc/user/motion.html#w)
- [NeoVim :help b](https://neovim.io/doc/user/motion.html#b)

**Discrepancy:**
- The curriculum expected fewer motions; real NeoVim requires more.

**Suggested Fix:**
- Update the task to match the actual number of motions or adjust the initialText to reduce unnecessary repetition.

---

**Use this guide for every new or revised level to ensure authenticity and accuracy in teaching NeoVim.**
