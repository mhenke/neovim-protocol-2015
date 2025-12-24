# Level Design Guide

This document outlines the principles and best practices for designing levels for the Neovim Protocol: 2015 game.

## Core Philosophy

The goal of each level is to teach a new set of Neovim commands in an engaging and effective way. The levels should be designed as puzzles that guide the user to discover the intended commands, rather than just presenting them with a list of instructions.

## Level Structure

Each level is defined as an object in `constants_static.ts` with the following properties:

- `briefing`: Sets the story for the level and provides a clear objective for the user.
- `initialText`: The starting content of the file for the level. This is a critical part of the level design and must be carefully crafted to support the tasks.
- `targetText`: The expected final state of the file. This is used for validation of editing tasks.
- `loreReveal`: A narrative reward for completing the level. This should be a satisfying piece of the story. All `loreFragment` fields must be written as Echo's logs—fragmented, technical, and never as real-time dialog or generic mission logs. Echo cannot communicate live until a future episode; all narrative feedback is post-action, in Echo's glitchy, 2015-era AI voice.
- `hints`: An array of strings that provide guidance to the user. This should include the new keys for the level.
- `tasks`: An array of task objects that the user needs to complete.

## Task Design

- **Number of Tasks:** Keep the number of tasks between 3-5 per level to avoid overwhelming the user.
- **Coverage of Keybindings (NEW EMPHASIS):** For each level, the `tasks` should explicitly require or strongly encourage the use of *most* of the `newKeys` defined for that level. Every new keybinding introduced in the `hints` should ideally have a corresponding task (or be part of a sequence task) that forces its usage. This ensures comprehensive learning and active practice of each command.
- **Task Types:** Use the following task types to create a variety of challenges:
    - `cursor_on`: For simple navigation tasks where the exact path doesn't matter.
    - `command_and_cursor_on`: To enforce the use of a specific command to reach a target. This is the preferred way to teach navigation commands.
    - `run_command`: For tasks that only require a command to be run (e.g., `:w`, `:e`).
    - `contains` / `missing`: For editing tasks, to check if a certain text is present or absent.
    - `sequence`: To combine multiple related actions into a single, more fluid task. This is useful for teaching a sequence of commands that naturally flow together.
- **Flexibility:** The `command` and `value` properties of a task can be an array of strings to allow for multiple ways to complete a task.
- **Clarity:** The task description should be clear and concise, guiding the user on what to do.
- **Narrative:** Each task should have a `loreFragment` to provide a drip-feed of story and keep the user engaged.

## Level 1 Example Analysis (Navigation Fundamentals)

Our work on Level 1 provides a good example of these principles in action:

- **Initial State:** The file starts with a few blank lines, so the user's cursor is not on any keyword at the beginning. This prevents tasks from being completed accidentally.
- **Task Flow:** The tasks are designed to create a natural flow of navigation, covering all fundamental movement commands:
    1.  Move right (`l`)
    2.  Move left (`h`)
    3.  Move down (`j`)
    4.  Move up (`k`)
    5.  Move to next word (`w`)
    6.  Move back a word (`b`)
    7.  Move to start of line (`0`)
    8.  Move to end of line (`$`)
    9.  Jump to bottom of file (`G`)
    10. Jump to top of file (`gg`)
- **Task Types:** It uses `command_and_cursor_on` to directly enforce the use of specific navigation keys.

## Level 2 Example Analysis (Insert and Basic Edit)

Level 2 focuses on fundamental text insertion and basic in-line editing.

- **New Keys:** `i`, `a`, `o`, `O`, `A`, `I`, `Esc`, `x`, `r`, `cw`, `ciw`, `C`.
- **Task Design:** Tasks explicitly cover:
    - Inserting with `i` and `I`.
    - Appending with `a` and `A`.
    - Opening new lines with `o` and `O`.
    - Deleting characters with `x`.
    - Replacing characters with `r`.
    - Changing words with `cw` and `ciw`.
    - Changing to end of line with `C`.
    - `Esc` is implicitly used to exit insert mode after editing tasks.

## Level 3 Example Analysis (Line Manipulation and Advanced Edit)

Level 3 builds on basic editing by focusing on line-level manipulation, mistake recovery, and repeating actions.

- **New Keys:** `dd`, `D`, `dw`, `yy`, `p`, `P`, `u`, `Ctrl+r`, `.`.
- **Task Design:** Tasks explicitly cover:
    - Deleting lines (`dd`) and to end of line (`D`).
    - Deleting words (`dw`).
    - Yanking (`yy`) and pasting (`p`, `P`).
    - Undoing (`u`) and redoing (`Ctrl+r`).
    - Repeating the last action (`.`).

## Level 4 Example Analysis (Searching and Replacing)

Level 4 introduces efficient text search and replacement.

- **New Keys:** `/`, `?`, `n`, `N`, `*`, `#`, `:nohl`, `:s/old/new/g`, `:%s/old/new/g`.
- **Task Design:** Tasks explicitly cover:
    - Searching forward (`/`) and backward (`?`).
    - Navigating results (`n`, `N`).
    - Searching for the word under the cursor (`*`, `#`).
    - Single-line replacement (`:s`).
    - Global replacement (`:%s`).
    - Clearing search highlighting (`:nohl`).

## Level 5 Example Analysis (File Operations & Window Management)

Level 5 covers essential file and buffer management, along with basic window splitting.

