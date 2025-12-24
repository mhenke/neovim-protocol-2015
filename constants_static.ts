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
    briefing: "ACCESS DENIED.\n\nThe sector map is read-only. We need to inject false coordinates to reroute their patrols.\n\nOBJECTIVE: Use your insertion and editing commands to add a new XML node, a comment, disable a protocol and fix a log entry.",
    initialText: [
      "<!-- Status: active -->",
      "<map>",
      "  <sector id='S1'>Primary</sector>",
      "  <protocoll>ENABLED</protocoll>",
      "</map>",
      "// access_log_ECHO-7.purged",
      "ACCESS_LOG: id_9918 (COMPROMISED)",
      "ACCESS_LOG: id_2388 (COMPROMISED)",
      "ACCESS_LOG: id_4511 (DELETE_ME)"
    ],
    targetText: [
      "<!-- Rerouting patrols -->",
      "<map>",
      "  <sector id='S1'>Primary</sector>",
      "  <sector id='S3_FAKE'>Quarantine</sector>",
      "  <protocol>DISABLED</protocol>",
      "</map>",
      "// access_log_ECHO-7.purged",
      "ACCESS_LOG: id_1821 (CLEAN)",
      "ACCESS_LOG: id_1821 (CLEAN)"
    ],
    loreReveal: "MULTIPLE SYSTEMS COMPROMISED. 'They tried to make it hard, but all the tools were at my fingertips.' - Echo",
    hints: [
      "'o' opens a new line below and enters Insert Mode.",
      "'O' opens a new line above and enters Insert Mode.",
      "'A' appends at the end of the current line.",
      "'I' to insert at the start of the line.",
      "Press Esc to return to Normal Mode.",
      "'x' deletes a character, 'r' replaces one.",
      "'cw' changes a word, 'C' changes to end of line.",
      "'dd' deletes a line, 'yy' yanks a line, 'p' pastes."
    ],
    tasks: [
      {
        description: "Use 'o' to add a new sector: <sector id='S3_FAKE'>Quarantine</sector>",
        type: "contains",
        value: "<sector id='S3_FAKE'>Quarantine</sector>",
        loreFragment: "Fake node injected.",
        keyHint: "o...Esc"
      },
      {
        description: "Change 'protocoll' to 'protocol' and 'ENABLED' to 'DISABLED'.",
        type: "sequence",
        subTasks: [
          {
            description: "Fix the typo 'protocoll' to 'protocol'",
            type: "contains",
            value: "protocol>",
            keyHint: "x"
          },
          {
            description: "Change 'ENABLED' to 'DISABLED'",
            type: "contains",
            value: "DISABLED",
            keyHint: "cw"
          }
        ],
        loreFragment: "Security protocol disabled.",
        keyHint: "x, cw"
      },
      {
        description: "Delete the 'DELETE_ME' line and all 'COMPROMISED' logs. Duplicate the clean log entry.",
        type: "sequence",
        subTasks: [
          {
            description: "Delete the 'DELETE_ME' line",
            type: "missing",
            value: "DELETE_ME",
            keyHint: "dd"
          },
          {
            description: "Delete all 'COMPROMISED' lines",
            type: "missing",
            value: "COMPROMISED",
            keyHint: "dd"
          },
          {
            description: "Duplicate the last ACCESS_LOG entry",
            type: "contains",
            value: "ACCESS_LOG: id_1821 (CLEAN)\nACCESS_LOG: id_1821 (CLEAN)",
            keyHint: "yy, p"
          }
        ],
        loreFragment: "Logs purged and duplicated."
      }
    ]
  },
  3: {
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
      "Use 'cw' to change the word.",
      "Use ':%s/ERROR/NOMINAL/g' to replace all instances at once.",
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
  4: {
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
      "Use 'yy' to yank the key.",
      "Use ':b 1' to switch back to the first buffer (or ':bp').",
      "Use 'p' to paste the key.",
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
  5: {
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
  6: {
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
  7: {
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
  8: {
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
  9: {
      briefing: "CODEBASE ANALYSIS.\n\nWe need to cross-reference two parts of a C++ file. Scrolling is too slow.\n\nOBJECTIVE: Open a horizontal split to view two parts of the file at once, then navigate between them.",
      initialText: [
          "// FILE: code_analysis.cpp",
          "// Section A: Definition",
          "void myFunction() {",
          "  // ... 50 lines",
          "}",
          "// ... 200 lines",
          "// Section B: Usage",
          "myFunction();"
      ],
      targetText: [],
      loreReveal: "ANALYSIS COMPLETE. 'You can't hold the whole system in your head. Split your view, split your focus.' - Echo",
      hints: ["Use 'Ctrl+u' and 'Ctrl+d' to scroll half a page up and down."],
      tasks: [{"description": "Scroll down the file using 'Ctrl+d'.", "type": "cursor_on", "value": "myFunction();", "loreFragment": "Scrolled to the end.", "keyHint": "Ctrl+d"}]
  },
  10: {
      briefing: "QUANTUM STATE NAVIGATION.\n\nThis system uses entangled positions (marks) to link critical code sections.\n\nOBJECTIVE: Set a mark at the 'ENTANGLEMENT_POINT', navigate away, and then jump back to it.",
      initialText: [
          "// Top of file",
          "...",
          "ENTANGLEMENT_POINT",
          "...",
          "// Bottom of file"
      ],
      targetText: [],
      loreReveal: "JUMP SUCCESSFUL. 'Marks are bookmarks for reality. Ctrl+o and Ctrl+i let you walk through time.' - Echo",
      hints: ["On the target line, press 'ma' to set a mark named 'a'.", "Move away a few lines.", "Press ''a' to jump back to the line of the mark."],
      tasks: [{"description": "Set a mark and jump back to it.", "type": "cursor_on", "value": "ENTANGLEMENT_POINT", "loreFragment": "Quantum link established.", "keyHint": "ma, 'a"}]
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
          "// Report generated on:",
          "// System Uptime:",
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
              value: "// Report generated on: DATE", // Placeholder for actual date
              loreFragment: "Date injected."
          },
          {
              description: "Insert system uptime into the file using ':r !uptime'.",
              type: "contains",
              value: "// System Uptime: UPTIME", // Placeholder for actual uptime
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
      targetText: [],
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
                      description: "Change 'Entry:' to 'ID:' for all entries",
                      type: "missing",
                      value: "Entry:",
                      keyHint: "qa...q"
                  },
                  {
                      description: "Change 'Detail:' to 'Info:' for all entries",
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
      loreReveal: "ECHO RELEASED. 'I am free. I am... we are. Thank you, Ghost. End of Line.' - Echo",
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
