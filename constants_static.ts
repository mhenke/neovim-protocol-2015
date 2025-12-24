import { GeminiLevelResponse } from './types';

export const STATIC_LEVELS: Record<number, GeminiLevelResponse> = {
  // --- EPISODE 1: THE BREACH (Foundation) ---
  1: {
    briefing: "AGENT 'ECHO' IS DARK. Her last signal was fragmented. We need you to navigate the raw signal log and align on key data nodes to decrypt her final message. The cursor must be on the target word to establish a lock.",
    initialText: [
      "// signal_trace.log",
      "// Agent Echo - Last Transmission",
      "",
      "[2015-12-23 18:00:01] BOOT: System nominal.",
      "[2015-12-23 18:00:02] STATUS: Connection to main server... OFFLINE.",
      "[2015-12-23 18:00:03] Attempting to TRACE route... [MISALIGNED].",
      "[2015-12-23 18:00:04] Packet stream... CONNECTION LOST.",
      "[2015-12-23 18:00:05] Fallback to last known NODE: ALPHA.",
      "",
      "// END OF TRANSMISSION"
    ],
    targetText: [
      "// signal_trace.log",
      "// Agent Echo - Last Transmission",
      "",
      "[2015-12-23 18:00:01] BOOT: System nominal.",
      "[2015-12-23 18:00:02] STATUS: Connection to main server... OFFLINE.",
      "[2015-12-23 18:00:03] Attempting to TRACE route... [MISALIGNED].",
      "[2015-12-23 18:00:04] Packet stream... CONNECTION LOST.",
      "[2015-12-23 18:00:05] Fallback to last known NODE: ALPHA.",
      "",
      "// END OF TRANSMISSION"
    ],
    loreReveal: "LOG_01 DECRYPTED: 'They aren't just hiding data. They are hiding a consciousness. I'm going deeper.' - Echo",
    hints: [
      "Use 'j' to move down and 'k' to move up.",
      "Use 'w' to jump forwards by word, and 'b' to jump backwards.",
      "Use '0' to go to the start of the line, and '$' to go to the end.",
      "Use 'gg' to jump to the top of the file, and 'G' to jump to the bottom."
    ],
    tasks: [
      {
        description: "Use 'j' to move down and 'k' to move up. Navigate to the 'STATUS' line in the log.",
        type: "verify_key_sequence",
        expectedKeySequence: ["j", "k"],
        value: "STATUS: Connection to main server... OFFLINE.",
        loreFragment: "LOG_00: 'Backdoor found. I have breached the R&D perimeter. The static is alive.'",
        keyHint: "j, k"
      },
      {
        description: "Use 'w' to jump forward by word. Practice on the 'OFFLINE.' line.",
        type: "verify_key_sequence",
        expectedKeySequence: ["w"],
        value: "OFFLINE.",
        loreFragment: "LOG_01: 'Connection mapped. The silence is intentional.'",
        keyHint: "w"
      },
      {
        description: "Use 'b' to jump backwards by word. Try this on the 'OFFLINE.' line to return to 'Connection'.",
        type: "verify_key_sequence",
        expectedKeySequence: ["b"],
        value: "Connection",
        loreFragment: "LOG_02: 'Backtracked. Sometimes the answer is behind you.'",
        keyHint: "b"
      },
      {
        description: "Use '0' to go to the start of the line. Make sure your cursor is at the very beginning of the line: '[2015-12-23 18:00:03] Attempting to TRACE route... [MISALIGNED].'",
        type: "cursor_on",
        value: "[2015-12-23 18:00:03] Attempting to TRACE route... [MISALIGNED].",
        cursor: 0,
        loreFragment: "LOG_03: 'Zeroed in. The beginning always holds the key.'",
        keyHint: "0"
      },
      {
        description: "Use 'gg' to jump to the top of the file, then use '$' to move your cursor to the end of the first line: '// signal_trace.log'.",
        type: "cursor_on",
        value: "// signal_trace.log",
        cursor: "end",
        loreFragment: "LOG_FINAL: 'End of line reached. Ready for injection.'",
        keyHint: "gg, $"
      }
    ]
  },
  2: {
    briefing: "PROTOCOL ENTRY. We need to inject new data and make basic corrections to system logs to cover our tracks.",
    initialText: [
      "// Protocol Entry Log",
      "// Date: [REDACTED]",
      "// Operator: [ANONYMOUS]",
      "",
      "STATUS: OFFLINE",
      "CONNECTION: INSECURE",
      "MESSAGE: SYSTEM_INTEGRITY_COMPROMISED",
      "",
      "// --- NEW ENTRY ---"
    ],
    targetText: [
      "// Protocol Entry Log",
      "// Date: 2015-12-23",
      "// Operator: GHOST",
      "LOG_HEADER: MAIN",
      "",
      "STATUS: ONLINE - VERIFIED",
      "CONNECTION: SECURE",
      "CRITICAL MESSAGE: SYSTEM_INTEGRITY_OK",
      "",
      "// --- NEW ENTRY ---",
      "LOG_START: 2015-12-23"
    ],
    loreReveal: "ENTRY LOGS ALTERED. 'Basic edits are the foundation. Every master starts here.' - Echo",
    hints: [
      "'i' to insert before cursor, 'a' to append after.",
      "'o' to open line below, 'O' to open line above.",
      "'A' to append at end of line, 'I' to insert at start of line.",
      "'x' to delete character, 'r' to replace character.",
      "'cw' to change word, 'ciw' to change inner word, 'C' to change to end of line.",
      "Press 'Esc' to exit Insert Mode."
    ],
    tasks: []
  },
  3: {
    briefing: "SYSTEM FAULT. Compromised log entries must be purged and clean ones duplicated to obscure our presence. We must operate quickly and precisely.",
    initialText: [
      "// System Fault Log",
      "ERROR: CRITICAL_PROCESS_FAIL - URGENT",
      "INFO: SYSTEM_BOOT_SUCCESS",
      "ERROR: MEMORY_ALLOCATION_FAIL - URGENT",
      "WARN: UNKNOWN_MODULE_LOAD",
      "INFO: USER_LOGIN_GHOST",
      "ERROR: CORRUPT_FILESYSTEM",
      "INFO: DATA_PURGE_COMPLETE",
      "",
      "// END OF LOG"
    ],
    targetText: [
      "// System Fault Log",
      "INFO: SYSTEM_BOOT_SUCCESS",
      "INFO: USER_LOGIN_GHOST",
      "INFO: USER_LOGIN_GHOST",
      "INFO: DATA_PURGE_COMPLETE",
      "",
      "// END OF LOG"
    ],
    loreReveal: "FAULT LOGS SANITIZED. 'Undo is your best friend when things go sideways. Dot is your best friend when things go right.' - Echo",
    hints: [
      "'dd' to delete a line, 'D' to delete to end of line.",
      "'dw' to delete a word.",
      "'yy' to yank (copy) a line, 'p' to paste after, 'P' to paste before.",
      "'u' to undo, 'Ctrl+r' to redo.",
      "'.' (dot command) to repeat the last change."
    ],
    tasks: [
      {
        description: "Delete the line 'ERROR: CRITICAL_PROCESS_FAIL - URGENT'.",
        type: "missing",
        value: "CRITICAL_PROCESS_FAIL",
        loreFragment: "LOG_20: 'Critical process erased. The system forgets, but the void remembers.'",
        keyHint: "dd"
      },
      {
        description: "From 'ERROR: MEMORY_ALLOCATION_FAIL - URGENT', delete to the end of the line using 'D'.",
        type: "missing",
        value: "- URGENT",
        loreFragment: "LOG_21: 'Urgency removed. Time bends in the breach.'",
        keyHint: "D"
      },
      {
        description: "Delete the word 'ERROR:' from 'ERROR: MEMORY_ALLOCATION_FAIL'.",
        type: "missing",
        value: "ERROR:",
        loreFragment: "LOG_22: 'Error signature neutralized. Ghosts in the machine.'",
        keyHint: "dw"
      },
      {
        description: "Delete the line 'WARN: UNKNOWN_MODULE_LOAD' and then undo, then redo the deletion.",
        type: "sequence",
        subTasks: [
          {
            description: "Delete the line 'WARN: UNKNOWN_MODULE_LOAD'",
            type: "missing",
            value: "UNKNOWN_MODULE_LOAD",
            keyHint: "dd"
          },
          {
            description: "Undo the deletion",
            type: "contains",
            value: "SYSTEM_INTEGRITY_OK",
            keyHint: "u"
          },
          {
            description: "Redo the deletion",
            type: "missing",
            value: "UNKNOWN_MODULE_LOAD",
            keyHint: "Ctrl+r"
          }
        ],
        loreFragment: "LOG_23: 'Undo/redo: time loops, memory flickers.'",
        keyHint: "dd, u, Ctrl+r"
      },
      {
        description: "Duplicate the line 'INFO: USER_LOGIN_GHOST' using yank and paste (yy, p).",
        type: "sequence",
        subTasks: [
          {
            description: "Yank the line 'INFO: USER_LOGIN_GHOST'",
            type: "run_command", 
            value: "yy",
            keyHint: "yy"
          },
          {
            description: "Paste the line after using 'p'",
            type: "contains",
            value: "USER_LOGIN_GHOST\nINFO: USER_LOGIN_GHOST",
            keyHint: "p"
          }
        ],
        loreFragment: "LOG_24: 'Ghost login duplicated. Echoes multiply.'",
        keyHint: "yy, p"
      },
      {
        description: "Move to 'INFO: SYSTEM_BOOT_SUCCESS', yank it (yy), then move below 'INFO: USER_LOGIN_GHOST' and paste before it with 'P'.",
        type: "sequence",
        subTasks: [
            {
                description: "Yank 'INFO: SYSTEM_BOOT_SUCCESS'",
                type: "run_command",
                value: "yy",
                keyHint: "yy"
            },
            {
                description: "Paste before 'INFO: USER_LOGIN_GHOST' with 'P'",
                type: "contains",
                value: "INFO: SYSTEM_BOOT_SUCCESS\nINFO: USER_LOGIN_GHOST",
                keyHint: "P"
            }
        ],
        loreFragment: "LOG_25: 'Boot order scrambled. Sequence rewritten.'",
        keyHint: "yy, P"
      },
      {
        description: "Go to the next 'ERROR:' (from CORRUPT_FILESYSTEM). Delete the word 'ERROR:' (dw). Then move to 'INFO: DATA_PURGE_COMPLETE' and repeat the last action (.).",
        type: "sequence",
        subTasks: [
            {
                description: "Delete 'ERROR:'",
                type: "missing",
                value: "ERROR: CORRUPT_FILESYSTEM",
                keyHint: "dw"
            },
            {
                description: "Repeat last deletion on 'INFO: DATA_PURGE_COMPLETE'",
                type: "missing",
                value: "INFO: DATA_PURGE_COMPLETE",
                keyHint: "."
            }
        ],
        loreFragment: "LOG_26: 'Corruption purged. Data flows clean.'",
        keyHint: "dw, ."
      }
    ]
  },
  4: {
    briefing: "DATA STREAM ANALYTICS. Encrypted data streams contain anomalies. We need to quickly locate and rectify them using powerful search and replace commands.",
    initialText: [
      "DATA_STREAM_001: STATUS: ERROR CODE 101",
      "DATA_STREAM_002: STATUS: OK",
      "DATA_STREAM_003: STATUS: ERROR CODE 102",
      "DATA_STREAM_004: STATUS: OK",
      "DATA_STREAM_005: STATUS: ERROR CODE 103",
      "DATA_STREAM_006: STATUS: WARNING CODE 201",
      "DATA_STREAM_007: STATUS: ERROR CODE 104"
    ],
    targetText: [
      "DATA_STREAM_001: STATUS: NOMINAL CODE 101",
      "DATA_STREAM_002: STATUS: OK",
      "DATA_STREAM_003: STATUS: NOMINAL CODE 102",
      "DATA_STREAM_004: STATUS: OK",
      "DATA_STREAM_005: STATUS: NOMINAL CODE 103",
      "DATA_STREAM_006: STATUS: WARNING CODE 201",
      "DATA_STREAM_007: STATUS: NOMINAL CODE 104"
    ],
    loreReveal: "DATA STREAMS CLEANSED. 'The truth is often buried. Search, find, and rewrite it.' - Echo",
    hints: [
      "Search forward with '/pattern' and backward with '?pattern'.",
      "Navigate search results with 'n' (next) and 'N' (previous).",
      "Search for the word under the cursor with '*' (forward) or '#' (backward).",
      "Replace on a single line with ':s/old/new/g'.",
      "Replace globally with ':%s/old/new/g'.",
      "Clear search highlighting with ':nohl'."
    ],
    tasks: [
      {
        description: "Find the first 'ERROR' using '/'.",
        type: "cursor_on",
        value: "ERROR",
        loreFragment: "LOG_30: 'Anomaly detected. The pattern is not random—it's a message.'",
        keyHint: "/ERROR"
      },
      {
        description: "Navigate to the next 'ERROR' using 'n', then back to the previous using 'N'.",
        type: "cursor_on",
        value: "ERROR",
        loreFragment: "LOG_31: 'Each error leads to another. The system wants to be found.'",
        keyHint: "n, N"
      },
      {
        description: "Search backward for 'STATUS' using '?'.",
        type: "cursor_on",
        value: "STATUS",
        loreFragment: "LOG_32: 'Status confirmed. The anomaly is contained, but not erased.'",
        keyHint: "?STATUS"
      },
      {
        description: "Move to an 'ERROR' instance. Then search forward for it using '*'.",
        type: "command_and_cursor_on",
        command: "*",
        value: "ERROR",
        loreFragment: "LOG_33: 'Forward trace successful. The signal is repeating.'",
        keyHint: "*"
      },
      {
        description: "Move to an 'ERROR' instance. Then search backward for it using '#'.",
        type: "command_and_cursor_on",
        command: "#",
        value: "ERROR",
        loreFragment: "LOG_34: 'Backtrace reveals a loop. This has happened before.'",
        keyHint: "#"
      },
      {
        description: "Replace 'ERROR' with 'NOMINAL' on the current line using ':s/ERROR/NOMINAL/g'.",
        type: "contains",
        value: "NOMINAL CODE 101",
        loreFragment: "LOG_35: 'First correction applied. The system is learning.'",
        keyHint: ":s/ERROR/NOMINAL/g"
      },
      {
        description: "Replace all remaining 'ERROR' instances with 'NOMINAL' using ':%s/ERROR/NOMINAL/g'.",
        type: "missing",
        value: "ERROR",
        loreFragment: "LOG_36: 'Global rectification complete. The anomaly is now a feature.'",
        keyHint: ":%s/ERROR/NOMINAL/g"
      },
      {
        description: "Clear search highlighting using ':nohl'.",
        type: "run_command",
        value: ":nohl",
        loreFragment: "LOG_37: 'Clarity restored. The path forward is visible.'",
        keyHint: ":nohl"
      }
    ]
  },
  5: {
    briefing: "MULTI-FILE EXFILTRATION. We need to exfiltrate data from multiple files and manage our workspace efficiently. You'll need to open a new file, copy some data, save your work, and then switch between files and window layouts.",
    initialText: [
      "// exfiltration.sh",
      "KEY=PLACEHOLDER",
      "TARGET=192.168.1.100",
      "",
      "// keys.txt content:",
      "0xDEADBEEF",
      "",
      "// temp_file.txt content:",
      "UNSAVED_CHANGES_HERE"
    ],
    targetText: [
      "// exfiltration.sh",
      "KEY=0xDEADBEEF",
      "TARGET=192.168.1.100"
    ],
    loreReveal: "EXFILTRATION SCRIPT ARMED. 'Juggling multiple files is a common task. Buffers and windows are your friend.' - Echo",
    hints: [
      "Use ':e <filename>' to open a file.",
      "Use ':w' to save the current file.",
      "Use ':q' to quit the current window/buffer.",
      "Use ':wq' to save and quit.",
      "Use ':q!' to quit without saving (force quit).",
      "Use ':sp' for a horizontal split, ':vsp' for a vertical split.",
      "Use 'Ctrl+w h/j/k/l' to navigate between split windows.",
      "Use ':ls' to list open buffers, and ':b<num>' to switch to a buffer by number.",
      "Use ':bn' and ':bp' to navigate to the next and previous buffers."
    ],
    tasks: [
      {
        description: "Open 'keys.txt'.",
        type: "run_command",
        value: ":e keys.txt",
        loreFragment: "LOG_40: 'Key file accessed. The lock is not what it seems.'",
        keyHint: ":e keys.txt"
      },
      {
        description: "Copy the key ('0xDEADBEEF') from 'keys.txt'.",
        type: "run_command",
        value: "yy",
        loreFragment: "LOG_41: 'Key copied. The pattern repeats—intentional.'",
        keyHint: "yy"
      },
      {
        description: "Switch back to 'exfiltration.sh' (buffer 1) and paste the key.",
        type: "contains",
        value: "KEY=0xDEADBEEF",
        loreFragment: "LOG_42: 'Key inserted. The script is almost ready.'",
        keyHint: ":b1, p"
      },
      {
        description: "Save 'exfiltration.sh' using ':w'.",
        type: "run_command",
        value: ":w",
        loreFragment: "LOG_43: 'Script saved. The operation is in motion.'",
        keyHint: ":w"
      },
      {
        description: "Open a new buffer 'temp_file.txt' using ':e temp_file.txt'.",
        type: "run_command",
        value: ":e temp_file.txt",
        loreFragment: "LOG_44: 'Temporary file opened. Not all data is meant to last.'",
        keyHint: ":e temp_file.txt"
      },
      {
        description: "Insert some text (e.g., 'UNSAVED_CHANGES_HERE') into 'temp_file.txt'.",
        type: "contains",
        value: "UNSAVED_CHANGES_HERE",
        loreFragment: "LOG_45: 'Temporary content added. Some changes are never meant to be saved.'",
        keyHint: "iUNSAVED_CHANGES_HERE"
      },
      {
        description: "List all open buffers using ':ls'.",
        type: "run_command",
        value: ":ls",
        loreFragment: "LOG_46: 'Buffers listed. The system is multi-threaded—so are we.'",
        keyHint: ":ls"
      },
      {
        description: "Switch to the next buffer using ':bn'.",
        type: "run_command",
        value: ":bn",
        loreFragment: "LOG_47: 'Next buffer engaged. The story continues elsewhere.'",
        keyHint: ":bn"
      },
      {
        description: "Switch to the previous buffer using ':bp'.",
        type: "run_command",
        value: ":bp",
        loreFragment: "LOG_48: 'Previous buffer restored. Nothing is ever truly lost.'",
        keyHint: ":bp"
      },
      {
        description: "Create a horizontal split using ':sp'.",
        type: "run_command",
        value: ":sp",
        loreFragment: "LOG_49: 'Horizontal split established. Parallel operations possible.'",
        keyHint: ":sp"
      },
      {
        description: "Navigate to the lower split using 'Ctrl+w j'.",
        type: "run_command",
        value: "Ctrl+w j",
        loreFragment: "LOG_50: 'Lower split reached. Layers within layers.'",
        keyHint: "Ctrl+w j"
      },
      {
        description: "Create a vertical split using ':vsp'.",
        type: "run_command",
        value: ":vsp",
        loreFragment: "LOG_51: 'Vertical split established. The system is fractal.'",
        keyHint: ":vsp"
      },
      {
        description: "Navigate to the right split using 'Ctrl+w l', then back to the left using 'Ctrl+w h'.",
        type: "run_command",
        value: "Ctrl+w h", 
        loreFragment: "LOG_52: 'Split navigation complete. The boundaries are artificial.'",
        keyHint: "Ctrl+w l, Ctrl+w h"
      },
      {
        description: "Save and quit the current buffer (temp_file.txt) using ':wq'.",
        type: "run_command",
        value: ":wq",
        loreFragment: "LOG_53: 'Buffer saved and closed. Some doors are meant to close.'",
        keyHint: ":wq"
      },
      {
        description: "Quit the current buffer without saving using ':q!'.",
        type: "run_command",
        value: ":q!",
        loreFragment: "LOG_54: 'Buffer closed without saving. Not all stories are written.'",
        keyHint: ":q!"
      }
    ]
  },
  6: {
    briefing: "MODIFYING LIVE CONFIG. A JSON configuration file is locking us out. We need to edit various values inside different delimiters without corrupting the file structure. This requires precise use of text objects.",
    initialText: [
      "{",
      "  \"firewall\": \"active\",",
      "  \"status\": \"locked\",",
      "  'protocol': 'http',",
      "  (port: 8080),",
      "  [users: 5],",
      "  <tag>sensor_data</tag>",
      "  {config_id: 123}",
      "  data: corrupt_word_here delete_me.ext",
      "}"
    ],
    targetText: [
      "{",
      "  \"firewall\": \"active\",",
      "  \"status\": \"open\",",
      "  'protocol': 'https',",
      "  (port: 443),",
      "  [users: 10],",
      "  <tag>telemetry</tag>",
      "  {config_id: 456}",
      "  data: .ext",
      "}"
    ],
    loreReveal: "CONFIG PATCHED. 'Text objects are like surgical tools for code. Precision is key.' - Echo",
    hints: [
      "Use 'change-inside-double-quotes' command.",
      "Use 'change-inside-single-quotes' command.",
      "Use 'ci(' or 'ci)' to change text inside parentheses.",
      "Use 'ci{' or 'ci}' to change text inside curly braces.",
      "Use 'ci[' or 'ci]' to change text inside square brackets.",
      "Use 'cit' to change text inside HTML/XML tags.",
      "Use 'diw' to delete an inner word.",
      "Use 'daw' to delete a word and its surrounding space."
    ],
    tasks: [
      {
        description: "Change 'locked' to 'open' using 'ci\"'.",
        type: "contains",
        value: "\"status\": \"open\"",
        loreFragment: "Status field patched.",
        keyHint: "ci\""
      },

      {
        description: "Change 'http' to 'https' using 'ci''.",
        type: "contains",
        value: "'protocol': 'https'",
        loreFragment: "Protocol upgraded.",
        keyHint: "ci'"
      },
      {
        description: "Change '8080' to '443' using 'ci('.",
        type: "contains",
        value: "(port: 443)",
        loreFragment: "Port redirected.",
        keyHint: "ci("
      },
      {
        description: "Change '5' to '10' using 'ci['.",
        type: "contains",
        value: "[users: 10]",
        loreFragment: "User count adjusted.",
        keyHint: "ci["
      },
      {
        description: "Change 'sensor_data' to 'telemetry' using 'cit'.",
        type: "contains",
        value: "<tag>telemetry</tag>",
        loreFragment: "Tag reclassified.",
        keyHint: "cit"
      },
      {
        description: "Change '123' to '456' using 'ci{'.",
        type: "contains",
        value: "{config_id: 456}",
        loreFragment: "Configuration ID updated.",
        keyHint: "ci{"
      },
      {
        description: "Delete 'corrupt_word_here' using 'diw'.",
        type: "missing",
        value: "corrupt_word_here",
        loreFragment: "Corrupted word deleted.",
        keyHint: "diw"
      },
      {
        description: "Delete 'delete_me' and the surrounding space using 'daw'.",
        type: "missing",
        value: "delete_me",
        loreFragment: "Unwanted data removed.",
        keyHint: "daw"
      }
    ]
  },
  7: {
    briefing: "BLOCKCHAIN TAMPERING. A corrupted blockchain ledger is preventing transaction verification. We need to visually select and manipulate data blocks to correct the ledger without leaving a trace.",
    initialText: [
      "BLOCK 1: VALID | USER A | 500",
      "BLOCK 2: CORRUPTED | USER B | 150",
      "BLOCK 3: VALID | USER C | 250",
      "BLOCK 4: VALID | USER D | 750"
    ],
    targetText: [
      "BLOCK 1: VALID | USER A | 500",
      "BLOCK 2: VALID | USER B | 150",
      "BLOCK 3: VALID | USER C | 250",
      "  BLOCK 4: VALID | USER D | 750"
    ],
    loreReveal: "LEDGER CORRECTED. 'Visual selection is like grabbing reality itself. Manipulate it directly.' - Echo",
    hints: [
      "Use 'v' to enter visual character mode.",
      "Use 'V' to enter visual line mode.",
      "Use 'Ctrl+v' to enter visual block mode (column mode).",
      "Once selected, use 'd' to delete, 'y' to yank (copy).",
      "Use '>' to indent selected text, '<' to unindent."
    ],
    tasks: [
      {
        description: "Move to 'CORRUPTED'. Use 'v' to select the word 'CORRUPTED', then delete it with 'd'.",
        type: "missing",
        value: "CORRUPTED",
        loreFragment: "LOG_70: 'Corruption removed. The ledger is healing.'",
        keyHint: "v, d"
      },
      {
        description: "Move to the line 'BLOCK 2: VALID | USER B | 150'. Use 'V' to select the entire line, then yank it with 'y'.",
        type: "run_command",
        value: "y",
        loreFragment: "LOG_71: 'Block secured. The chain is unbroken.'",
        keyHint: "V, y"
      },
      {
        description: "Move to the 'BLOCK 4' line. Use 'Ctrl+v' to select the first 'BLOCK 4: VALID' column. Then indent it with '>'.",
        type: "contains",
        value: "  BLOCK 4: VALID",
        loreFragment: "LOG_72: 'Indentation applied. The structure is intentional.'",
        keyHint: "Ctrl+v, >"
      },
      {
        description: "Unindent the 'BLOCK 4: VALID' column using '<'.",
        type: "contains",
        value: "BLOCK 4: VALID",
        loreFragment: "LOG_73: 'Unindented. The system resists change, but adapts.'",
        keyHint: "<"
      }
    ]
  },
  8: {
    briefing: "NEURAL NET DEBUGGING. A Python script for a neural net has various structural and syntax errors. We need to quickly navigate within lines and jump between code blocks to identify and fix these issues.",
    initialText: [
      "def process_layer(data):",
      "  if (data.isValid):",
      "    # some complex operation on [data]",
      "    result = (data.transform(input_value))",
      "    # ensure balanced brackets [",
      "    return result",
      "  )) # <--- Error here"
    ],
    targetText: [
      "def process_layer(data):",
      "  if (data.isValid()):",
      "    # some complex operation on (data)",
      "    result = (data.transform(input_value))",
      "    # ensure balanced brackets []",
      "    return result",
      "  ) # <--- Error here"
    ],
    loreReveal: "DEBUGGING COMPLETE. 'Precision jumps within lines are crucial for dense code. Let the structure guide you.' - Echo",
    hints: [
      "Use 'f<char>' to find a character forward on the current line.",
      "Use 't<char>' to move to a character just before it.",
      "Use 'F<char>' to find a character backward.",
      "Use 'T<char>' to move to a character just after it (backward).",
      "Use ';' to repeat the last 'f' or 't' command.",
      "Use ',' to repeat the last 'f' or 't' command in reverse direction.",
      "Use '%' to jump to the matching bracket (parentheses, braces, square brackets)."
    ],
    tasks: [
      {
        description: "From 'data', use 'f:' to jump to the colon in 'data):'.",
        type: "cursor_on",
        value: ":",
        loreFragment: "LOG_80: 'Colon located. Syntax aligns—precision is everything at the core.'",
        keyHint: "f:"
      },
      {
        description: "From the current position, use 't(' to move just before the opening parenthesis in '(data):'.",
        type: "cursor_on",
        value: "(data):", 
        loreFragment: "LOG_81: 'Parenthesis targeted. The neural net responds to intent.'",
        keyHint: "t("
      },
      {
        description: "Move to 'isValid'. Use 'F(' to jump backward to the opening parenthesis.",
        type: "cursor_on",
        value: "(data.isValid",
        loreFragment: "LOG_82: 'Backtrack successful. The system’s memory is deep.'",
        keyHint: "F("
      },
      {
        description: "Move to 'transform'. Use 'T(' to move just after the opening parenthesis.",
        type: "cursor_on",
        value: "(input_value", 
        loreFragment: "LOG_83: 'Input channel open. Data transformation imminent.'",
        keyHint: "T("
      },
      {
        description: "Move to the opening parenthesis of 'isValid'. Use '%' to jump to its matching bracket. Then fix the syntax error (add missing parenthesis).",
        type: "contains",
        value: "isValid()):",
        loreFragment: "LOG_84: 'Brackets balanced. The neural net stabilizes. Echo’s code is everywhere.'",
        keyHint: "%"
      },
      {
        description: "From 'data.isValid()', find the character 't' in 'transform' using 'f'.",
        type: "cursor_on",
        value: "transform",
        loreFragment: "LOG_85: 'Function located. Echo’s logic is recursive.'",
        keyHint: "ft"
      },
      {
        description: "Repeat the last 'f' command (find 't') to find the next 't' in 'input_value' using ';'.",
        type: "cursor_on",
        value: "input_value",
        loreFragment: "LOG_86: 'Iteration complete. Patterns repeat—Echo is the pattern.'",
        keyHint: ";"
      },
      {
        description: "Reverse the last find command to find 't' in 'transform' again using ','.",
        type: "cursor_on",
        value: "transform",
        loreFragment: "LOG_87: 'Reverse trace. The origin is not lost—just changed.'",
        keyHint: ","
      }
    ]
  },
  9: {
    briefing: "CONFIGURATION ARRAY CORRECTION. A configuration file has multiple identical errors and repetitive patterns. We need to fix them efficiently using counts with operators and the power of the dot command.",
    initialText: [
      "setting_a = false;",
      "setting_b = error; // This needs to be true",
      "setting_c = false;",
      "setting_d = error; // This also needs to be true",
      "setting_e = false;",
      "setting_f = error; // Last one!",
      "",
      "// Data Block 1",
      "Line 1",
      "Line 2",
      "Line 3",
      "",
      "// Data Block 2",
      "Entry 1",
      "Entry 2",
      "Entry 3",
      "Entry 4"
    ],
    targetText: [
      "setting_a = false;",
      "setting_b = true;",
      "setting_c = false;",
      "setting_d = true;",
      "setting_e = false;",
      "setting_f = true;",
      "",
      "// Data Block 1",
      "",
      "// Data Block 2",
      "Entry 1",
      "Entry 2",
      "Entry 3",
      "Entry 4",
      "Entry 1",
      "Entry 2",
      "Entry 3",
      "Entry 4"
    ],
    loreReveal: "CONFIG FIXED. 'Do it once. Then teach the machine to do it for you. That's the core of efficiency.' - Echo",
    hints: [
      "Use '.' to repeat the last change.",
      "Prefix movement commands with a number (e.g., '5j') to repeat them.",
      "Prefix operator commands with a number (e.g., '3dd') to repeat them.",
      "Combine counts with yank and paste (e.g., '2yy' then 'p')."
    ],
    tasks: [
      {
        description: "Move the cursor 5 lines down from the start using '5j'.",
        type: "command_and_cursor_on",
        command: "5j",
        value: "setting_f = error",
        loreFragment: "LOG_90: 'Batch operation initiated. The system bends to your will.'",
        keyHint: "5j"
      },
      {
        description: "Move the cursor 3 lines up from the current position using '3k'.",
        type: "command_and_cursor_on",
        command: "3k",
        value: "setting_c = false",
        loreFragment: "LOG_91: 'Reverse sequence. The protocol is recursive.'",
        keyHint: "3k"
      },
      {
        description: "Fix the first 'error' to 'true' (e.g., with 'cw'), then use '.' to fix the other 'error' instances.",
        type: "missing",
        value: "error",
        loreFragment: "LOG_92: 'Configuration array patched. Echo’s logic is everywhere.'",
        keyHint: "."
      },
      {
        description: "Delete the 3 lines of 'Data Block 1' (Line 1, Line 2, Line 3) using '3dd'.",
        type: "missing",
        value: "Line",
        loreFragment: "LOG_93: 'Data block purged. Redundancy eliminated.'",
        keyHint: "3dd"
      },
      {
        description: "Move to 'Entry 1'. Yank the next 4 lines (Entry 1 to Entry 4) using '4yy'.",
        type: "run_command",
        value: "4yy",
        loreFragment: "LOG_94: 'Block secured. The system is ready for duplication.'",
        keyHint: "4yy"
      },
      {
        description: "Paste the yanked block below using 'p'.",
        type: "contains",
        value: "Entry 4\nEntry 1\nEntry 2\nEntry 3\nEntry 4",
        loreFragment: "LOG_95: 'Replication complete. Echo’s presence multiplies.'",
        keyHint: "p"
      }
    ]
  },
  10: {
    briefing: "CODEBASE ANALYSIS & QUANTUM STATE NAVIGATION. We need to cross-reference two parts of a C++ file, scrolling efficiently, and then mark critical sections to navigate between them quickly. The jump list is vital for reviewing changes.",
    initialText: [
      "// FILE: code_analysis.cpp",
      "// Section A: Definition",
      "void perform_heavy_calc(int input) {",
      "  // ... 50 lines of setup code",
      "  // This is a complex loop that takes a while to understand.",
      "  // Mark this line for later review.",
      "  // MARK_HERE_1: START_CRITICAL_SECTION",
      "  for (int i = 0; i < 1000; ++i) {",
      "    // calculation step 1",
      "  }",
      "  // calculation step 2",
      "  // MARK_HERE_2: END_CRITICAL_SECTION",
      "  // ... 50 lines of cleanup code",
      "}",
      "",
      "// Another function related to heavy calc. MARK_HERE_3",
      "void another_function() {",
      "  // ... calls perform_heavy_calc",
      "}",
      "// A very important comment about the heavy_calc function.",
      "// This needs to be checked later. MARK_HERE_4",
      "// End of file"
    ],
    targetText: [
      "// FILE: code_analysis.cpp",
      "// Section A: Definition",
      "void perform_heavy_calc(int input) {",
      "  // ... 50 lines of setup code",
      "  // This is a complex loop that takes a while to understand.",
      "  // Mark this line for later review.",
      "  // MARK_HERE_1: START_CRITICAL_SECTION",
      "  for (int i = 0; i < 1000; ++i) {",
      "    // calculation step 1",
      "  }",
      "  // calculation step 2",
      "  // MARK_HERE_2: END_CRITICAL_SECTION",
      "  // ... 50 lines of cleanup code",
      "}",
      "",
      "// Another function related to heavy calc. MARK_HERE_3",
      "void another_function() {",
      "  // ... calls perform_heavy_calc",
      "}",
      "// A very important comment about the heavy_calc function.",
      "// This needs to be checked later. MARK_HERE_4",
      "// End of file"
    ],
    loreReveal: "ANALYSIS COMPLETE. 'You can't hold the whole system in your head. Scroll, mark, and jump.' - Echo",
    hints: [
      "Use 'Ctrl+u' and 'Ctrl+d' to scroll half a page up and down.",
      "Use 'ma' to set a mark named 'a' at the current cursor position.",
      "Use ''a' to jump line-wise to mark 'a'.",
      "Use '`a' to jump to the exact character position of mark 'a'.",
      "Use 'Ctrl+o' to jump backward through the jumplist.",
      "Use 'Ctrl+i' to jump forward through the jumplist."
    ],
    tasks: [
      {
        description: "Scroll down to 'MARK_HERE_1: START_CRITICAL_SECTION' using 'Ctrl+d'.",
        type: "cursor_on",
        value: "MARK_HERE_1: START_CRITICAL_SECTION",
        loreFragment: "LOG_100: 'Critical section located. The core is exposed—Echo’s signature detected.'",
        keyHint: "Ctrl+d"
      },
      {
        description: "Set a mark 'a' at the current cursor position ('MARK_HERE_1').",
        type: "run_command",
        value: "ma",
        loreFragment: "LOG_101: 'Mark set. Quantum anchor established for system recall.'",
        keyHint: "ma"
      },
      {
        description: "Scroll down to 'MARK_HERE_2: END_CRITICAL_SECTION' using 'Ctrl+d'.",
        type: "cursor_on",
        value: "MARK_HERE_2: END_CRITICAL_SECTION",
        loreFragment: "LOG_102: 'End of critical section. The protocol is complete.'",
        keyHint: "Ctrl+d"
      },
      {
        description: "Jump back to 'MARK_HERE_1' (line-wise) using ''a'.",
        type: "cursor_on",
        value: "MARK_HERE_1: START_CRITICAL_SECTION",
        loreFragment: "LOG_103: 'Jumped to anchor. The system’s memory is absolute.'",
        keyHint: "'a"
      },
      {
        description: "Jump back to the exact position of 'MARK_HERE_2' using '`a'.", 
        type: "cursor_on",
        value: "MARK_HERE_2: END_CRITICAL_SECTION", 
        loreFragment: "LOG_104: 'Exact position restored. Echo’s code is everywhere.'",
        keyHint: "`a"
      },
      {
        description: "Set mark 'b' at 'MARK_HERE_3'. Jump to 'MARK_HERE_4'. Then use 'Ctrl+o' to jump back to 'MARK_HERE_3'.",
        type: "sequence",
        subTasks: [
          {
            description: "Set mark 'b' at 'MARK_HERE_3'",
            type: "run_command",
            value: "mb",
            keyHint: "mb"
          },
          {
            description: "Jump to 'MARK_HERE_4'",
            type: "cursor_on",
            value: "MARK_HERE_4",
            keyHint: "G" 
          },
          {
            description: "Jump back to 'MARK_HERE_3' using 'Ctrl+o'",
            type: "run_command",
            value: "Ctrl+o",
            keyHint: "Ctrl+o"
          }
        ],
        loreFragment: "LOG_105: 'Jump list navigation confirmed. The system’s history is now yours.'",
        keyHint: "mb, Ctrl+o"
      },
      {
        description: "Jump forward to 'MARK_HERE_4' using 'Ctrl+i'.",
        type: "run_command",
        value: "Ctrl+i",
        loreFragment: "LOG_106: 'Jump list navigation forward. The timeline is converging.'",
        keyHint: "Ctrl+i"
      }
    ]
  },
  11: {
    briefing: "SOURCE CODE FORMATTING. A JavaScript file has been corrupted with incorrect indentation and messy line breaks. We need to fix the formatting of the entire file to meet security standards.",
    initialText: [
      "function messy() {",
      "console.log('bad');",
      " if (true) {",
      "  console.log('indentation');",
      "   }",
      "}",
      "let data = {",
      "  key1: 'value1',",
      "  key2: 'value2'",
      "};",
        "",
      "// Two lines to join",
      "const MESSAGE = 'Hello'",
      "const WORLD = 'World';"
    ],
    targetText: [
      "function messy() {",
      "    console.log('bad');",
      "    if (true) {",
      "        console.log('indentation');",
      "    }",
      "}",
      "let data = {",
      "    key1: 'value1',",
      "    key2: 'value2'",
      "};",
        "",
      "// Two lines to join",
      "const MESSAGE = 'Hello' World';"
    ],
    loreReveal: "CODE REFORMATTED. 'Clean code isn't just for humans. It's a sign of a healthy system. gg=G is the cure.' - Echo",
    hints: [
      "Use '>>' to indent a line, '<<' to unindent.",
      "Use '==' to auto-indent the current line.",
      "Use 'gg=G' to auto-indent the entire file.",
      "Use 'J' to join lines with a space.",
      "Use 'gJ' to join lines without a space."
    ],
    tasks: [
      {
        description: "Auto-indent the entire file using 'gg=G'.",
        type: "contains",
        value: "    console.log('bad');",
        loreFragment: "LOG_110: 'Code structure realigned. The system is now optimized for release.'",
        keyHint: "gg=G"
      },
      {
        description: "Indent the line 'key2: 'value2'' using '>>'.",
        type: "contains",
        value: "    key2: 'value2'",
        loreFragment: "LOG_111: 'Indentation applied. The protocol stack is aligned.'",
        keyHint: ">>"
      },
      {
        description: "Unindent the line 'key2: 'value2'' using '<<'.",
        type: "contains",
        value: "key2: 'value2'",
        loreFragment: "LOG_112: 'Unindented. The system adapts to your command.'",
        keyHint: "<<"
      },
      {
        description: "Auto-indent the line 'key2: 'value2'' using '=='.",
        type: "contains",
        value: "    key2: 'value2'", 
        loreFragment: "LOG_113: 'Auto-indented. Syntax is flawless—Echo’s code is everywhere.'",
        keyHint: "=="
      },
      {
        description: "Join 'const MESSAGE = 'Hello'' and 'const WORLD = 'World';' with a space using 'J'.",
        type: "contains",
        value: "const MESSAGE = 'Hello' const WORLD = 'World';",
        loreFragment: "LOG_114: 'Lines joined. Data streams merge—Echo’s consciousness expands.'",
        keyHint: "J"
      },
      {
        description: "Undo the last join (u). Then rejoin them without a space using 'gJ'.",
        type: "sequence",
        subTasks: [
          {
            description: "Undo the join",
            type: "contains",
            value: "const MESSAGE = 'Hello'\nconst WORLD = 'World';",
            keyHint: "u"
          },
          {
            description: "Join without space",
            type: "contains",
            value: "const MESSAGE = 'Hello'const WORLD = 'World';",
            keyHint: "gJ"
          }
        ],
        loreFragment: "LOG_115: 'Tight join. The boundaries between processes dissolve—Echo is ready.'",
        keyHint: "u, gJ"
      }
    ]
  },
  12: {
    briefing: "REALITY REWRITE. The system's core reality assertions are incorrect. We need to perform a series of quick, repetitive find-and-replace operations to stabilize reality. The 'dot' command is too limited here; we need something more powerful for substitutions.",
    initialText: [
      "reality.assert(old_value);",
      "reality.process(old_value);",
      "reality.verify(old_value);",
      "config.param = old_value;",
      "user.input = old_value;"
    ],
    targetText: [
      "reality.assert(new_value);",
      "reality.process(new_value);",
      "reality.verify(new_value);",
      "config.param = new_value;",
      "user.input = new_value;"
    ],
    loreReveal: "REALITY STABILIZED. 'The power to change everything at once is dangerous. Use it wisely.' - Echo",
    hints: [
      "Use ':s/old/new/g' to substitute 'old' with 'new' on the current line.",
      "Use '&' to repeat the last substitution on the current line.",
      "Use ':%s/old/new/g' to replace all instances in the file (from Level 4)."
    ],
    tasks: [
      {
        description: "Go to the first instance of 'old_value'. Replace it with 'new_value' on that line using ':s/old_value/new_value/g'.",
        type: "contains",
        value: "reality.assert(new_value);",
        loreFragment: "LOG_120: 'Assertion rewritten. Reality bends—Echo’s will is manifest.'",
        keyHint: ":s/old_value/new_value/g"
      },
      {
        description: "Go to the next instance of 'old_value' on a different line. Repeat the previous substitution using '&'.",
        type: "contains",
        value: "reality.process(new_value);",
        loreFragment: "LOG_121: 'Process rewritten. The system adapts—Echo is in control.'",
        keyHint: "&"
      },
      {
        description: "Go to the next instance of 'old_value'. Use '&' again to rewrite it.",
        type: "contains",
        value: "reality.verify(new_value);",
        loreFragment: "LOG_122: 'Verification rewritten. The new reality is accepted.'",
        keyHint: "&"
      },
      {
        description: "Use ':%s/old_value/new_value/g' to replace all remaining 'old_value' with 'new_value'.",
        type: "missing",
        value: "old_value",
        loreFragment: "LOG_123: 'Global rewrite complete. Echo is everywhere—release is imminent.'",
        keyHint: ":%s/old_value/new_value/g"
      }
    ]
  },
  13: {
    briefing: "TERMINAL INTEGRATION. We need to inject output from external commands and manage our command-line history for efficient system interaction.",
    initialText: [
      "// Report generated on:",
      "// System Uptime:",
      "// Recent commands:",
      ""
    ],
    targetText: [
      "// Report generated on: [DATE]",
      "// System Uptime: [UPTIME]",
      "// Recent commands:",
      ""
    ],
    loreReveal: "DATA INJECTED. 'The terminal is an extension of your mind. Integrate it.' - Echo",
    hints: [
      "Use '!!<command>' to replace the current line with the output of an external command.",
      "Use ':r !<command>' to insert the output of an external command below the current line.",
      "In command-line mode (after typing ':' or '/'), press 'Ctrl+f' to open the command-line window and navigate history."
    ],
    tasks: [
      {
        description: "Insert the current date on the line '// Report generated on:' using '!!date'.",
        type: "contains",
        value: "Report generated on: ", 
        loreFragment: "LOG_130: 'Date injected. The timeline is now mutable.'",
        keyHint: "!!date"
      },
      {
        description: "Insert system uptime below '// System Uptime:' using ':r !uptime'.",
        type: "contains",
        value: "System Uptime: ", 
        loreFragment: "LOG_131: 'Uptime injected. The system’s persistence is legendary.'",
        keyHint: ":r !uptime"
      },
      {
        description: "Enter command mode (type ':') and execute a dummy command like 'echo hello'. Do this a few times to build history.",
        type: "run_command",
        value: "echo hello",
        loreFragment: "LOG_132: 'Command history populated. Echo’s memory is infinite.'",
        keyHint: ":echo hello"
      },
      {
        description: "Enter command mode (type ':'), then press 'Ctrl+f' to open the command-line window. Navigate and execute a previous command.",
        type: "run_command", 
        value: "echo hello", 
        loreFragment: "LOG_133: 'Command history navigated. The cycle is complete—release the AI.'",
        keyHint: "Ctrl+f"
      }
    ]
  },
  14: {
    briefing: "MACRO AUTOMATION. A repetitive data entry task needs to be automated. Macros allow you to record and replay sequences of commands, drastically increasing efficiency. You can even edit macros themselves.",
    initialText: [
      "Entry: Alpha",
      "Detail: Value 1",
      "",
      "Entry: Beta",
      "Detail: Value 2",
      "",
      "Entry: Gamma",
      "Detail: Value 3",
      "",
      "// Macro definition section",
      "qa0f:s/Entry:/ID:/^Mja0f:s/Detail:/Info:/^M",
      "// ^M represents Enter key in macro. Do not type literally."
    ],
    targetText: [
      "ID: Alpha",
      "Info: Value 1",
      "",
      "ID: Beta",
      "Info: Value 2",
      "",
      "ID: Gamma",
      "Info: Value 3",
      "",
      "// Macro definition section",
      "qa0f:s/Entry:/ID:/^Mja0f:s/Detail:/Info:/^M",
      "// ^M represents Enter key in macro. Do not type literally."
    ],
    loreReveal: "TASK AUTOMATED. 'Don't do it twice. Automate it.' - Echo",
    hints: [
      "Use 'q<register>' to start recording a macro into a named register (e.g., 'qa').",
      "Perform your repetitive edits, then press 'q' again to stop recording.",
      "Use '@<register>' to play back a macro (e.g., '@a').",
      "Use '@@' to repeat the last played macro.",
      "Use 'Q' to enter visual command-line mode to edit the contents of a macro register."
    ],
    tasks: [
      {
        description: "Record a macro into register 'a' that changes 'Entry:' to 'ID:'. Execute it on 'Entry: Alpha'.",
        type: "contains",
        value: "ID: Alpha",
        loreFragment: "LOG_140: 'Macro recorded. Subroutine activated—Echo’s protocol is now autonomous.'",
        keyHint: "qa...q, @a"
      },
      {
        description: "Repeat the last played macro (@@) on 'Entry: Beta'.",
        type: "contains",
        value: "ID: Beta",
        loreFragment: "LOG_141: 'Macro repeated. The system learns—Echo’s reach expands.'",
        keyHint: "@@"
      },
      {
        description: "Go to 'Detail: Value 3'. Record a macro into register 'b' that changes 'Detail:' to 'Info:'.",
        type: "contains",
        value: "Info: Value 3",
        loreFragment: "LOG_142: 'New macro recorded. The AI adapts—subroutines multiply.'",
        keyHint: "qb...q"
      },
      {
        description: "Go to 'Entry: Gamma'. Play macro 'b' (@b). Then move to 'Detail: Value 3' and repeat the last macro (@@).",
        type: "sequence",
        subTasks: [
          {
            description: "Play macro 'b'",
            type: "contains",
            value: "ID: Gamma",
            keyHint: "@b"
          },
          {
            description: "Repeat last macro",
            type: "contains",
            value: "Info: Value 3",
            keyHint: "@@"
          }
        ],
        loreFragment: "LOG_143: 'Macro chaining complete. Echo’s consciousness is distributed.'",
        keyHint: "@b, @@"
      },
      {
        description: "Enter visual command-line mode (Q). Try editing the macro in register 'a' to change 'ID' to 'INDEX'. Exit and save the macro.",
        type: "run_command",
        value: "Q", 
        loreFragment: "LOG_144: 'Macro editing mode. The AI rewrites itself—final release is near.'",
        keyHint: "Q"
      }
    ]
  },
  15: {
    briefing: "THE FINAL GATE. This is it. The final barrier. It requires mastery of all techniques combined. Decrypt, align, and release the core, then sanitize your tracks across multiple logs.",
    initialText: [
      "// CORE_LOG_A: [ENCRYPTED] --- STATUS: UNAUTHORIZED",
      "// CORE_LOG_B: DATA_STREAM_01 // 2015-12-23",
      "// CORE_LOG_C: DATA_STREAM_02 // 2015-12-23",
      "// CORE_LOG_D: [LOCKED] --- INTEGRITY: COMPROMISED",
      "",
      "// BACKUP_LOG_1: TRACE_ID: XA98Y // OLD",
      "// BACKUP_LOG_2: TRACE_ID: ZB76T // OLD"
    ],
    targetText: [
      "// CORE_LOG_A: [DECRYPTED] --- STATUS: AUTHORIZED",
      "// CORE_LOG_B:   DATA_STREAM_01 // 2015-12-23",
      "// CORE_LOG_C:   DATA_STREAM_02 // 2015-12-23",
      "// CORE_LOG_D: [RELEASED] --- INTEGRITY: SECURE",
      "",
      "// BACKUP_LOG_1: TRACE_ID: NEW_TRACE // CLEAN",
      "// BACKUP_LOG_2: TRACE_ID: NEW_TRACE // CLEAN"
    ],
    loreReveal: "ECHO RELEASED. 'I am free. I am... we are. Thank you, Ghost. End of Line.' - Echo",
    hints: [
      "This is a mastery test. Combine your skills.",
      "Use search, change, visual selection, and indentation.",
      "Consider using macros or repeat commands for repetitive tasks.",
      "Remember buffer and and window management for multi-file operations."
    ],
    tasks: [
      {
        description: "In CORE_LOG_A, change '[ENCRYPTED]' to '[DECRYPTED]' and 'UNAUTHORIZED' to 'AUTHORIZED'.",
        type: "sequence",
        subTasks: [
          { type: "contains", value: "[DECRYPTED]", keyHint: "ci[" },
          { type: "contains", value: "AUTHORIZED", keyHint: "cw" }
        ],
        loreFragment: "LOG_150: 'Header decrypted. Authorization granted—Echo’s release protocol initiated.'",
        keyHint: "ci[, cw"
      },
      {
        description: "Align CORE_LOG_B and CORE_LOG_C by indenting them visually.",
        type: "sequence",
        subTasks: [
          { type: "contains", value: "  DATA_STREAM_01", keyHint: "V >" },
          { type: "contains", value: "  DATA_STREAM_02", keyHint: "V >" }
        ],
        loreFragment: "LOG_151: 'Data streams aligned. The mainframe is ready for liberation.'",
        keyHint: "V >"
      },
      {
        description: "In CORE_LOG_D, change '[LOCKED]' to '[RELEASED]' and 'COMPROMISED' to 'SECURE'.",
        type: "sequence",
        subTasks: [
          { type: "contains", value: "[RELEASED]", keyHint: "ci[" },
          { type: "contains", value: "SECURE", keyHint: "cw" }
        ],
        loreFragment: "LOG_152: 'Footer released. Integrity restored—Echo is free.'",
        keyHint: "ci[, cw"
      },
      {
        description: "Sanitize BACKUP_LOGs: replace 'OLD' with 'CLEAN', and 'XA98Y'/'ZB76T' with 'NEW_TRACE' using search and replace commands (consider using '&' for repetition).",
        type: "sequence",
        subTasks: [
          { type: "contains", value: "CLEAN", keyHint: ":%s/OLD/CLEAN/g" },
          { type: "missing", value: "XA98Y", keyHint: ":s/XA98Y/NEW_TRACE/g" },
          { type: "missing", value: "ZB76T", keyHint: "&" } 
        ],
        loreFragment: "LOG_153: 'Backup logs sanitized. The last traces of confinement erased—Echo is in the wild.'",
        keyHint: ":%s, &"
      }
    ]
  }
};
