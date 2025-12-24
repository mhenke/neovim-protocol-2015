# 🎮 The Ghost Protocol: A 13-Level Neovim Game

A comprehensive progression teaching **real, practical Neovim** through a cyberpunk hacking narrative.

---

## 📖 EPISODE 1: THE BREACH (Foundation)

### **Level 1** — `signal_trace.log`
**Story:** Decrypt network traffic by navigating the signal patterns  
**New Keys:** `h` `j` `k` `l` `w` `b` `0` `$` `gg` `G`

**Teaches:**
- Basic 4-direction movement (hjkl)
- Word jumping (w/b)
- Line boundaries (0/$)
- File boundaries (gg/G)

**Real Usage:** Navigate any file without mouse/arrows

---

### **Level 2** — `security_hub.log`
**Story:** Disable security protocols and purge compromised logs.  
**New Keys:** `i`, `a`, `o`, `O`, `A`, `I`, `Esc`, `x`, `r`, `cw`, `ciw`, `C`, `dd`, `D`, `yy`, `p`, `P`, `u`, `Ctrl+r`

**Teaches:**
- Insert mode variations (`i, a, o, O, A, I`)
- Basic editing (`x, r, cw, ciw, C`)
- Line manipulation (`dd, D, yy, p, P`)
- Undo/Redo (`u`, `Ctrl+r`)

**Real Usage:** The core editing toolkit for any file.

---

### **Level 3** — `data_stream.dat`
**Story:** Search and navigate through encrypted packet data, and replace corrupted data.
**New Keys:** `/pattern`, `?pattern`, `n`, `N`, `*`, `#`, `:nohl`, `:s/old/new/g`, `:%s/old/new/g`

**Teaches:**
- Search forward (/) and backward (?)
- Navigate results (n, N)
- Search for word under cursor (*, #)
- Replace on a line (`:s`) and globally (`:%s`)

**Real Usage:** Find and replace, a core refactoring workflow.

---

### **Level 4** — `exfiltration.sh`
**Story:** Save the backdoor script and open multiple files for data extraction  
**New Keys:** `:w`, `:q`, `:wq`, `:q!`, `:e`, `:sp`, `:vsp`, `Ctrl+w hjkl`, `:ls`, `:b<num>`

**Teaches:**
- File operations (save, quit)
- Opening files (`:e`)
- Window management (splits, navigation)
- Buffer management (`:ls`, `:b<num>`)

**Real Usage:** Managing multiple files and windows, a daily task for developers.

---

## 📖 EPISODE 2: THE TRACE (Efficiency)

### **Level 5** — `firewall_rules.json`
**Story:** Modify firewall rules without breaking JSON/code structure  
**New Keys:** `ci"`, `ci'`, `ci(`, `ci{`, `ci[`, `cit`, `diw`, `daw`

**Teaches:**
- Change inside quotes (ci")
- Change inside parens (ci()
- Change inside braces (ci{)
- Change inside tags (cit)
- **Delete inner word vs around word (diw/daw)**

**Real Usage:** Text objects for structured editing (essential for code)

---

### **Level 6** — `blockchain_ledger.dat`
**Story:** Extract and manipulate transaction blocks visually  
**New Keys:** `v`, `V`, `Ctrl+v`, `d`, `y`, `>`, `<`

**Teaches:**
- Visual character mode (v)
- Visual line mode (V)
- **Visual block mode (Ctrl+v)** - column editing!
- Delete/yank selection
- **Indent/unindent (>/< in visual)**

**Real Usage:** Multi-line editing, column operations

---

### **Level 7** — `neural_net.py`
**Story:** Fix corrupted neural network code with precision targeting  
**New Keys:** `f`, `t`, `F`, `T`, `;`, `,`, `%`

**Teaches:**
- Find char forward (f), backward (F)
- To/until char (t/T)
- Repeat find (;), reverse (,)
- **Jump to matching bracket (%)**

**Real Usage:** Intra-line navigation, bracket matching in code

---

### **Level 8** — `config_array.ini`
**Story:** Fix repeated configuration errors efficiently  
**New Keys:** `.` `5j` `3dd` `2yy` (counts with operators)

**Teaches:**
- **Repeat last change (.)**
- Counts with movement (5j = down 5)
- Counts with operators (3dd = delete 3 lines)

**Real Usage:** Efficiency multiplier, avoid repetition

---

## 📖 EPISODE 3: THE CORE (Mastery)

### **Level 9** — `code_analysis.cpp`
**Story:** Analyze and refactor C++ codebase across multiple windows  
**New Keys:** `Ctrl+w h/j/k/l`, `Ctrl+w c`, `Ctrl+u`, `Ctrl+d`

**Teaches:**
- Navigate splits (Ctrl+w + hjkl)
- Close split (Ctrl+w c)
- **Scroll half-page (Ctrl+u/d)**

**Real Usage:** Multi-file workflow, reference while coding

---

### **Level 10** — `quantum_state.sys`
**Story:** Mark quantum states and navigate between entangled positions  
**New Keys:** `ma`, `'a`, "```a```", `Ctrl+o`, `Ctrl+i`

**Teaches:**
- Set mark (ma)
- Jump to mark line ('a)
- Jump to mark exact position (`a)
- **Jump to previous position (Ctrl+o)**
- **Jump to next position (Ctrl+i)**

**Real Usage:** Bookmark locations, navigate jump history

---

### **Level 11** — `source_code.js`
**Story:** Indent and format corrupted source code  
**New Keys:** `>>`, `<<`, `==`, `gg=G`, `J`, `gJ`

**Teaches:**
- **Indent line (>>)**
- **Unindent line (<<)**
- **Auto-indent line (==)**
- **Auto-indent entire file (gg=G)**
- Join lines with space (J)
- Join lines without space (gJ)

**Real Usage:** Code formatting (critical for development)

---

### **Level 12** — `reality.sys`
**Story:** Rewrite reality itself through mass find-and-replace  
**New Keys:** `:s/old/new/g`, `:%s/old/new/g`, `:%s/old/new/gc`, `&`

**Teaches:**
- Replace on line (:s/old/new/g)
- Replace in file (:%s/old/new/g)
- Replace with confirmation (:%s/old/new/gc)
- **Repeat last substitution (&)**

**Real Usage:** Refactoring, mass edits

---

### **Level 13** — `FINAL_GATE.lock`
**Story:** The final barrier requires mastery of all techniques combined  
**New Keys:** `ALL` (synthesis level)

**Challenges:**
1. Navigate between 3 split windows
2. Search and replace across files
3. Use marks to bookmark key sections
4. Use text objects to edit structured data
5. Use visual block to edit columns
6. Indent/format code blocks
7. Use counts and dot command for efficiency
8. Jump between bracket pairs in nested structures

**Real Usage:** Complete real-world workflow simulation