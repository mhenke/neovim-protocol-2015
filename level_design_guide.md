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
    1.  Move down and forward to `STATUS`.
    2.  Jump to the end of the line to `OFFLINE.`.
    3.  Jump to the beginning of the line.
    4.  Move back a word to `server`.
    5.  Jump to the end of the file.
    6.  Jump to the top of the file.
- **Task Types:** It uses a mix of `cursor_on` and `command_and_cursor_on` to guide the user while enforcing the use of specific keys like `$` and `G`.
- **Combined Tasks:** We ended up using a `sequence` task to combine the line navigation tasks (`$`, `0`, `b`) into a single, more complex task, which makes the level more interesting and less cluttered with too many small tasks.

## What to Look Out For

- **Avoid the "just `w`" problem:** Ensure that levels can't be completed by just using one or two simple navigation keys. The `initialText` should be designed to require a variety of movements.
- **Don't over-prescribe:** The goal is to guide, not to give a rigid set of instructions. The user should have some freedom to explore and discover the commands.
- **Keep it theatrical:** The briefings, lore, and task descriptions should be written in a "cyberpunk hacker" tone to enhance the game's atmosphere.

By following these guidelines, we can create a series of engaging and educational levels that effectively teach the fundamentals of Neovim.
