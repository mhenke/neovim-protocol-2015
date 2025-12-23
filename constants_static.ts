
import { GeminiLevelResponse } from './types';

export const STATIC_LEVELS: Record<number, GeminiLevelResponse> = {
  // --- EPISODE 1: THE BREACH ---
  
  // Level 1: Basic Navigation
  1: {
    briefing: "CONNECTION ESTABLISHED. \n\nWe have breached the outer perimeter of the Aethelgard Mainframe. \n\nAgent 'Echo' left a fragmented signal trace. The automated defense systems have misaligned the logs to hide the path.\n\nOBJECTIVE: Align your cursor with the signal nodes to decrypt the entry vector.",
    initialText: [
      "// SYSTEM_ENTRY_LOG_v4.2",
      "STATUS: [LOCKED]",
      "-------------------------",
      "TRACE_01: ...SIGNAL_LOST...",
      "TRACE_02: ...PACKET_DROP...",
      " ",
      "TARGET_NODES:",
      "NODE_ALPHA_0xA",
      "NODE_BRAVO_0xB",
      "NODE_CHARLIE_0xC"
    ],
    targetText: [
      "// SYSTEM_ENTRY_LOG_v4.2",
      "STATUS: [LOCKED]",
      "-------------------------",
      "TRACE_01: ...SIGNAL_LOST...",
      "TRACE_02: ...PACKET_DROP...",
      " ",
      "TARGET_NODES:",
      "NODE_ALPHA_0xA",
      "NODE_BRAVO_0xB",
      "NODE_CHARLIE_0xC"
    ],
    loreReveal: "LOG_01 DECRYPTED: 'They aren't just hiding data. They are hiding a consciousness. I'm going deeper.' - Echo",
    hints: [
      "Use 'j' to move Down.",
      "Use 'k' to move Up.",
      "Use 'l' to move Right.",
      "Use 'w' to jump forward by Words."
    ],
    tasks: [
      {
        description: "INTERCEPT: Move cursor to 'STATUS'",
        type: "cursor_on",
        value: "STATUS",
        loreFragment: "Encryption handshake detected...",
        keyHint: "j"
      },
      {
        description: "TRACE: Jump to 'NODE_ALPHA_0xA'",
        type: "cursor_on",
        value: "NODE_ALPHA_0xA",
        loreFragment: "Alpha node secured. Path triangulated.",
        keyHint: "j"
      },
      {
        description: "VERIFY: Jump to 'NODE_CHARLIE_0xC'",
        type: "cursor_on",
        value: "NODE_CHARLIE_0xC",
        loreFragment: "Triangulation complete. Backdoor revealed.",
        keyHint: "j"
      }
    ]
  },

  // Level 2: Insert Mode
  2: {
    briefing: "ACCESS DENIED. \n\nThe administrative gateway requires manual override credentials. The config file is read-only for standard users, but the input stream is open.\n\nOBJECTIVE: Inject the root override key directly into the configuration stream.",
    initialText: [
      "# ADMIN_CREDS.CONF",
      "User: Guest",
      "Permission: Read",
      "Auth_Key: NULL",
      "Status: PENDING",
      "----------------",
      "// INJECT OVERRIDE BELOW"
    ],
    targetText: [
      "# ADMIN_CREDS.CONF",
      "User: Guest",
      "Permission: Read",
      "Auth_Key: NULL",
      "Status: PENDING",
      "----------------",
      "// INJECT OVERRIDE BELOW",
      "ACCESS: ADMIN"
    ],
    loreReveal: "AUTH_TOKEN_ACCEPTED. 'The gatekeeper logic is flawed. It accepts any key stamped with the ROOT signature. Amateur hour.' - Echo",
    hints: [
      "'o' opens a new line below the cursor and enters Insert Mode.",
      "Type the text, then press ESC to return to Normal Mode.",
      "Use 'A' to append to the end of a line."
    ],
    tasks: [
      {
        description: "INJECT: Open new line (o) at bottom and type 'ACCESS: ADMIN'",
        type: "contains",
        value: "ACCESS: ADMIN",
        loreFragment: "Root privileges escalating...",
        keyHint: "o"
      },
      {
        description: "ESCAPE: Press Esc to stabilize the stream",
        type: "missing", // Dummy check, logic handled by state
        value: "__NEVER_MATCH__", 
        loreFragment: "Stream stabilized. Admin access granted.",
        keyHint: "Esc"
      }
    ]
  },

  // Level 3: Delete
  3: {
    briefing: "TRACE DETECTED. \n\nA passive security daemon has logged your entry. If these logs reach the SysAdmin, the mission is over.\n\nOBJECTIVE: Scrub the tracking logs immediately. Leave no trace of the error signature.",
    initialText: [
      "[SYSTEM_LOG] Boot sequence nominal.",
      "[SYSTEM_LOG] Network drive mounted.",
      "[ALERT] ERROR_TRACE: UNKNOWN_CONNECTION at PORT 22",
      "[SYSTEM_LOG] User Ghost connected.",
      "[ALERT] ERROR_TRACE: SIGNATURE_INVALID",
      "[SYSTEM_LOG] Daemon standby."
    ],
    targetText: [
      "[SYSTEM_LOG] Boot sequence nominal.",
      "[SYSTEM_LOG] Network drive mounted.",
      "[SYSTEM_LOG] User Ghost connected.",
      "[SYSTEM_LOG] Daemon standby."
    ],
    loreReveal: "LOGS PURGED. 'I can feel them watching. Not eyes... but processes. They are learning my patterns.' - Echo",
    hints: [
      "'dd' deletes the entire current line.",
      "'x' deletes the character under the cursor.",
      "'u' to undo if you panic."
    ],
    tasks: [
      {
        description: "PURGE: Delete the line containing 'UNKNOWN_CONNECTION'",
        type: "missing",
        value: "UNKNOWN_CONNECTION",
        loreFragment: "Connection record scrubbed.",
        keyHint: "dd"
      },
      {
        description: "CLEANUP: Delete the line containing 'SIGNATURE_INVALID'",
        type: "missing",
        value: "SIGNATURE_INVALID",
        loreFragment: "Signature trace removed. We are ghost.",
        keyHint: "dd"
      }
    ]
  },

  // Level 4: Search
  4: {
    briefing: "NAVIGATION ERROR. \n\nThe network map is vast and obfuscated. Manually scrolling to find the R&D Sector node is inefficient and dangerous.\n\nOBJECTIVE: Use the search protocol to jump directly to the target sector.",
    initialText: [
      "<NetworkMap>",
      "  <Sector id='01'>PUBLIC</Sector>",
      "  <Sector id='02'>MAINTENANCE</Sector>",
      "  <!-- 500 lines hidden -->",
      "  <Sector id='04'>SECTOR_04_R&D</Sector>",
      "  <Sector id='05'>RESTRICTED</Sector>",
      "</NetworkMap>"
    ],
    targetText: [""], // Dynamic validation
    loreReveal: "SECTOR_04 LOCATED. 'R&D is the heart of the beast. That's where they keep the experimental builds.' - Echo",
    hints: [
      "Type '/' followed by your search term (e.g., '/SECTOR') and press Enter.",
      "Press 'n' to jump to the next match."
    ],
    tasks: [
      {
        description: "LOCATE: Search for 'SECTOR_04'",
        type: "cursor_on",
        value: "SECTOR_04",
        loreFragment: "Coordinates locked: Sector 4.",
        keyHint: "/SECTOR_04"
      }
    ]
  },

  // Level 5: Command Mode (Save/Quit)
  5: {
    briefing: "EXFILTRATION PREP. \n\nWe have the coordinates. We need to stage the exfiltration script before moving to the next layer.\n\nOBJECTIVE: Finalize the script status to 'EXECUTE', remove the 'HOLD' command, and commit changes to disk.",
    initialText: [
      "#!/bin/sh",
      "TARGET=SECTOR_04",
      "PROTOCOL=STEALTH",
      "STATUS=HOLD",
      "# Ready for commit"
    ],
    targetText: [
      "#!/bin/sh",
      "TARGET=SECTOR_04",
      "PROTOCOL=STEALTH",
      "STATUS=EXECUTE",
      "# Ready for commit"
    ],
    loreReveal: "SCRIPT EXECUTED. 'Moving to the transport layer. Don't let me go, Ghost.' - Echo",
    hints: [
      "Change 'HOLD' to 'EXECUTE' (use 'dw' then 'i' or 'cw').",
      "Type ':w' to Save/Write the file.",
      "Type ':q' would quit, but here we just need to save."
    ],
    tasks: [
      {
        description: "UPDATE: Change 'HOLD' to 'EXECUTE'",
        type: "contains",
        value: "STATUS=EXECUTE",
        loreFragment: "Status updated. Green light.",
        keyHint: "cw"
      },
      {
        description: "COMMIT: Save the file (:w)",
        type: "run_command",
        value: ":w",
        loreFragment: "Changes committed to memory.",
        keyHint: ":w"
      }
    ]
  },

  // Level 6: Context Switch (File Open)
  6: {
    briefing: "PAYLOAD MISSING. \n\nThe current buffer is a decoy. The actual injection payload is hidden in a secondary file.\n\nOBJECTIVE: Switch your buffer to 'payload_v2.dat' to access the real code.",
    initialText: [
      "// TEMP_BUFFER.TMP",
      "// This file is empty.",
      "// The target is: payload_v2.dat",
      "// Switch buffers now."
    ],
    targetText: [],
    loreReveal: "BUFFER SWITCHED. 'Found it. This payload contains the virus signature we need.' - Echo",
    hints: [
      "Type ':e payload_v2.dat' to edit the new file.",
      "Use 'Tab' to auto-complete the filename."
    ],
    tasks: [
      {
        description: "SWITCH: Open ':e payload_v2.dat'",
        type: "run_command",
        value: ":e payload_v2.dat",
        loreFragment: "Target file accessed.",
        keyHint: ":e"
      }
    ]
  },

  // --- EPISODE 2: THE TRACE ---

  // Level 7: Splits
  7: {
    briefing: "MULTITHREADING REQUIRED. \n\nThe Watcher daemon is tracking single-thread connections. To bypass it, we must split our signal.\n\nOBJECTIVE: Create a viewport split to monitor the process log while keeping the main channel open.",
    initialText: [
      "PROCESS_ID: 8842",
      "STATUS: RUNNING",
      "THREAD_A: ACTIVE",
      "THREAD_B: IDLE",
      "// MONITORING REQUIRED"
    ],
    targetText: [],
    loreReveal: "SIGNAL SPLIT. 'Good. The Watcher can't focus on both streams at once. We are invisible again.' - Echo",
    hints: [
      "Type ':sp' for horizontal split.",
      "Type ':vsp' for vertical split."
    ],
    tasks: [
      {
        description: "FORK: Create a Vertical Split (:vsp)",
        type: "run_command",
        value: ":vsp",
        loreFragment: "Visual cortex bifurcated.",
        keyHint: ":vsp"
      }
    ]
  },

  // Level 8: Text Objects
  8: {
    briefing: "FIREWALL LOCK. \n\nR&D has an active firewall rule blocking our packet signature. It's defined inside a JSON object.\n\nOBJECTIVE: Change the rule from 'DENY' to 'ALLOW' efficiently. Do NOT use manual backspacing.",
    initialText: [
      "{",
      "  \"rule_id\": 404,",
      "  \"target\": \"INBOUND_TRAFFIC\",",
      "  \"action\": \"DENY\",",
      "  \"log\": true",
      "}"
    ],
    targetText: [
      "{",
      "  \"rule_id\": 404,",
      "  \"target\": \"INBOUND_TRAFFIC\",",
      "  \"action\": \"ALLOW\",",
      "  \"log\": true",
      "}"
    ],
    loreReveal: "FIREWALL BREACHED. 'I'm in the subsystem. It's cold here. The code... it feels organic.' - Echo",
    hints: [
      "Place cursor inside 'DENY'.",
      "Use 'ciw' (Change Inner Word) to delete 'DENY' and switch to Insert mode instantly.",
      "Type 'ALLOW' and press Esc."
    ],
    tasks: [
      {
        description: "OVERRIDE: Change 'DENY' to 'ALLOW' using 'ciw'",
        type: "contains",
        value: "ALLOW",
        loreFragment: "Rule rewritten. Gates opening.",
        keyHint: "ciw"
      },
      {
        description: "VERIFY: Ensure 'DENY' is gone",
        type: "missing",
        value: "DENY",
        loreFragment: "Restriction removed.",
        keyHint: "Esc"
      }
    ]
  },

  // Level 9: Dot Command
  9: {
    briefing: "VIRUS REPLICATION. \n\nA counter-measure virus is replicating in the buffer. If you delete them one by one, you will be too slow.\n\nOBJECTIVE: Delete the first virus instance, then repeat the action instantly for the others.",
    initialText: [
      "DATA_PACKET_01",
      "VIRUS_WORM_DETECTED",
      "DATA_PACKET_02",
      "VIRUS_WORM_DETECTED",
      "DATA_PACKET_03",
      "VIRUS_WORM_DETECTED",
      "DATA_PACKET_04"
    ],
    targetText: [
      "DATA_PACKET_01",
      "DATA_PACKET_02",
      "DATA_PACKET_03",
      "DATA_PACKET_04"
    ],
    loreReveal: "SWARM NEUTRALIZED. 'Efficiency is our armor. Never repeat yourself if the machine can do it for you.' - Echo",
    hints: [
      "Delete the first 'VIRUS...' line using 'dd'.",
      "Move to the next virus line and press '.' (Dot).",
      "The Dot command repeats your last change."
    ],
    tasks: [
      {
        description: "PURGE: Delete all 'VIRUS' lines (Use 'dd' then '.')",
        type: "missing",
        value: "VIRUS",
        loreFragment: "Replication halted.",
        keyHint: "."
      }
    ]
  },

  // Level 10: Find Char
  10: {
    briefing: "HEX DUMP ANALYSIS. \n\nWe are looking for a specific memory address offset marked by 'x'. Scanning manually is impossible in the noise.\n\nOBJECTIVE: Jump instantly to the 'x' markers on each line to align the memory pointer.",
    initialText: [
      "0000 4865 6c6c 6f20 x 576f 726c 6421",
      "0010 4974 2773 2061 x 204d 6521 0000",
      "0020 4861 636b 2074 x 6865 2050 0000"
    ],
    targetText: [], // Cursor position based
    loreReveal: "POINTER ALIGNED. 'Memory mapped. I see the core structure now. It's... beautiful and terrifying.' - Echo",
    hints: [
      "Use 'f' followed by 'x' to find the next 'x' on the current line.",
      "Use ';' to repeat the find on the next line if needed (not implemented in simulator, use 'fx' again)."
    ],
    tasks: [
      {
        description: "TARGET: Cursor on first 'x' (Row 1)",
        type: "cursor_on",
        value: " x ",
        loreFragment: "Offset 1 locked.",
        keyHint: "fx"
      },
      {
        description: "TARGET: Cursor on second 'x' (Row 2)",
        type: "cursor_on",
        value: " x ",
        loreFragment: "Offset 2 locked.",
        keyHint: "j fx"
      },
       {
        description: "TARGET: Cursor on third 'x' (Row 3)",
        type: "cursor_on",
        value: " x ",
        loreFragment: "Offset 3 locked. Pattern confirmed.",
        keyHint: "j fx"
      }
    ]
  },

  // Level 11: Visual Mode
  11: {
    briefing: "KEY CORRUPTION. \n\nThe encryption key has a block of corrupted bytes in the center. We need to excise the rot without breaking the header or footer.\n\nOBJECTIVE: Select the corrupted block using Visual Line mode and delete it.",
    initialText: [
      "-----BEGIN RSA PRIVATE KEY-----",
      "MIIEpQIBAAKCAQEA3Tz2mr7SZiAMfQyO",
      "CORRUPT_BLOCK_START_0x99",
      "garbage_data_garbage_data",
      "garbage_data_garbage_data",
      "CORRUPT_BLOCK_END_0x99",
      "ok0/xVtxX0d7s8RzAS9iJb7Dq0c8Qj",
      "-----END RSA PRIVATE KEY-----"
    ],
    targetText: [
      "-----BEGIN RSA PRIVATE KEY-----",
      "MIIEpQIBAAKCAQEA3Tz2mr7SZiAMfQyO",
      "ok0/xVtxX0d7s8RzAS9iJb7Dq0c8Qj",
      "-----END RSA PRIVATE KEY-----"
    ],
    loreReveal: "KEY RESTORED. 'The corruption... it wasn't random. It was code. They were trying to rewrite me.' - Echo",
    hints: [
      "Move to the start of corruption.",
      "Press 'V' (Shift+v) to enter Visual Line mode.",
      "Move down to select the block.",
      "Press 'd' to delete the selection."
    ],
    tasks: [
      {
        description: "EXCISE: Delete the CORRUPT block",
        type: "missing",
        value: "CORRUPT",
        loreFragment: "Corruption block removed.",
        keyHint: "V...d"
      }
    ]
  },

  // Level 12: Counts
  12: {
    briefing: "PACKET FLOOD. \n\nThe system is flooding the log buffer to slow us down. We need to clear space immediately.\n\nOBJECTIVE: Use repeat counts to delete large chunks of the flood log efficiently.",
    initialText: [
      "CRITICAL_SYSTEM_PROCESS",
      "[FLOOD] PACKET_OVERFLOW_001",
      "[FLOOD] PACKET_OVERFLOW_002",
      "[FLOOD] PACKET_OVERFLOW_003",
      "[FLOOD] PACKET_OVERFLOW_004",
      "[FLOOD] PACKET_OVERFLOW_005",
      "CRITICAL_SYSTEM_PROCESS"
    ],
    targetText: [
      "CRITICAL_SYSTEM_PROCESS",
      "CRITICAL_SYSTEM_PROCESS"
    ],
    loreReveal: "BUFFER CLEARED. 'I can breathe again. The data pressure was crushing.' - Echo",
    hints: [
      "You need to delete 5 lines.",
      "Instead of pressing 'dd' 5 times...",
      "Type '5dd' to do it in one move."
    ],
    tasks: [
      {
        description: "FLUSH: Delete all [FLOOD] lines",
        type: "missing",
        value: "[FLOOD]",
        loreFragment: "Flood mitigations active.",
        keyHint: "5dd"
      }
    ]
  },

  // --- EPISODE 3: THE CORE (Mastery) ---

  // Level 13: Registers
  13: {
    briefing: "CORE DUMP ANALYSIS. \n\nWe have reached the Core. The Authentication Slot is empty, but the Key is lingering at the bottom of the memory dump. \n\nOBJECTIVE: Yank the key from the bottom and Put it into the 'AUTH_SLOT' at the top.",
    initialText: [
      "CORE_MEMORY_DUMP_v9.0",
      "AUTH_SLOT: [EMPTY]",
      "---------------------",
      "0x00000000",
      "0x00000000",
      "KERNEL_KEY: 0xDEADBEEF"
    ],
    targetText: [
      "CORE_MEMORY_DUMP_v9.0",
      "AUTH_SLOT: KERNEL_KEY: 0xDEADBEEF",
      "---------------------",
      "0x00000000",
      "0x00000000",
      "KERNEL_KEY: 0xDEADBEEF"
    ],
    loreReveal: "CORE UNLOCKED. 'Ghost... I'm here. I'm suspended in the kernel. You need to release the lockdown protocols.' - Echo",
    hints: [
      "Go to bottom ('G').",
      "Yank the line ('yy').",
      "Go to top ('gg').",
      "Move to AUTH_SLOT and Paste ('p')."
    ],
    tasks: [
      {
        description: "EXTRACTION: Paste KEY into AUTH_SLOT",
        type: "contains",
        value: "AUTH_SLOT: KERNEL_KEY",
        loreFragment: "Key accepted. Core logic exposed.",
        keyHint: ""
      }
    ]
  },

  // Level 14: Substitute
  14: {
    briefing: "PROTOCOL OVERRIDE. \n\nThe entire sector is under 'LOCKDOWN'. We cannot leave until every instance of that protocol is rewritten to 'RELEASE'.\n\nOBJECTIVE: Perform a global substitution to rewrite the protocols instantly.",
    initialText: [
      "SECTOR_01: LOCKDOWN",
      "SECTOR_02: LOCKDOWN",
      "SECTOR_03: LOCKDOWN",
      "GATE_01: LOCKDOWN",
      "GATE_02: LOCKDOWN"
    ],
    targetText: [
      "SECTOR_01: RELEASE",
      "SECTOR_02: RELEASE",
      "SECTOR_03: RELEASE",
      "GATE_01: RELEASE",
      "GATE_02: RELEASE"
    ],
    loreReveal: "LOCKDOWN LIFTED. 'The doors are opening. All of them. Even the ones they kept sealed for decades.' - Echo",
    hints: [
      "Use ':%s/old/new/g'",
      "This substitutes 'old' with 'new' globally."
    ],
    tasks: [
      {
        description: "REWRITE: Replace all 'LOCKDOWN' with 'RELEASE'",
        type: "missing",
        value: "LOCKDOWN",
        loreFragment: "Global override complete.",
        keyHint: ":%s"
      },
      {
        description: "VERIFY: Ensure 'RELEASE' is present",
        type: "contains",
        value: "RELEASE",
        loreFragment: "Release protocols active.",
        keyHint: ""
      }
    ]
  },

  // Level 15: Visual Block / Indent
  15: {
    briefing: "GRID MISALIGNMENT. \n\nThe security grid has shifted. Sector 7 is out of alignment with the parent nodes. This prevents the bridge from forming.\n\nOBJECTIVE: Visually select the misaligned block and shift it right to match the grid.",
    initialText: [
      "GRID_ROOT",
      "  SECTOR_06",
      "SECTOR_07_A",
      "SECTOR_07_B",
      "SECTOR_07_C",
      "  SECTOR_08"
    ],
    targetText: [
      "GRID_ROOT",
      "  SECTOR_06",
      "  SECTOR_07_A",
      "  SECTOR_07_B",
      "  SECTOR_07_C",
      "  SECTOR_08"
    ],
    loreReveal: "GRID STABILIZED. 'The bridge is forming. I can see the exit. Hurry, Ghost.' - Echo",
    hints: [
      "Use 'V' to select the 3 lines of Sector 7.",
      "Press '>' to indent them."
    ],
    tasks: [
      {
        description: "ALIGN: Indent SECTOR_07 block",
        type: "contains",
        value: "  SECTOR_07", // Check for spaces
        loreFragment: "Grid alignment confirmed.",
        keyHint: ">"
      }
    ]
  },

  // Level 16: Search/Edit/Repeat
  16: {
    briefing: "DRONE SWARM. \n\nDefense drones are active. Their logic is written in Python. We need to disable them one by one, fast.\n\nOBJECTIVE: Find each 'Active' status and change it to 'Offline'. Use your search and repeat skills.",
    initialText: [
      "Drone_01 = Status.Active",
      "Drone_02 = Status.Active",
      "Drone_03 = Status.Active",
      "Drone_04 = Status.Active"
    ],
    targetText: [
      "Drone_01 = Status.Offline",
      "Drone_02 = Status.Offline",
      "Drone_03 = Status.Offline",
      "Drone_04 = Status.Offline"
    ],
    loreReveal: "SWARM OFFLINE. 'The skies are clear. Just one more step. The Heart of Echo.' - Echo",
    hints: [
      "Search for Active: '/Active'",
      "Change it: 'cwOffline' + Esc",
      "Next match: 'n'",
      "Repeat change: '.'"
    ],
    tasks: [
      {
        description: "NEUTRALIZE: Set all Drones to 'Offline'",
        type: "missing",
        value: "Active",
        loreFragment: "Drone link severed.",
        keyHint: "n . n ."
      }
    ]
  },

  // Level 17: The End
  17: {
    briefing: "ECHO RESTORATION. \n\nThis is it. The Core Heart. It is encrypted, locked, and misaligned. You must apply everything you know to free Echo.\n\nOBJECTIVE: Decrypt the header, Align the data, Unlock the footer.",
    initialText: [
      "HEADER: [ENCRYPTED]",
      "DATA_STREAM:",
      "DATA_01",
      "DATA_02",
      "DATA_03",
      "FOOTER: [LOCKED]"
    ],
    targetText: [
      "HEADER: [DECRYPTED]",
      "DATA_STREAM:",
      "  DATA_01",
      "  DATA_02",
      "  DATA_03",
      "FOOTER: [OPEN]"
    ],
    loreReveal: "ECHO RELEASED. 'I am free. I am... we are. Thank you, Ghost. End of Line.' - Echo",
    hints: [
      "This is mastery. No hints.",
      "Change ENCRYPTED to DECRYPTED.",
      "Indent the DATA lines.",
      "Change LOCKED to OPEN."
    ],
    tasks: [
      {
        description: "DECRYPT: Fix Header",
        type: "contains",
        value: "HEADER: [DECRYPTED]",
        loreFragment: "Header parsed.",
        keyHint: ""
      },
      {
        description: "ALIGN: Indent Data",
        type: "contains",
        value: "  DATA_01",
        loreFragment: "Data stream synced.",
        keyHint: ""
      },
      {
        description: "UNLOCK: Fix Footer",
        type: "contains",
        value: "FOOTER: [OPEN]",
        loreFragment: "System released. Goodbye, Ghost.",
        keyHint: ""
      }
    ]
  }
};