- **New Keys:** `:w`, `:q`, `:wq`, `:q!`, `:e`, `:sp`, `:vsp`, `Ctrl+w h/j/k/l`, `:ls`, `:bn`, `:bp`.
- **Task Design:** Tasks explicitly cover:
    - Opening files (`:e`).
    - Saving (`:w`) and quitting (`:q`, `:wq`, `:q!`).
    - Listing buffers (`:ls`) and navigating them (`:bn`, `:bp`).
    - Creating horizontal (`:sp`) and vertical (`:vsp`) splits.
    - Navigating between splits (`Ctrl+w h/j/k/l`).

## Level 6 Example Analysis (Text Objects for Structured Editing)

Level 6 introduces text objects for precise, structured edits within delimited blocks.

- **New Keys:** `ci"`, `ci'`, `ci(`, `ci{`, `ci[`, `cit`, `diw`, `daw`.
- **Task Design:** Tasks explicitly cover changing text inside:
    - Double quotes (`ci"`).
    - Single quotes (`ci'`).
    - Parentheses (`ci(`).
    - Curly braces (`ci{`).
    - Square brackets (`ci[`).
    - HTML/XML tags (`cit`).
    - Deleting inner words (`diw`) and around words (`daw`).

## Level 7 Example Analysis (Visual Selection and Manipulation)

Level 7 focuses on visual selection modes for manipulating blocks of text.

- **New Keys:** `v`, `V`, `Ctrl+v`, `d`, `y`, `>`, `<`.
- **Task Design:** Tasks explicitly cover:
    - Character-wise visual selection and deletion (`v`, `d`).
    - Line-wise visual selection and yanking (`V`, `y`).
    - Block-wise visual selection and indenting/unindenting (`Ctrl+v`, `>`, `<`).

## Level 8 Example Analysis (Precision Line Navigation)

Level 8 enhances intra-line navigation and bracket matching.

- **New Keys:** `f`, `t`, `F`, `T`, `;`, `,`, `%`.
- **Task Design:** Tasks explicitly cover:
    - Finding characters forward (`f`, `t`) and backward (`F`, `T`).
    - Repeating (`;`) and reversing (`,`) character finds.
    - Jumping to matching brackets (`%`) for syntax error identification.

## Level 9 Example Analysis (Efficiency with Counts and Repeat)

Level 9 teaches how to combine counts with movements and operations, and leverage the dot command for efficiency.

- **New Keys:** `.` `Nj` `Ndd` `Nyy` (where N is a count).
- **Task Design:** Tasks explicitly cover:
    - Moving multiple lines (`Nj`).
    - Deleting multiple lines (`Ndd`).
    - Yanking and pasting multiple lines (`Nyy`, `p`).
    - Repeating the last change (`.`).

## Level 10 Example Analysis (Scrolling, Marks, and Jump List)

Level 10 focuses on efficient navigation within larger files, marking important locations, and traversing the jump history.

- **New Keys:** `Ctrl+u`, `Ctrl+d`, `ma`, `'a`, "```a```", `Ctrl+o`, `Ctrl+i`.
- **Task Design:** Tasks explicitly cover:
    - Scrolling half-pages (`Ctrl+u`, `Ctrl+d`).
    - Setting marks (`ma`) and jumping to them (`'a`, ```a```).
    - Navigating the jump list forward and backward (`Ctrl+o`, `Ctrl+i`).

## Level 11 Example Analysis (Code Formatting and Joining)

Level 11 introduces commands for maintaining clean and correctly formatted code.

- **New Keys:** `>>`, `<<`, `==`, `gg=G`, `J`, `gJ`.
- **Task Design:** Tasks explicitly cover:
    - Indenting (`>>`) and unindenting (`<<`) lines.
    - Auto-indenting the current line (`==`) and the entire file (`gg=G`).
    - Joining lines with a space (`J`) and without a space (`gJ`).

## Level 12 Example Analysis (Repetitive Substitution with '&')

Level 12 focuses on efficient repetition of search and replace commands.

- **New Keys:** `&`.
- **Task Design:** Tasks explicitly cover:
    - Performing a substitution (`:s`).
    - Repeating the last substitution using `&`.

## Level 13 Example Analysis (Terminal Integration)

Level 13 teaches how to interact with the system shell directly from Neovim.

- **New Keys:** `!!`, `:r !cmd`, `Ctrl+f`.
- **Task Design:** Tasks explicitly cover:
    - Replacing a line with command output (`!!`).
    - Inserting command output below the current line (`:r !cmd`).
    - Navigating command history in command-line mode (`Ctrl+f`).

## Level 14 Example Analysis (Macro Automation)

Level 14 focuses on automating repetitive tasks using macros.

- **New Keys:** `q`, `@q`, `@@`, `Q`.
- **Task Design:** Tasks explicitly cover:
    - Recording a macro (`q`).
    - Playing back a macro (`@q`, `@@`).
    - Entering visual command-line mode to edit macros (`Q`).

## Level 15 Example Analysis (Final Synthesis)

Level 15 is the final barrier, requiring mastery and combination of all techniques learned throughout the game.

- **New Keys:** `ALL` (synthesis level).
- **Task Design:** Tasks are complex and require the combination of multiple commands and concepts, encouraging a real-world workflow simulation.

## What to Look Out For

- **Avoid the "just `w`" problem:** Ensure that levels can't be completed by just using one or two simple navigation keys. The `initialText` should be designed to require a variety of movements.
- **Don't over-prescribe:** The goal is to guide, not to give a rigid set of instructions. The user should have some freedom to explore and discover the commands.
- **Keep it theatrical:** The briefings, lore, and task descriptions should be written in a "cyberpunk hacker" tone to enhance the game's atmosphere.

By following these guidelines, we can create a series of engaging and educational levels that effectively teach the fundamentals of Neovim.