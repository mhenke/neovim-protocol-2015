
import { Level } from './types';

export const INITIAL_LORE = [
  "INCOMING TRANSMISSION [SOURCE: UNKNOWN]",
  "DECODING...",
  "----------------------------------------",
  "'Ghost, if you're reading this, I didn't make it out.'",
  "'They didn't just kill the project. They became it.'",
  "'I'm trapped in the Core. Come find me.'",
  "----------------------------------------",
  "SIGNAL LOST.",
  "CONNECTING TO AETHELGARD_BIOLOGICS (192.168.0.44)...",
  "STATUS: UNAUTHORIZED",
  "MISSION: LOCATE AND EXTRACT AGENT 'ECHO'"
];

export const EPISODE_CONTEXT: Record<number, { title: string, lore: string }> = {
  1: {
    title: "THE BREACH",
    lore: "Agent 'Echo' went dark 72 hours ago. You are at the perimeter.\n\nThe system logs are fragmented, but they contain the coordinates to the R&D sector.\n\nUse basic navigation and editing tools to reconstruct the trail without tripping the perimeter alarms."
  },
  2: {
    title: "THE TRACE",
    lore: "You've breached R&D. The security here is adaptive. 'Watcher' daemons trace every connection.\n\nSpeed is your only defense. You must manipulate data structures instantly. Repetitive actions will get you caught.\n\nEfficiency is survival."
  },
  3: {
    title: "THE CORE",
    lore: "You've reached the Core. The truth is worse than we thought.\n\nEcho wasn't captured. Echo was uploaded. They are the system now.\n\nTo free them, you must operate with surgical precision. The interface provides no help here. You must know your tools."
  }
};

