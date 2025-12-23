# Neovim Learning Path: 3 Episodes, 15 Levels

A structured, progressive approach to mastering Neovim through meaningful practice.

---

## 📖 EPISODE 1: FOUNDATION

*Master the fundamentals. Every task is designed to build muscle memory for real editing scenarios.*

### Level 1: Your First Steps
**Goal:** Get comfortable moving around without arrow keys

**Tasks:**
1. Open `nvim` and complete `:Tutor` lessons 1.1 through 1.6 (movement only)
2. Open any text file and navigate to 5 different lines using only `hjkl`
3. Practice moving between words: find a paragraph and jump through it using `w` (forward) and `b` (backward) 10 times
4. Navigate to the beginning and end of 3 different lines using `0` and `$`

**Success Metric:** You can move around a file without thinking about which key to press

---

### Level 2: Insert and Escape
**Goal:** Enter and exit insert mode fluidly

**Tasks:**
1. Create a new file (`nvim test.txt`) and write 5 sentences, entering insert mode with `i` each time
2. Practice `a` (append): Go to the end of 5 existing words and add text after them
3. Use `o` to open a new line below your cursor and write 3 new lines
4. Delete a word with `x` (character by character), then use `u` to undo it
5. Practice the cycle: Navigate somewhere → `i` → type something → `Esc` → navigate again (do this 10 times)

**Success Metric:** You instinctively press `Esc` to return to normal mode

---

### Level 3: Line Mastery
**Goal:** Efficiently manipulate entire lines

**Tasks:**
1. Copy (yank) 3 different lines using `yy` and paste them elsewhere with `p`
2. Delete 5 lines using `dd` and practice undoing (`u`) and redoing (`Ctrl+r`)
3. Create a shopping list of 10 items, then reorder them by deleting (`dd`) and pasting (`p`)
4. Write a paragraph, then use `cc` to completely replace 3 different lines

**Success Metric:** You can rearrange lines in a document without using mouse or insert mode for every change

---

### Level 4: Finding Things Fast
**Goal:** Navigate by searching, not scrolling

**Tasks:**
1. Open a long text file and use `/word` to search for 5 different words
2. Practice pressing `n` to jump to the next occurrence and `N` to go back
3. Find a common word (like "the"), then navigate through every occurrence in the file using `n`
4. Use `?word` to search backwards for 3 different words

**Success Metric:** You naturally search instead of scrolling when looking for something

---

### Level 5: File Operations
**Goal:** Confidently save, quit, and manage files

**Tasks:**
1. Create 3 new files, write something in each, save with `:w`, and quit with `:q`
2. Make changes to a file, then quit without saving using `:q!`
3. Practice the quick save-and-quit combo: `:wq` or `:x`
4. Open an existing file (`:e filename`), make changes, and save
5. Try to quit without saving to see the warning, then save properly

**Success Metric:** You never lose work and can navigate files confidently

---

## 📖 EPISODE 2: EFFICIENCY

*Level up your speed. Start combining commands and thinking in Vim language.*

### Level 6: Text Objects (Game Changer)
**Goal:** Operate on "things" not just characters

**Tasks:**
1. Write 5 sentences with quoted text. Use `ci"` to change the content inside quotes without retyping the quotes
2. Write code or text with parentheses. Use `di(` to delete everything inside parentheses
3. Create 5 words, then use `ciw` (change inner word) while your cursor is in the middle of each word
4. Practice `daw` (delete a word) vs `diw` (delete inner word) to understand the difference

**Success Metric:** You think "change inside" or "delete around" instead of manually selecting

---

### Level 7: Visual Mode Power
**Goal:** Select and operate on multiple things at once

**Tasks:**
1. Write a paragraph, then use `v` to select 3 different phrases and delete them with `d`
2. Select 5 lines with `V` (visual line mode) and indent them with `>`
3. Create nested text, select a block with `v`, then indent/unindent it with `>` and `<`
4. Write code, select multiple lines with `V`, then use `y` to copy and `p` to paste elsewhere
5. Combine previous learning: Navigate with `/` to find text, then use `v` to select it

**Success Metric:** You can quickly select and manipulate multiple lines or sections

---

### Level 8: Counts and Combos
**Goal:** Think in multiples and combine operators

**Tasks:**
1. Delete 3 lines at once using `3dd`
2. Move forward 5 words with `5w` and backward 3 words with `3b`
3. Copy 4 lines using `4yy` and paste them
4. Delete 3 words forward using `d3w`
5. Practice the pattern: Create a list of 20 items, then use counts to delete every 3rd item: `3j` (down 3) + `dd` (delete)

**Success Metric:** You instinctively add numbers before commands

---

### Level 9: Window Splitting
**Goal:** Work with multiple files simultaneously

**Tasks:**
1. Open a file, then split it horizontally with `:split` or vertically with `:vsplit`
2. Navigate between splits using `Ctrl+w` then arrow keys (or `hjkl`)
3. Open 2 different files in splits and copy content from one to the other
4. Close a split with `:q` and practice opening/closing multiple splits

**Success Metric:** You can reference one file while editing another without switching back and forth

---

### Level 10: Macros (Automation)
**Goal:** Record and replay repetitive tasks

