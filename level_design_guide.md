# Level Design Guide

This document outlines the principles and best practices for designing levels for the Neovim Protocol: 2015 game.

## Core Philosophy

The goal of each level is to teach a new set of Neovim commands in an engaging and effective way. The levels should be designed as puzzles that guide the user to discover the intended commands, rather than just presenting them with a list of instructions.

## Level Structure

Each level is defined as an object in `constants_static.ts` with the following properties:

- `briefing`: Sets the story for the level and provides a clear objective for the user.
- `initialText`: The starting content of the file for the level. This is a critical part of the level design and must be carefully crafted to support the tasks.
- `targetText`: The expected final state of the file. This is used for validation of editing tasks.
- `loreReveal`: A narrative reward for completing the level. This should be a satisfying piece of the story.
- `hints`: An array of strings that provide guidance to the user. This should include the new keys for the level.
- `tasks`: An array of task objects that the user needs to complete.

## Task Design

- **Number of Tasks:** Keep the number of tasks between 3-5 per level to avoid overwhelming the user.
- **Task Types:** Use the following task types to create a variety of challenges:
    - `cursor_on`: For simple navigation tasks where the exact path doesn't matter.
    - `command_and_cursor_on`: To enforce the use of a specific command to reach a target. This is the preferred way to teach navigation commands.
    - `run_command`: For tasks that only require a command to be run (e.g., `:w`, `:e`).
    - `contains` / `missing`: For editing tasks, to check if a certain text is present or absent.
    - `sequence`: To combine multiple related actions into a single, more fluid task. This is useful for teaching a sequence of commands that naturally flow together.
- **Flexibility:** The `command` and `value` properties of a task can be an array of strings to allow for multiple ways to complete a task.
- **Clarity:** The task description should be clear and concise, guiding the user on what to do.
- **Narrative:** Each task should have a `loreFragment` to provide a drip-feed of story and keep the user engaged.

## Level 1 Example Analysis

Our work on Level 1 provides a good example of these principles in action:

- **Initial State:** The file starts with a few blank lines, so the user's cursor is not on any keyword at the beginning. This prevents tasks from being completed accidentally.
- **Task Flow:** The tasks are designed to create a natural flow of navigation:
    1.  Move to 'STATUS'.
    2.  Move to the end of the 'STATUS' line.
    3.  Jump to '// END OF TRANSMISSION'.
    4.  Jump to the top of the file.
- **Task Types:** It uses a mix of `cursor_on` and `command_and_cursor_on` to guide the user while enforcing the use of specific keys like `$` and `G`.

## Level 2 Example Analysis

Level 2 is now a comprehensive level that teaches the core editing toolkit.

- **New Keys:** `i`, `a`, `o`, `O`, `A`, `I`, `Esc`, `x`, `r`, `cw`, `ciw`, `C`, `dd`, `D`, `yy`, `p`, `P`, `u`, `Ctrl+r`.
- **Task Design:**
    - **Insertion:** Tasks should require adding new lines of text (`o`, `O`) and inserting text at the beginning and end of lines (`I`, `A`).
    - **Editing:** Tasks should involve changing words (`cw`), replacing characters (`r`), deleting characters (`x`).
    - **Line Manipulation:** Tasks for deleting (`dd`), yanking (`yy`), and pasting (`p`, `P`) lines.
    - **Undo/Redo:** A task that requires the user to make a mistake and then correct it with `u`.
    - It uses `sequence` tasks to combine multiple editing actions for a more realistic workflow.

## Level 3 Example Analysis

- **New Keys:** `/`, `?`, `n`, `N`, `*`, `#`, `:nohl`, `:s/old/new/g`, `:%s/old/new/g`.
- **Task Design:**
    - **Search:** Tasks should require finding specific words or patterns in the text.
    - **Navigation:** Tasks should use `n` and `N` to navigate between search results.
    - **Replacement:** Tasks should use `:s` to replace text on a line, and `:%s` to replace text globally.
    - Reinforce navigation from Level 1 and editing from Level 2.

## Level 4 Example Analysis

- **New Keys:** `:w`, `:q`, `:wq`, `:q!`, `:e`, `:sp`, `:vsp`, `Ctrl+w h/j/k/l`, `:ls`, `:bn`, `:bp`.
- **Task Design:**
    - **File Operations:** Tasks for saving and quitting.
    - **Window Management:** Tasks for creating horizontal and vertical splits (`:sp`, `:vsp`) and navigating between them (`Ctrl+w h/j/k/l`).
    - **Buffer Management:** Tasks that require opening a new file (`:e`), listing buffers (`:ls`), and switching between them (`:bn`, `:bp`).
    - Reinforce editing from Level 2 and search/replace from Level 3.

## Level 13 Example Analysis (Terminal Integration)

- **New Keys:** `!!`, `:r !cmd`, `Ctrl+f`.
- **Task Design:**
    - Tasks that require executing external shell commands from within Neovim.
    - Inserting the output of a shell command directly into the buffer.
    - Navigating the command-line history.
    - Reinforce previous editing and navigation skills.

## Level 14 Example Analysis (Macro Automation)

- **New Keys:** `q`, `@q`, `@@`, `Q`.
- **Task Design:**
    - Tasks that require recording a sequence of actions into a macro.
    - Playing back a macro to automate repetitive edits.
    - Emphasize efficiency and minimizing keystrokes.
    - Reinforce all previous editing and manipulation skills.

## What to Look Out For

- **Avoid the "just `w`" problem:** Ensure that levels can't be completed by just using one or two simple navigation keys. The `initialText` should be designed to require a variety of movements.
- **Don't over-prescribe:** The goal is to guide, not to give a rigid set of instructions. The user should have some freedom to explore and discover the commands.
- **Keep it theatrical:** The briefings, lore, and task descriptions should be written in a "cyberpunk hacker" tone to enhance the game's atmosphere.

By following these guidelines, we can create a series of engaging and educational levels that effectively teach the fundamentals of Neovim.