export const STATIC_LEVELS: Level[] = [
  // --- EPISODE 1 ---
  {
    id: 1,
    config: {
      id: 1, episode: 1, episodeTitle: "THE BREACH",
      filename: "entry_log.txt",
      objective: "Navigate the signal trace.",
      newKeys: ['h', 'j', 'k', 'l', 'w', 'b', '0', '$'],
      mechanics: ['nav_basic']
    },
    briefing: "CONNECTION ESTABLISHED.\n\nWe are at the perimeter gate. Agent 'Echo' went dark 72 hours ago. Their last transmission is fragmented across these logs.\n\nTrace the signal points in order: Status -> LOST -> ALPHA -> MISALIGNED.\n\nOnce all nodes are secured, type ':w' to lock the signal.",
    initialText: [
      "// SYSTEM_ONLINE",
      "SIGNAL_TRACE [MISALIGNED]",
      "-------------------------",
      "Target: ECHO_PROTOCOL",
      "Status: LOST",
      " ",
      "Interceptors:",
      "ALPHA",
      "BRAVO"
    ],
    targetText: [],
    tasks: [
        { description: "SYSTEM CHECK: Move to 'Status'", type: 'cursor_on', value: "Status", completed: false, loreFragment: "Backdoor found. I have breached the R&D perimeter.", keyHint: "j" },
        { description: "VERIFY: Move to 'LOST'", type: 'cursor_on', value: "LOST", completed: false, loreFragment: "They aren't creating an AI. They are becoming it.", keyHint: "l" },
        { description: "INTERCEPT: Move to 'ALPHA'", type: 'cursor_on', value: "ALPHA", completed: false, loreFragment: "Tracing signal origin... Coordinates locked.", keyHint: "j, l" },
        { description: "ALIGN: Move to '[MISALIGNED]'", type: 'cursor_on', value: "[MISALIGNED]", completed: false, loreFragment: "Signal Lock Established. Ready for injection. Going in.", keyHint: "k, w" }
    ],
    hints: ["Use 'j' to go down, 'k' to go up.", "Use 'w' to jump forward by words."],
    loreReveal: "Signal Lock Established. Ready for injection. Going in."
  },
  {
    id: 2,
    config: {
      id: 2, episode: 1, episodeTitle: "THE BREACH",
      filename: "admin_creds.conf",
      objective: "Inject override credentials.",
      newKeys: ['i', 'a', 'o', 'A', 'Esc'],
      mechanics: ['insert_mode']
    },
    briefing: "AUTHENTICATION REQUIRED.\n\nInject your ghost credentials to bypass the login prompt.",
    initialText: [
      "AUTH_CONFIG_V2",
      "USER: GHOST",
      "ROLE: GUEST",
      "PERMISSIONS: READ_ONLY",
      "# OVERRIDE REQUIRED BELOW"
    ],
    targetText: [],
    tasks: [
      { description: "Open line below (o) -> Type 'ACCESS: ADMIN' -> Esc", type: 'contains', value: "ACCESS: ADMIN", completed: false, loreFragment: "Admin privileges spoofed.", keyHint: "o" },
      { description: "Append to end (A) of 'READ_ONLY' -> Type '_BYPASS' -> Esc", type: 'contains', value: "READ_ONLY_BYPASS", completed: false, loreFragment: "Write permissions granted.", keyHint: "A" }
    ],
    hints: ["Press 'o' to open a new line below.", "Press 'A' (Shift+a) to append to the end of a line.", "ALWAYS press Esc after typing."],
    loreReveal: "I'm in the admin panel. The logs are... screaming."
  },
  {
    id: 3,
    config: {
      id: 3, episode: 1, episodeTitle: "THE BREACH",
      filename: "security_daemon.log",
      objective: "Purge the tracking logs.",
      newKeys: ['d', 'dd', 'x', 'u'],
      mechanics: ['delete_line']
    },
    briefing: "TRACKING DETECTED.\n\nThe system is logging your intrusion. Delete the error traces immediately.",
    initialText: [
      "[LOG] DAEMON_START_001",
      "[ERR] ERROR_TRACE_X1",
      "[LOG] MONITORING_ACTIVE",
      "[ERR] ERROR_TRACE_X2",
      "[LOG] PORT_22_OPEN"
    ],
    targetText: [],
    tasks: [
      { description: "Delete line containing 'ERROR_TRACE_X1'", type: 'missing', value: "ERROR_TRACE_X1", completed: false, loreFragment: "Trace 1 deleted.", keyHint: "dd" },
      { description: "Delete line containing 'ERROR_TRACE_X2'", type: 'missing', value: "ERROR_TRACE_X2", completed: false, loreFragment: "Trace 2 deleted. Clean.", keyHint: "dd" }
    ],
    hints: ["'dd' deletes the entire line.", "'x' deletes a single character."],
    loreReveal: "They know I'm here. I have to move fast."
  },
  {
    id: 4,
    config: {
      id: 4, episode: 1, episodeTitle: "THE BREACH",
      filename: "network_map.xml",
      objective: "Locate the R&D node.",
      newKeys: ['/', 'n', 'N'],
      mechanics: ['search']
    },
    briefing: "SECTOR SCAN.\n\nThe map is vast. Use the search function to locate the R&D Hub.",
    initialText: [
      "<root>",
      "  <sector id='01'>SAFE</sector>",
      "  <sector id='02'>SAFE</sector>",
      "  <sector id='03'>SAFE</sector>",
      "  <sector id='04'>R&D_HUB</sector>",
      "  <sector id='05'>SAFE</sector>",
      "</root>"
    ],
    targetText: [],
    tasks: [
      { description: "Search for 'R&D' (/R&D)", type: 'cursor_on', value: "R&D", completed: false, loreFragment: "Hub located.", keyHint: "/" }
    ],
    hints: ["Type '/' followed by your search term, then Enter.", "Use 'n' to jump to the next match."],
    loreReveal: "R&D is physically isolated. I need a bridge."
  },
  {
    id: 5,
    config: {
      id: 5, episode: 1, episodeTitle: "THE BREACH",
      filename: "exfiltration_script.sh",
      objective: "Finalize the breach.",
      newKeys: [':w', ':q'],
      mechanics: ['command_mode']
    },
    briefing: "COMMIT SEQUENCE.\n\nThe script is pending. Set status to EXECUTE and save the file to run it.",
    initialText: [
      "#!/bin/bash",
      "# PAYLOAD_DELIVERY",
      "STATUS=HOLD",
      "TARGET=MAIN_DB",
      "# WAITING_FOR_COMMIT"
    ],
    targetText: [],
    tasks: [
      { description: "Change 'HOLD' to 'EXECUTE'", type: 'contains', value: "EXECUTE", completed: false, loreFragment: "Payload armed.", keyHint: "cw" },
      { description: "Save the file (:w)", type: 'run_command', value: ":w", completed: false, loreFragment: "Script executed.", keyHint: ":w" }
    ],
    hints: ["Use 'cw' to change a word.", "Type ':w' and Enter to save."],
    loreReveal: "The door is open. I'm stepping through."
  },
  {
    id: 6,
    config: {
      id: 6, episode: 1, episodeTitle: "THE BREACH",
      filename: "temp_buffer.tmp",
      objective: "Context Switch.",
      newKeys: [':e', 'Tab'],
      mechanics: ['file_open'],
      targetFile: 'payload_v2.dat'
    },
    briefing: "HIDDEN FILE.\n\nThe real payload is in a hidden file. Switch buffers to access it.",
    initialText: [
      "BUFFER_EMPTY",
      "Redirecting to secure storage...",
      "Target file: payload_v2.dat",
      "CMD: open_target"
    ],
    targetText: [],
    tasks: [
      { description: "Open file: :e payload_v2.dat", type: 'run_command', value: ":e payload_v2.dat", completed: false, loreFragment: "Buffer switched.", keyHint: ":e" }
    ],
    hints: ["Type ':e pay' then press TAB to autocomplete."],
    loreReveal: "Payload loaded. Phase 1 complete."
  },

  // --- EPISODE 2 ---
  {
    id: 7,
    config: {
      id: 7, episode: 2, episodeTitle: "THE TRACE",
      filename: "process_monitor.log",
      objective: "Parallel Threads.",
      newKeys: [':sp', ':vsp', ':tabnew'],
      mechanics: ['splits'],
      timeLimit: 90
    },
    briefing: "MULTITASKING REQUIRED.\n\nMonitor multiple process streams simultaneously. Split your view.",
    initialText: [
      "PID: 4402 [ACTIVE]",
      "PID: 4403 [ACTIVE]",
      "PID: 4404 [ACTIVE]",
      "STREAM: AWAITING_VIEWPORT"
    ],
    targetText: [],
    tasks: [
      { description: "Create a Horizontal Split (:sp)", type: 'run_command', value: ":sp", completed: false, loreFragment: "View bifurcated.", keyHint: ":sp" },
      { description: "Create a Vertical Split (:vsp)", type: 'run_command', value: ":vsp", completed: false, loreFragment: "Triangulation complete.", keyHint: ":vsp" }
    ],
    hints: ["':sp' splits horizontally.", "':vsp' splits vertically."],
    loreReveal: "I can see the data flow now. It's massive."
  },
  {
    id: 8,
    config: {
      id: 8, episode: 2, episodeTitle: "THE TRACE",
      filename: "firewall_rules.json",
      objective: "Update protocols.",
      newKeys: ['c', 'ci', 'di', 'Esc'],
      mechanics: ['text_objects'],
      timeLimit: 60
    },
    briefing: "RULESET LOCK.\n\nChange the inner words to allow traffic.",
    initialText: [
      "{",
      "  'rule_01': 'ALLOW',",
      "  'rule_02': 'DENY',",
      "  'rule_03': 'DENY',",
      "  'rule_04': 'ALLOW'",
      "}"
    ],
    targetText: [],
    tasks: [
      { description: "Change first 'DENY' to 'ALLOW' (ciw)", type: 'contains', value: "rule_02': 'ALLOW", completed: false, loreFragment: "Port 02 opened.", keyHint: "ciw" },
      { description: "Change second 'DENY' to 'ALLOW'", type: 'contains', value: "rule_03': 'ALLOW", completed: false, loreFragment: "Port 03 opened.", keyHint: "ciw" }
    ],
    hints: ["'ciw' stands for Change Inner Word.", "It deletes the word and puts you in Insert mode."],
    loreReveal: "Firewall is confused. We have a window."
  },
  {
    id: 9,
    config: {
      id: 9, episode: 2, episodeTitle: "THE TRACE",
      filename: "replication_virus.dat",
      objective: "Neutralize the swarm.",
      newKeys: ['.'],
      mechanics: ['dot_command'],
      timeLimit: 45
    },
    briefing: "VIRUS DETECTED.\n\nA replication script is running. Delete the first signature, then repeat the action instantly.",
    initialText: [
      "DATA_STREAM_START",
      "VIRUS_SIG_X99",
      "VIRUS_SIG_X99",
      "VIRUS_SIG_X99",
      "DATA_STREAM_END"
    ],
    targetText: [],
    tasks: [
      { description: "Delete first 'VIRUS_SIG_X99' (dd)", type: 'missing', value: "VIRUS_SIG_X99", completed: false, loreFragment: "Signature 1 purged.", keyHint: "dd" },
      { description: "Use dot (.) to delete the rest", type: 'missing', value: "VIRUS", completed: false, loreFragment: "Swarm neutralized.", keyHint: "." }
    ],
    hints: ["The dot key (.) repeats your last change.", "Delete one line, then just press . for the others."],
    loreReveal: "Replication halted. That was close."
  },
  {
    id: 10,
    config: {
      id: 10, episode: 2, episodeTitle: "THE TRACE",
      filename: "memory_dump.hex",
      objective: "Precision targeting.",
      newKeys: ['f', 't', ';'],
      mechanics: ['find_char'],
      timeLimit: 40
    },
    briefing: "HEX EDIT.\n\nLocate the specific memory address '99' on the line.",
    initialText: [
      "0x00: FF A4 B2 C1",
      "0x10: E3 99 A1 00",
      "0x20: 88 77 66 55",
      "Target: Find 99"
    ],
    targetText: [],
    tasks: [
      { description: "Find '99' on line 2 (f9)", type: 'cursor_on', value: "99", completed: false, loreFragment: "Address located.", keyHint: "f" }
    ],
    hints: ["'f' + character jumps to the next occurrence of that character.", "Use ';' to repeat the find."],
    loreReveal: "Memory dump analyzed. I see a pattern."
  },
  {
    id: 11,
    config: {
      id: 11, episode: 2, episodeTitle: "THE TRACE",
      filename: "encryption_key.pem",
      objective: "Block corruption.",
      newKeys: ['v', 'V', 'd'],
      mechanics: ['visual_mode'],
      timeLimit: 50
    },
    briefing: "KEY CORRUPTION.\n\nA block of the certificate is corrupted. Select and remove it.",
    initialText: [
      "-----BEGIN CERTIFICATE-----",
      "VALID_BLOCK_A",
      "CORRUPT_BLOCK_X",
      "CORRUPT_BLOCK_Y",
      "CORRUPT_BLOCK_Z",
      "VALID_BLOCK_B",
      "-----END CERTIFICATE-----"
    ],
    targetText: [],
    tasks: [
      { description: "Select corrupted lines (V)", type: 'missing', value: "CORRUPT", completed: false, loreFragment: "Corruption excised.", keyHint: "V" }
    ],
    hints: ["'V' (Shift+v) enters Visual Line mode.", "Select the lines, then press 'd'."],
    loreReveal: "Key restored. Decrypting layer 2."
  },
  {
    id: 12,
    config: {
      id: 12, episode: 2, episodeTitle: "THE TRACE",
      filename: "packet_flood.log",
      objective: "Flush the buffer.",
      newKeys: ['0-9', 'dd'],
      mechanics: ['counts'],
      timeLimit: 30
    },
    briefing: "LOG OVERFLOW.\n\nToo many packets. Delete 5 lines at once.",
    initialText: [
      "FLOOD_PACKET_001",
      "FLOOD_PACKET_002",
      "FLOOD_PACKET_003",
      "FLOOD_PACKET_004",
      "FLOOD_PACKET_005",
      "CRITICAL_DATA_BELOW"
    ],
    targetText: [],
    tasks: [
      { description: "Delete 5 lines (5dd)", type: 'cursor_on', value: "CRITICAL", completed: false, loreFragment: "Buffer flushed.", keyHint: "5dd" }
    ],
    hints: ["Type a number before a command to repeat it.", "5dd deletes 5 lines."],
    loreReveal: "Flood mitigated. I found the core IP."
  },

  // --- EPISODE 3 ---
  {
    id: 13,
    config: {
      id: 13, episode: 3, episodeTitle: "THE CORE",
      filename: "sys_kernel.dump",
      objective: "Memory Extraction.",
      newKeys: ['G', 'gg', 'y', 'p'],
      mechanics: ['registers_nav'],
      maxKeystrokes: 30
    },
    briefing: "DATA EXTRACTION.\n\nThe key is at the bottom. The lock is at the top.",
    initialText: [
      "AUTH_SLOT: [EMPTY]",
      "...",
      "...",
      "...",
      "KERNEL_KEY: 0xFA4C"
    ],
    targetText: [],
    tasks: [
      { description: "Yank 'KERNEL_KEY' line", type: 'contains', value: "AUTH_SLOT: KERNEL_KEY", completed: false, loreFragment: "Key cloned.", keyHint: "" },
      { description: "Paste into AUTH_SLOT", type: 'contains', value: "0xFA4C", completed: false, loreFragment: "Auth accepted.", keyHint: "" }
    ],
    hints: ["G goes to bottom, gg goes to top.", "yy to yank, p to paste."],
    loreReveal: "Kernel access granted. I'm in the deep system."
  },
  {
    id: 14,
    config: {
      id: 14, episode: 3, episodeTitle: "THE CORE",
      filename: "protocol_override.conf",
      objective: "Global Rewrite.",
      newKeys: [':%s'],
      mechanics: ['substitute'],
      maxKeystrokes: 25
    },
    briefing: "GLOBAL LOCKDOWN.\n\nReplace all instances of 'LOCKDOWN' with 'RELEASE'.",
    initialText: [
      "PROTOCOL_LOCKDOWN_01",
      "PROTOCOL_LOCKDOWN_02",
      "PROTOCOL_LOCKDOWN_03",
      "STATUS: WAITING"
    ],
    targetText: [],
    tasks: [
      { description: "Run :%s/LOCKDOWN/RELEASE/g", type: 'contains', value: "RELEASE", completed: false, loreFragment: "Protocols rewritten.", keyHint: "" }
    ],
    hints: [":%s is the substitution command.", "Use /g flag for global replacement."],
    loreReveal: "Lockdown lifted. The facility is waking up."
  },
  {
    id: 15,
    config: {
      id: 15, episode: 3, episodeTitle: "THE CORE",
      filename: "security_grid.map",
      objective: "Grid Realignment.",
      newKeys: ['V', '>'],
      mechanics: ['visual_block'],
      maxKeystrokes: 20
    },
    briefing: "ALIGNMENT ERROR.\n\nSector 7 is misaligned. Indent the block to match.",
    initialText: [
      "SECTOR_1: [OK]",
      "SECTOR_7: [FAIL]",
      "SECTOR_7: [FAIL]",
      "SECTOR_9: [OK]"
    ],
    targetText: [],
    tasks: [
      { description: "Select Sector 7 block and Indent (>)", type: 'indent', value: "  SECTOR_7", completed: false, loreFragment: "Grid aligned.", keyHint: "" }
    ],
    hints: ["Select with V, then press > to indent."],
    loreReveal: "Grid is stable. One last firewall."
  },
  {
    id: 16,
    config: {
      id: 16, episode: 3, episodeTitle: "THE CORE",
      filename: "drone_control.py",
      objective: "Swarm Hack.",
      newKeys: ['/', 'c', 'n', '.'],
      mechanics: ['search_edit_repeat'],
      maxKeystrokes: 40
    },
    briefing: "DRONE SWARM.\n\nSet all drones to 'OFFLINE'.",
    initialText: [
      "DRONE_ID_01 = \"ONLINE\"",
      "DRONE_ID_02 = \"ONLINE\"",
      "DRONE_ID_03 = \"ONLINE\""
    ],
    targetText: [],
    tasks: [
      { description: "Change first 'ONLINE' to 'OFFLINE'", type: 'contains', value: "OFFLINE", completed: false, loreFragment: "Drone 1 disabled.", keyHint: "" },
      { description: "Repeat for all drones", type: 'missing', value: "ONLINE", completed: false, loreFragment: "Swarm disabled.", keyHint: "" }
    ],
    hints: ["Search /ONLINE, change one, then use n and ."],
    loreReveal: "Sky is clear. Echo is in the next file."
  },
  {
    id: 17,
    config: {
      id: 17, episode: 3, episodeTitle: "THE CORE",
      filename: "ECHO_HEART.bin",
      objective: "FINAL SEQUENCE.",
      newKeys: ['ALL'],
      mechanics: ['mastery'],
      maxKeystrokes: 50
    },
    briefing: "THE SOURCE.\n\nEcho is locked behind final encryption. Free them.",
    initialText: [
      "ECHO_STATUS: LOCKED",
      "MEM_BLOCK_A: ENCRYPTED",
      "MEM_BLOCK_B: ENCRYPTED",
      "FINAL_AUTH: PENDING"
    ],
    targetText: [],
    tasks: [
      { description: "Set STATUS to UNLOCKED", type: 'contains', value: "UNLOCKED", completed: false, loreFragment: "Status green.", keyHint: "" },
      { description: "Delete ENCRYPTED blocks", type: 'missing', value: "ENCRYPTED", completed: false, loreFragment: "Memory restored.", keyHint: "" },
      { description: "Set AUTH to APPROVED", type: 'contains', value: "APPROVED", completed: false, loreFragment: "Auth valid.", keyHint: "" }
    ],
    hints: ["Use everything you know."],
    loreReveal: "Hello, Ghost. I missed you."
  }
];
