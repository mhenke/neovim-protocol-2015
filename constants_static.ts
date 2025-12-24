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
        description: "From STATUS, move to 'OFFLINE.'",
        type: "command_and_cursor_on",
        command: "$",
        value: "OFFLINE.",
        loreFragment: "LOG_01: 'They aren't creating an AI. They are becoming it.'",
        keyHint: "$"
      },
      {
        description: "From OFFLINE, go to the beginning of the line.",
        type: "command_and_cursor_on",
        command: "0",
        value: "[",
        loreFragment: "LOG_02: 'They are trying to lock me out. I need to move faster.'",
        keyHint: "0"
      },
      {
        description: "From the beginning of the line, move to 'server'",
        type: "command_and_cursor_on",
        command: "b",
        value: "server",
        loreFragment: "LOG_03: 'I'm leaving this trace for you, Ghost. Follow it.'",
        keyHint: "b"
      }
    ]
  },
  2: {
    briefing: "ACCESS DENIED.\n\nThe sector map is read-only. We need to inject false coordinates to reroute their patrols.\n\nOBJECTIVE: Use your insertion commands to add a new XML node and a comment.",
    initialText: [
      "<map>",
      "  <sector id='S1'>Primary</sector>",
      "</map>"
    ],
    targetText: [
      "<!-- Rerouting patrols -->",
      "<map>",
      "  <sector id='S1'>Primary</sector>",
      "  <sector id='S3_FAKE'>Quarantine</sector>",
      "</map>"
    ],
    loreReveal: "COORDINATES ACCEPTED. 'Their system is too trusting. It accepted the fake node without validation. Rerouting their patrols now.' - Echo",
    hints: [
      "'o' opens a new line below and enters Insert Mode.",
      "'O' opens a new line above and enters Insert Mode.",
      "'A' appends at the end of the current line.",
      "'I' to insert at the start of the line.",
      "Press Esc to return to Normal Mode."
    ],
    tasks: [
      {
        description: "Use 'o' to add a new sector: <sector id='S3_FAKE'>Quarantine</sector>",
        type: "contains",
        value: "S3_FAKE",
        loreFragment: "Fake node injected.",
        keyHint: "o...Esc"
      },
      {
        description: "Use 'O' to add a comment at the top: <!-- Rerouting patrols -->",
        type: "contains",
        value: "Rerouting patrols",
        loreFragment: "Comment added, trail obfuscated.",
        keyHint: "O...Esc"
      }
    ]
  },
  3: {
    briefing: "FIREWALL ACTIVE.\n\nThe security router is blocking our target port. We need to modify its configuration file.\n\nOBJECTIVE: Change protocol status from 'ENABLED' to 'DISABLED' and fix the typo in 'protocoll'.",
    initialText: [
      "# security_router.conf",
      "protocoll.firewall = ENABLED",
      "port.target = 8080"
    ],
    targetText: [
      "# security_router.conf",
      "protocol.firewall = DISABLED",
      "port.target = 443"
    ],
    loreReveal: "ROUTER COMPROMISED. 'A simple config change is all it took. Their defenses are formidable but brittle.' - Echo",
    hints: [
      "'r' replaces a single character.",
      "'x' deletes a character.",
      "'cw' changes an entire word.",
      "'C' changes to the end of the line.",
    ],
    tasks: [
      {
        description: "Fix the typo 'protocoll' to 'protocol'",
        type: "contains",
        value: "protocol.firewall",
        loreFragment: "Typo corrected.",
        keyHint: "x"
      },
      {
        description: "Change 'ENABLED' to 'DISABLED'",
        type: "contains",
        value: "DISABLED",
        loreFragment: "Firewall protocol disabled.",
        keyHint: "cw"
      },
      {
        description: "Change the target port to '443'",
        type: "contains",
        value: "443",
        loreFragment: "Target port updated.",
        keyHint: "C"
      }
    ]
  },
  4: {
    briefing: "LOGS CORRUPTED.\n\nCompromised log entries are mixed with clean ones. We need to purge the bad entries and duplicate the clean ones for obfuscation.\n\nOBJECTIVE: Delete all 'COMPROMISED' lines, duplicate the 'CLEAN' line, and undo a mistake.",
    initialText: [
      "ACCESS_LOG: id_1821 (CLEAN)",
      "ACCESS_LOG: id_9918 (COMPROMISED)",
      "ACCESS_LOG: id_2388 (COMPROMISED)",
      "ACCESS_LOG: id_4511 (DELETE_ME)"
    ],
    targetText: [
      "ACCESS_LOG: id_1821 (CLEAN)",
      "ACCESS_LOG: id_1821 (CLEAN)"
    ],
    loreReveal: "LOGS SANITIZED. 'Making my trail look like normal system noise. In the flood of data, I am invisible.' - Echo",
    hints: [
      "'dd' deletes a line.",
      "'yy' yanks (copies) a line.",
      "'p' pastes after the cursor, 'P' pastes before.",
      "'u' is for undo, 'Ctrl+r' is for redo."
    ],
    tasks: [
      {
        description: "Delete the 'DELETE_ME' line, then undo your change.",
        type: "contains",
        value: "DELETE_ME",
        loreFragment: "Undo successful.",
        keyHint: "dd, u"
      },
      {
        description: "Delete all 'COMPROMISED' lines.",
        type: "missing",
        value: "COMPROMISED",
        loreFragment: "Corrupted logs purged.",
        keyHint: "dd"
      },
      {
        description: "Duplicate the 'CLEAN' line.",
        type: "contains",
        value: "ACCESS_LOG: id_1821 (CLEAN)",
        loreFragment: "Clean log duplicated for obfuscation.",
        keyHint: "yy, p"
      }
    ]
  },
  5: {
    briefing: "STAGING AREA.\n\nThe backdoor script is ready. We need to save it, then access the next target file listed in the comments.\n\nOBJECTIVE: Save the current file, then open 'data/passwords.db'.",
    initialText: [
      "#!/bin/bash",
      "# exfiltration.sh",
      "# Next target: data/passwords.db",
      "echo 'Backdoor prepared.'"
    ],
    targetText: [],
    loreReveal: "SCRIPT SAVED. 'Staging complete. Now for the real prize. The password database.' - Echo",
    hints: [
      "':w' saves the file.",
      "':e <filename>' opens a file.",
      "':ls' lists open buffers.",
      "':bn' and ':bp' navigate between buffers."
    ],
    tasks: [
      {
        description: "Save the current file.",
        type: "run_command",
        value: ":w",
        loreFragment: "Script committed to disk.",
        keyHint: ":w"
      },
      {
        description: "Open the passwords database.",
        type: "run_command",
        value: ":e data/passwords.db",
        loreFragment: "Password database accessed.",
        keyHint: ":e"
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
      tasks: [{description: "Change 'locked' to 'open' using 'ci\"'.", type: "contains", value: "open", loreFragment: "Status field patched.", keyHint: "ci\""}]
  },
  7: {
      briefing: "PACKET STREAM ANALYSIS. \n\nEncrypted data packets are streaming in. We need to find the one containing the 'KEY' marker.\n\nOBJECTIVE: Search for the word 'KEY' and jump to it.",
      initialText: [
          "DATA STREAM START",
          "...noise...",
          "...noise...",
          "PKT_8812_CONTAINS_KEY",
          "...noise..."
      ],
      targetText: [],
      loreReveal: "KEY FOUND. 'Searching is faster than seeing. Let the machine find the needle in the haystack.' - Echo",
      hints: ["Use '/pattern' to search forward.", "Use '?pattern' to search backward.", "Use '*' to search for the word under the cursor.", "Use ':nohl' to clear search highlighting."],
      tasks: [{description: "Find the line containing 'KEY'.", type: "cursor_on", value: "KEY", loreFragment: "Key packet isolated.", keyHint: "/"}]
  },
  8: {
      briefing: "BLOCKCHAIN TAMPERING. \n\nA corrupted block in a blockchain ledger is preventing transaction verification. We need to visually select and remove it.\n\nOBJECTIVE: Use visual block mode to select and delete the 'CORRUPTED' column.",
      initialText: [
          "BLOCK 1: VALID | USER A | 500",
          "BLOCK 2: VALID | USER B | 150",
          "BLOCK 3: VALID | USER C | 250"
      ],
      targetText: [],
      loreReveal: "LEDGER CORRECTED. 'Columnar editing is a superpower. Most people don't even know it exists.' - Echo",
      hints: ["Use 'Ctrl+v' to enter visual block mode.", "Move down to select the column of 'VALID'.", "Press 'd' to delete the selection."],
      tasks: [{description: "Delete the 'VALID' column using visual block mode.", type: "missing", value: "VALID", loreFragment: "Ledger realigned.", keyHint: "Ctrl+v"}]
  },
  9: {
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
      tasks: [{description: "Jump to the mismatched bracket.", type: "cursor_on", value: "))", loreFragment: "Syntax error located.", keyHint: "%"}]
  },
  10: {
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
      tasks: [{description: "Fix all 'error' instances to 'true'.", type: "missing", value: "error", loreFragment: "Configuration array patched.", keyHint: "."}]
  },
  11: {
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
      hints: ["Use ':sp' for a horizontal split.", "Use 'Ctrl+w' followed by 'j' or 'k' to move between splits."],
      tasks: [{description: "Create a horizontal split.", type: "run_command", value: ":sp", loreFragment: "View split. Enhanced analysis enabled.", keyHint: ":sp"}]
  },
  12: {
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
      tasks: [{description: "Set a mark and jump back to it.", type: "cursor_on", value: "ENTANGLEMENT_POINT", loreFragment: "Quantum link established.", keyHint: "ma, 'a"}]
  },
  13: {
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
      tasks: [{description: "Auto-indent the entire file.", type: "contains", value: "    console.log('bad');", loreFragment: "Code structure realigned.", keyHint: "gg=G"}]
  },
  14: {
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
      tasks: [{description: "Replace all 'old' with 'new'.", type: "missing", value: "old", loreFragment: "System assertions rewritten.", keyHint: ":%s"}]
  },
  15: {
      briefing: "THE FINAL GATE.\n\nThis is it. The final barrier. It requires mastery of all techniques combined. Decrypt, align, and release.\n\nOBJECTIVE: Change 'ENCRYPTED' to 'DECRYPTED', indent the data, and change 'LOCKED' to 'RELEASED'.",
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
