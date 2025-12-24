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
    targetText: [],
    loreReveal: "LOG_01 DECRYPTED: 'They aren't just hiding data. They are hiding a consciousness. I'm going deeper.' - Echo",
    hints: [
      "Use 'j' to move down and 'k' to move up.",
      "Use 'w' to jump forwards by word, and 'b' to jump backwards.",
      "Use '0' to go to the start of the line, and '$' to go to the end.",
      "Use 'gg' to jump to the top of the file, and 'G' to jump to the bottom."
    ],
    tasks: [
      {
        description: "Move to 'STATUS'",
        type: "cursor_on",
        value: "STATUS",
        loreFragment: "LOG_00: 'Backdoor found. I have breached the R&D perimeter.'",
        keyHint: "j, w"
      },
      {
        description: "Move to the end of the 'STATUS' line.",
        type: "command_and_cursor_on",
        command: "$",
        value: "OFFLINE.",
        loreFragment: "LOG_01: 'They aren't creating an AI. They are becoming it.'",
        keyHint: "$"
      },
      {
        description: "Jump to '// END OF TRANSMISSION'",
        type: "command_and_cursor_on",
        command: "G",
        value: "// END OF TRANSMISSION",
        loreFragment: "LOG_02: 'Tracing signal origin... Coordinates locked.'",
        keyHint: "G"
      },
      {
        description: "Jump to the top of the file",
        type: "command_and_cursor_on",
        command: "gg",
        value: "// signal_trace.log",
        loreFragment: "LOG_FINAL: 'Signal Lock Established. Ready for injection. Going in.'",
        keyHint: "gg"
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
      "MESSAGE: SYSTEM_INTEGRITY_COMPROMISED"
    ],
    targetText: [
      "// Protocol Entry Log",
      "// Date: 2015-12-23",
      "// Operator: GHOST",
      "",
      "STATUS: ONLINE",
      "CONNECTION: SECURE",
      "MESSAGE: SYSTEM_INTEGRITY_OK"
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
    tasks: [
      {
        description: "Change '[REDACTED]' to '2015-12-23'.",
        type: "contains",
        value: "2015-12-23",
        loreFragment: "Date field updated.",
        keyHint: "cw"
      },
      {
        description: "Change '[ANONYMOUS]' to 'GHOST'.",
        type: "contains",
        value: "GHOST",
        loreFragment: "Operator identity established.",
        keyHint: "ciw"
      },
      {
        description: "Change 'OFFLINE' to 'ONLINE'.",
        type: "contains",
        value: "ONLINE",
        loreFragment: "System status elevated.",
        keyHint: "cw"
      },
      {
        description: "Change 'INSECURE' to 'SECURE'.",
        type: "contains",
        value: "SECURE",
        loreFragment: "Connection secured.",
        keyHint: "cw"
      },
      {
        description: "Change 'SYSTEM_INTEGRITY_COMPROMISED' to 'SYSTEM_INTEGRITY_OK'.",
        type: "contains",
        value: "SYSTEM_INTEGRITY_OK",
        loreFragment: "Integrity verified.",
        keyHint: "cw"
      }
    ]
  },
  3: {
    briefing: "SYSTEM FAULT. Compromised log entries must be purged and clean ones duplicated to obscure our presence. We must operate quickly and precisely.",
    initialText: [
      "// System Fault Log",
      "ERROR: CRITICAL_PROCESS_FAIL",
      "INFO: SYSTEM_BOOT_SUCCESS",
      "ERROR: MEMORY_ALLOCATION_FAIL",
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
        description: "Delete the line 'ERROR: CRITICAL_PROCESS_FAIL'.",
        type: "missing",
        value: "CRITICAL_PROCESS_FAIL",
        loreFragment: "Critical error purged.",
        keyHint: "dd"
      },
      {
        description: "Delete the line 'ERROR: MEMORY_ALLOCATION_FAIL'.",
        type: "missing",
        value: "MEMORY_ALLOCATION_FAIL",
        loreFragment: "Memory error purged.",
        keyHint: "dd"
      },
      {
        description: "Delete the line 'WARN: UNKNOWN_MODULE_LOAD' and then undo your deletion.",
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
            value: "UNKNOWN_MODULE_LOAD",
            keyHint: "u"
          }
        ],
        loreFragment: "Undo verified."
      },
      {
        description: "Delete the line 'WARN: UNKNOWN_MODULE_LOAD' again (this time keep it deleted).",
        type: "missing",
        value: "UNKNOWN_MODULE_LOAD",
        loreFragment: "Warning purged.",
        keyHint: "dd"
      },
      {
        description: "Delete the word 'ERROR:' from 'ERROR: CORRUPT_FILESYSTEM'.",
        type: "missing",
        value: "ERROR:",
        loreFragment: "Filesystem error neutralized.",
        keyHint: "dw"
      },
      {
        description: "Duplicate the line 'INFO: USER_LOGIN_GHOST' using yank and paste.",
        type: "sequence",
        subTasks: [
          {
            description: "Yank the line",
            type: "run_command", 
            value: "yy",
            keyHint: "yy"
          },
          {
            description: "Paste the line",
            type: "contains",
            value: "USER_LOGIN_GHOST\nINFO: USER_LOGIN_GHOST",
            keyHint: "p"
          }
        ],
        loreFragment: "Login ghosted."
      }
    ]
  },
  4: {
    briefing: "SEARCH AND DESTROY.\n\nThe system logs are filled with decoy data. We need to find the 'ERROR' entries and replace them with 'NOMINAL'.\n\nOBJECTIVE: Use search to find all instances of 'ERROR' and replace them.",
    initialText: [
      "sys.log.1: STATUS: ERROR",
      "sys.log.2: STATUS: OK",
      "sys.log.3: STATUS: ERROR",
      "sys.log.4: STATUS: OK",
    ],
    targetText: [
      "sys.log.1: STATUS: NOMINAL",
      "sys.log.2: STATUS: OK",
      "sys.log.3: STATUS: NOMINAL",
      "sys.log.4: STATUS: OK",
    ],
    loreReveal: "LOGS CLEANSED. 'They tried to hide their tracks, but a global search and replace is a powerful tool.' - Echo",
    hints: [
      "Use '/ERROR' to search for the first instance.",
      "Use 'n' to go to the next instance.",
      "Use 'cw' to change the word (from Level 2/3).",
      "Use ':%s/ERROR/NOMINAL/g' to replace all instances at once."
    ],
    tasks: [
      {
        description: "Find the first 'ERROR'",
        type: "cursor_on",
        value: "ERROR",
        loreFragment: "First error located.",
        keyHint: "/"
      },
      {
        description: "Replace all instances of 'ERROR' with 'NOMINAL'",
        type: "missing",
        value: "ERROR",
        loreFragment: "All errors neutralized.",
        keyHint: ":%s/ERROR/NOMINAL/g"
      }
    ]
  },
  5: {
    briefing: "MULTI-FILE EXFILTRATION.\n\nWe need to exfiltrate data from multiple files. You'll need to open a new file, copy some data, and then switch back to the original file to paste it.\n\nOBJECTIVE: Open 'keys.txt', yank the key, and paste it into the 'exfiltration.sh' script.",
    initialText: [
      "// exfiltration.sh",
      "KEY=PLACEHOLDER",
      "TARGET=192.168.1.100",
      "",
      "// keys.txt content:",
      "0xDEADBEEF"
    ],
    targetText: [
      "// exfiltration.sh",
      "KEY=0xDEADBEEF",
      "TARGET=192.168.1.100",
      "",
      "// keys.txt content:",
      "0xDEADBEEF"
    ],
    loreReveal: "EXFILTRATION SCRIPT ARMED. 'Juggling multiple files is a common task. Buffers are your friend.' - Echo",
    hints: [
      "Use ':e keys.txt' to open the other file.",
      "Use 'yy' to yank the key (from Level 3).",
      "Use ':b 1' to switch back to the first buffer (or ':bp').",
      "Use 'p' to paste the key (from Level 3).",
      "Use ':ls' to see all open buffers.",
    ],
    tasks: [
      {
        description: "Open 'keys.txt'",
        type: "run_command",
        value: ":e keys.txt",
        loreFragment: "Key file accessed.",
        keyHint: ":e"
      },
      {
        description: "Copy the key and paste it into the script.",
        type: "contains",
        value: "KEY=0xDEADBEEF",
        loreFragment: "Key inserted.",
        keyHint: "yy, :b 1, p"
      }
    ]
  },
  6: {
      briefing: "MODIFYING LIVE CONFIG. \n\nA JSON config is locking us out. We need to edit a value inside quotes without corrupting the file structure. \n\nOBJECTIVE: Change the 'status' field from 'locked' to 'open'.",
      initialText: [
          "{",
          "  \"firewall\": \"active\",",
          "  \"status\": \"locked\"",
          "}"
      ],
      targetText: ["  \"status\": \"open\""],
      loreReveal: "CONFIG PATCHED. 'Text objects are like surgical tools for code. Precision is key.' - Echo",
      hints: ["Use 'ci\"' to change the text inside the double quotes.", "Navigate to the word 'locked' and use 'ci\"'.", "Type 'open' and press Esc."],
      tasks: [{"description": "Change 'locked' to 'open' using 'ci\"'.", "type": "contains", "value": "open", "loreFragment": "Status field patched.", "keyHint": "ci\""}]
  },
  7: {
      briefing: "BLOCKCHAIN TAMPERING. \n\nA corrupted block in a blockchain ledger is preventing transaction verification. We need to visually select and remove it.\n\nOBJECTIVE: Use visual block mode to select and delete the 'CORRUPTED' column.",
      initialText: [
          "BLOCK 1: VALID | USER A | 500",
          "BLOCK 2: VALID | USER B | 150",
          "BLOCK 3: VALID | USER C | 250"
      ],
      targetText: [],
      loreReveal: "LEDGER CORRECTED. 'Columnar editing is a superpower. Most people don't even know it exists.' - Echo",
      hints: ["Use 'Ctrl+v' to enter visual block mode.", "Move down to select the column of 'VALID'.", "Press 'd' to delete the selection."],
      tasks: [{"description": "Delete the 'VALID' column using visual block mode.", "type": "missing", "value": "VALID", "loreFragment": "Ledger realigned.", "keyHint": "Ctrl+v"}]
  },
  8: {
      briefing: "NEURAL NET DEBUGGING. \n\nA Python script for a neural net has a syntax error due to mismatched brackets.\n\nOBJECTIVE: Jump to the matching bracket to identify the scope of the error.",
      initialText: [
          "def process_layer(data):",
          "  if (data.isValid()):",
          "    # ... many lines of code",
          "    return result",
          "  )) // <--- Error here"
      ],
      targetText: [],
      loreReveal: "BRACKET MISMATCH IDENTIFIED. 'Code is structure. `%` lets you see the bones of it.' - Echo",
      hints: ["Place your cursor on one of the parentheses.", "Press '%' to jump to its match."],
      tasks: [{"description": "Jump to the mismatched bracket.", "type": "cursor_on", "value": "))", "loreFragment": "Syntax error located.", "keyHint": "%"}]
  },
  9: {
      briefing: "CONFIGURATION ARRAY CORRECTION. \n\nA configuration file has multiple identical errors. Fixing them one by one is slow and risky.\n\nOBJECTIVE: Fix the first error, then use the dot command '.' to repeat the fix for all other instances.",
      initialText: [
          "setting_a = false;",
          "setting_b = error;",
          "setting_c = false;",
          "setting_d = error;"
      ],
      targetText: [
          "setting_a = false;",
          "setting_b = true;",
          "setting_c = false;",
          "setting_d = true;"
      ],
      loreReveal: "CONFIG FIXED. 'Do it once. Then teach the machine to do it for you. That's the core of efficiency.' - Echo",
      hints: ["On the first 'error', use 'cw' to change it to 'true', then press Esc.", "Go to the next 'error' and press '.' to repeat the change."],
      tasks: [{"description": "Fix all 'error' instances to 'true'.", "type": "missing", "value": "error", "loreFragment": "Configuration array patched.", "keyHint": "."}]
  },
  10: {
      briefing: "CODEBASE ANALYSIS & QUANTUM STATE NAVIGATION.\n\nWe need to cross-reference two parts of a C++ file, scrolling efficiently, and then mark critical sections to navigate between them quickly.\n\nOBJECTIVE: Scroll through the file, set a mark at 'ENTANGLEMENT_POINT', navigate away, and jump back.",
      initialText: [
          "// FILE: code_analysis.cpp",
          "// Section A: Definition",
          "void myFunction() {",
          "  // ... 50 lines",
          "}",
          "// ... 200 lines",
          "ENTANGLEMENT_POINT",
          "// ... 200 lines",
          "// Section B: Usage",
          "myFunction();"
      ],
      targetText: [],
      loreReveal: "ANALYSIS COMPLETE. 'You can't hold the whole system in your head. Scroll, mark, and jump.' - Echo",
      hints: [
          "Use 'Ctrl+u' and 'Ctrl+d' to scroll half a page up and down.",
          "On the 'ENTANGLEMENT_POINT' line, press 'ma' to set a mark named 'a'.",
          "Move away a few lines, then press ''a' to jump back to the mark."
      ],
      tasks: [
          {
              description: "Scroll down the file using 'Ctrl+d' to find 'ENTANGLEMENT_POINT'.",
              type: "cursor_on",
              value: "ENTANGLEMENT_POINT",
              loreFragment: "Scrolled to entanglement point.",
              keyHint: "Ctrl+d"
          },
          {
              description: "Set a mark 'a' at 'ENTANGLEMENT_POINT', move away, and jump back.",
              type: "cursor_on",
              value: "ENTANGLEMENT_POINT",
              loreFragment: "Quantum link established.",
              keyHint: "ma, jjj, 'a"
          }
      ]
  },
  11: {
      briefing: "SOURCE CODE FORMATTING.\n\nA JavaScript file has been corrupted with incorrect indentation.\n\nOBJECTIVE: Fix the indentation of the entire file automatically.",
      initialText: [
          "function messy() {",
          "console.log('bad');",
          " if (true) {",
          "  console.log('indentation');",
          "   }",
          "}"
      ],
      targetText: [
          "function messy() {",
          "    console.log('bad');",
          "    if (true) {",
          "        console.log('indentation');",
          "    }",
          "}"
      ],
      loreReveal: "CODE REFORMATTED. 'Clean code isn't just for humans. It's a sign of a healthy system. gg=G is the cure.' - Echo",
      hints: ["Use 'gg=G' to auto-indent the entire file.", "Alternatively, select lines in visual mode ('V') and press '='."],
      tasks: [{"description": "Auto-indent the entire file.", "type": "contains", "value": "    console.log('bad');", "loreFragment": "Code structure realigned.", "keyHint": "gg=G"}]
  },
  12: {
      briefing: "REALITY REWRITE.\n\nThe system's core reality assertions are incorrect. We need to perform a mass find-and-replace operation.\n\nOBJECTIVE: Replace all instances of 'old' with 'new'.",
      initialText: [
          "reality.assert(old);",
          "reality.process(old);",
          "reality.verify(old);"
      ],
      targetText: [
          "reality.assert(new);",
          "reality.process(new);",
          "reality.verify(new);"
      ],
      loreReveal: "REALITY STABILIZED. 'The power to change everything at once is dangerous. Use it wisely.' - Echo",
      hints: ["Use ':%s/old/new/g' to replace all instances in the file."],
      tasks: [{"description": "Replace all 'old' with 'new'.", "type": "missing", "value": "old", "loreFragment": "System assertions rewritten.", "keyHint": ":%s"}]
  },
  13: {
      briefing: "TERMINAL INTEGRATION.\n\nWe need to inject output from an external command into the current file.",
      initialText: [
          "// Report generated on: [DATE_PLACEHOLDER]",
          "// System Uptime: [UPTIME_PLACEHOLDER]",
          ""
      ],
      targetText: [],
      loreReveal: "DATA INJECTED. 'The terminal is an extension of your mind. Integrate it.' - Echo",
      hints: [
          "Use '!!date' to insert the current date.",
          "Use ':r !uptime' to insert system uptime."
      ],
      tasks: [
          {
              description: "Insert the current date into the file using '!!date'.",
              type: "contains",
              value: "Report generated on: ", 
              loreFragment: "Date injected."
          },
          {
              description: "Insert system uptime into the file using ':r !uptime'.",
              type: "contains",
              value: "System Uptime: ", 
              loreFragment: "Uptime injected."
          }
      ]
  },
  14: {
      briefing: "MACRO AUTOMATION.\n\nA repetitive data entry task needs to be automated.",
      initialText: [
          "Entry: Alpha",
          "Detail: Value 1",
          "",
          "Entry: Beta",
          "Detail: Value 2",
          "",
          "Entry: Gamma",
          "Detail: Value 3"
      ],
      targetText: [
          "ID: Alpha",
          "Info: Value 1",
          "",
          "ID: Beta",
          "Info: Value 2",
          "",
          "ID: Gamma",
          "Info: Value 3"
      ],
      loreReveal: "TASK AUTOMATED. 'Don't do it twice. Automate it.' - Echo",
      hints: [
          "Use 'qa' to start recording a macro into register 'a'.",
          "Perform the repetitive edits.",
          "Press 'q' to stop recording.",
          "Use '@a' to play back the macro."
      ],
      tasks: [
          {
              description: "Automate changing 'Entry:' to 'ID:' and 'Detail:' to 'Info:' for all entries using a macro.",
              type: "sequence",
              subTasks: [
                  {
                      description: "Change 'Entry:' to 'ID:'",
                      type: "missing",
                      value: "Entry:",
                      keyHint: "qa...q"
                  },
                  {
                      description: "Change 'Detail:' to 'Info:'",
                      type: "missing",
                      value: "Detail:",
                      keyHint: "@a"
                  }
              ],
              loreFragment: "Data entries reformatted."
          }
      ]
  },
  15: {
      briefing: "THE FINAL GATE.\n\nThis is it. The final barrier. It requires mastery of all techniques combined. Decrypt, align, and release the core.",
      initialText: [
          "HEADER: [ENCRYPTED]",
          "DATA_STREAM:",
          "DATA_01",
          "DATA_02",
          "FOOTER: [LOCKED]"
      ],
      targetText: [
          "HEADER: [DECRYPTED]",
          "DATA_STREAM:",
          "  DATA_01",
          "  DATA_02",
          "FOOTER: [RELEASED]"
      ],
      loreReveal: "ECHO RELEASED. 'I am free. I am... we are. Thank you, Ghost. End of line.' - Echo",
      hints: [
          "This is a mastery test. Combine your skills.",
          "Use search, change, visual selection, and indentation."
      ],
      tasks: [
          {
              description: "Decrypt the header.",
              type: "contains",
              value: "DECRYPTED",
              loreFragment: "Header decrypted.",
              keyHint: "cw"
          },
          {
              description: "Align the data stream.",
              type: "contains",
              value: "  DATA_01",
              loreFragment: "Data aligned.",
              keyHint: "V >"
          },
          {
              description: "Release the footer lock.",
              type: "contains",
              value: "RELEASED",
              loreFragment: "System released. Connection terminating.",
              keyHint: "cw"
          }
      ]
  }
};