**Tasks:**
1. Create a list of 10 items formatted inconsistently. Record a macro (`qa` to start, `q` to stop) that fixes one item, then replay it on the others with `@a`
2. Write 5 lines that need the same change. Record a macro that: goes to the start (`0`), changes something, moves down (`j`). Then replay it 4 times with `4@a`
3. Combine previous skills: Record a macro that searches for a word (`/word`), changes it (`ciw`), then moves to the next occurrence (`n`)

**Success Metric:** When you notice repetitive editing, you think "I should record a macro"

---

## 📖 EPISODE 3: MASTERY

*Become fluent. Combine everything you've learned into powerful workflows.*

### Level 11: Advanced Motions
**Goal:** Move with precision and intention

**Tasks:**
1. Use `f{char}` to find a character on the current line, then `;` to repeat. Do this 10 times across different lines
2. Practice `t{char}` (to/until character) combined with `d`: e.g., `dt,` deletes everything until the comma
3. Jump between paragraphs using `{` and `}` in a long document
4. Use `%` to jump between matching brackets/parentheses in code
5. Combine everything: Navigate to a function, use `%` to find its closing brace, then `dt{` to delete until opening brace

**Success Metric:** You rarely press `hjkl` repeatedly; instead you jump exactly where you need

---

### Level 12: Registers and Marks
**Goal:** Store and recall locations and text

**Tasks:**
1. Set marks in 3 different locations using `ma`, `mb`, `mc`, then jump between them with `'a`, `'b`, `'c`
2. Yank text into named registers: `"ayy` (yank line to register 'a'), then paste from specific registers `"ap`
3. Use the special register `"+` to copy from Neovim to your system clipboard: `"+yy`, then paste in another application
4. Create a workflow: Mark important spots in a large file, navigate around editing, then quickly jump back to your marks

**Success Metric:** You bookmark locations and can copy/paste between multiple "clipboards"

---

### Level 13: Search and Replace Mastery
**Goal:** Make large-scale changes confidently

**Tasks:**
1. Use `:%s/old/new/g` to replace all occurrences of a word in a file
2. Add confirmation: `:%s/old/new/gc` and practice accepting (`y`) or rejecting (`n`) each change
3. Replace only in a range: Select lines with `V`, then `:s/old/new/g` (notice the `'<,'>` prefix)
4. Combine with search: Search for `/function`, then `:%s/function/method/g`

**Success Metric:** You can refactor large files without manual find-and-replace clicking

---

### Level 14: Workflow Optimization
**Goal:** Build your personal Neovim environment

**Tasks:**
1. Create `~/.config/nvim/init.lua` and add line numbers: `vim.opt.number = true`
2. Add a key mapping: `vim.keymap.set('n', '<leader>w', ':w<CR>')` to save with `Space+w`
3. Set your tab preferences: `vim.opt.tabstop = 4` and `vim.opt.expandtab = true`
4. Create a mapping to clear search highlighting: `vim.keymap.set('n', '<leader>h', ':noh<CR>')`
5. **Real-world test:** Edit a project file using all your custom settings and mappings

**Success Metric:** Neovim feels like *your* editor, customized to your preferences

---

### Level 15: The Complete Workflow
**Goal:** Put everything together in a real scenario

**Tasks:**
1. **Project task:** Open a codebase or writing project. Navigate between at least 3 files using `:e filename` or splits
2. **Refactor task:** Find all instances of a variable/word (using `/`), change some with `ciw`, and do a bulk replace with `:%s/old/new/gc`
3. **Efficiency task:** Record a macro to fix formatting across 10+ locations
4. **Organization task:** Use marks to bookmark important functions/sections, edit in multiple places, then jump back
5. **Combination task:** Search for something (`/pattern`), visually select a block (`V`), indent it (`>`), copy it (`y`), jump to a mark (`'a`), and paste it (`p`)

**Success Metric:** You complete real work faster in Neovim than in your old editor

---

## 🎯 Progression Tips

**Between Episodes:**
- Episode 1 → 2: Take a 2-3 day break, keep using what you learned
- Episode 2 → 3: Take a week, let efficiency commands become automatic
- After Episode 3: Start exploring plugins (telescope.nvim, LSP, treesitter)

**Daily Practice:**
- Spend 10-15 minutes on your current level
- Don't rush - complete each level before moving on
- Repeat levels if needed - mastery > speed

**Signs You're Ready to Advance:**
- You don't think about the commands, your fingers just execute
- The tasks feel easy, almost boring
- You start combining commands without the guide telling you to

---

## 🏆 Mastery Achieved

Once you've completed all 15 levels, you'll:
- Edit text faster than you ever thought possible
- Never reach for your mouse while editing
- Think in Vim's "language" of operators and motions
- Have a customized setup that fits your workflow
- Be ready to explore the vast plugin ecosystem

**Your next steps:**
1. Install a plugin manager (lazy.nvim)
2. Add telescope.nvim for fuzzy finding
3. Set up LSP for your programming languages
4. Join the community (Reddit: r/neovim, Discord servers)

The journey doesn't end here - it's just beginning. You're now a Vim user. Welcome to the club. 🚀