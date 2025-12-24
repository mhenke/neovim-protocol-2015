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

## Level 2 Example Analysis (Insert and Basic Edit)

Level 2 focuses on fundamental text insertion and basic in-line editing.

- **New Keys:** `i`, `a`, `o`, `O`, `A`, `I`, `Esc`, `x`, `r`, `cw`, `ciw`, `C`.
- **Task Design:**
    - **Insertion:** Tasks should require adding new lines of text (`o`, `O`) and inserting text at the beginning and end of lines (`I`, `A`).
    - **Basic Editing:** Tasks involve deleting characters (`x`), replacing single characters (`r`), changing words (`cw`, `ciw`), and changing to the end of a line (`C`).
    - Tasks should be structured to guide the user through different insertion points and basic text modifications.

## Level 3 Example Analysis (Line Manipulation and Advanced Edit)

Level 3 builds on basic editing by focusing on line-level manipulation, mistake recovery, and repeating actions.

- **New Keys:** `dd`, `D`, `dw`, `yy`, `p`, `P`, `u`, `Ctrl+r`, `.`.
- **Task Design:**
    - **Deletion:** Tasks for deleting lines (`dd`, `D`) and words (`dw`).
    - **Copy/Paste:** Tasks for yanking (copying) lines (`yy`) and pasting them (`p`, `P`).
    - **Undo/Redo:** Introduce a scenario where a mistake is made and needs to be undone (`u`), then potentially redone (`Ctrl+r`).
    - **Repeat:** Tasks that benefit from repeating the last action using the dot command (`.`).
    - Reinforce basic editing from Level 2 and navigation from Level 1.

## Level 4 Example Analysis (Searching and Replacing)

Level 4 introduces efficient text search and replacement.

- **New Keys:** `/`, `?`, `n`, `N`, `*`, `#`, `:nohl`, `:s/old/new/g`, `:%s/old/new/g`.
- **Task Design:**
    - **Search:** Tasks should require finding specific words or patterns (`/`, `?`).
    - **Navigation:** Tasks should use `n` and `N` to navigate between search results.
    - **Quick Search:** Use `*` and `#` to quickly search for the word under the cursor.
    - **Replacement:** Tasks should use `:s` to replace text on a single line, and `:%s` for global replacements.
    - Reinforce editing from Levels 2 and 3, and navigation from Level 1.

## Level 5 Example Analysis (File Operations & Window Management)

Level 5 covers essential file and buffer management, along with basic window splitting.

- **New Keys:** `:w`, `:q`, `:wq`, `:q!`, `:e`, `:sp`, `:vsp`, `Ctrl+w h/j/k/l`, `:ls`, `:bn`, `:bp`.
- **Task Design:**
    - **File Operations:** Tasks for saving (`:w`) and quitting (`:q`, `:wq`, `:q!`).
    - **Buffer Management:** Tasks that require opening a new file (`:e`), listing buffers (`:ls`), and switching between them (`:bn`, `:bp`).
    - **Window Splitting:** Introduce horizontal (`:sp`) and vertical (`:vsp`) splits.
    - **Window Navigation:** Tasks to navigate between splits (`Ctrl+w h/j/k/l`).
    - Reinforce editing, searching, and navigation from previous levels.

## Level 10 Example Analysis (Scrolling, Marks, and Jumps)

Level 10 focuses on efficient navigation within larger files and quick jumping to marked locations.

- **New Keys:** `Ctrl+u`, `Ctrl+d`, `ma`, `'a`, "```a```", `Ctrl+o`, `Ctrl+i`.
- **Task Design:**
    - **Scrolling:** Tasks to scroll half a page (`Ctrl+u`, `Ctrl+d`).
    - **Marks:** Setting marks (`ma`) and jumping to them (`'a`, ```a```).
    - **Jump List:** Navigating the jump list (`Ctrl+o`, `Ctrl+i`) after a series of movements.
    - Reinforce basic navigation and editing skills.

## Level 13 Example Analysis (Terminal Integration)

Level 13 teaches how to interact with the system shell directly from Neovim.

- **New Keys:** `!!`, `:r !cmd`, `Ctrl+f`.
- **Task Design:**
    - Tasks that require executing external shell commands from within Neovim (`!!`).
    - Inserting the output of a shell command directly into the buffer (`:r !cmd`).
    - Navigating the command-line history (`Ctrl+f`).
    - Reinforce previous editing and navigation skills.

## Level 14 Example Analysis (Macro Automation)

Level 14 focuses on automating repetitive tasks using macros.

- **New Keys:** `q`, `@q`, `@@`, `Q`.
- **Task Design:**
    - Tasks that require recording a sequence of actions into a macro (`q`).
    - Playing back a macro (`@q`, `@@`) to automate repetitive edits.
    - Introduce the visual command-line mode (`Q`).
    - Emphasize efficiency and minimizing keystrokes.
    - Reinforce all previous editing and manipulation skills.

## What to Look Out For

- **Avoid the "just `w`" problem:** Ensure that levels can't be completed by just using one or two simple navigation keys. The `initialText` should be designed to require a variety of movements.
- **Don't over-prescribe:** The goal is to guide, not to give a rigid set of instructions. The user should have some freedom to explore and discover the commands.
- **Keep it theatrical:** The briefings, lore, and task descriptions should be written in a "cyberpunk hacker" tone to enhance the game's atmosphere.

By following these guidelines, we can create a series of engaging and educational levels that effectively teach the fundamentals of Neovim.
