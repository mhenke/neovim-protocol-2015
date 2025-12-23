
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
  // --- EPISODE 1: FOUNDATION ---
  {
    id: 1,
    config: {
      id: 1, episode: 1, episodeTitle: "THE BREACH",
      filename: "entry_log.txt",
      objective: "Navigation Signals.",
      newKeys: ['h', 'j', 'k', 'l', 'w', 'b', '0', '$'],
      mechanics: ['nav_basic'],
      ghostPar: 12
    },
    briefing: "CONNECTION ESTABLISHED.\n\nTrace the signal points in order: Status -> LOST -> ALPHA -> MISALIGNED.\n\nUse 'h j k l' to move. Use 'w' to jump words.",
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
        { description: "Move to 'Status'", type: 'cursor_on', value: "Status", completed: false, loreFragment: "Backdoor found.", keyHint: "j" },
        { description: "Move to 'LOST'", type: 'cursor_on', value: "LOST", completed: false, loreFragment: "Identity confirmed.", keyHint: "l" },
        { description: "Move to 'ALPHA'", type: 'cursor_on', value: "ALPHA", completed: false, loreFragment: "Origin traced.", keyHint: "j, l" },
        { description: "Move to '[MISALIGNED]'", type: 'cursor_on', value: "[MISALIGNED]", completed: false, loreFragment: "Signal locked.", keyHint: "k, w" }
    ],
    hints: ["Use 'j' to go down, 'k' to go up.", "Use 'w' to jump forward by words."],
    loreReveal: "Signal Lock Established. Ready for injection."
  },
  {
    id: 2,
    config: {
      id: 2, episode: 1, episodeTitle: "THE BREACH",
      filename: "admin_creds.conf",
      objective: "Injection.",
      newKeys: ['i', 'a', 'o', 'A', 'Esc'],
      mechanics: ['insert_mode'],
      ghostPar: 18
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
      objective: "Data Transfer.",
      newKeys: ['dd', 'y', 'p', 'u'],
      mechanics: ['clipboard_basics'],
      ghostPar: 8
    },
    briefing: "DATA TRANSFER.\n\nPurge the corruption, but steal the encryption key first.\n\n1. Delete the [CORRUPT] line.\n2. Yank (copy) the KEY line.\n3. Paste it into the EMPTY slot.",
    initialText: [
      "[CORRUPT] SYSTEM_FAULT_009",
      "KEY: 0x8892_ALPHA",
      "SLOT: [EMPTY]"
    ],
    targetText: [],
    tasks: [
      { description: "Delete corrupt line (dd)", type: 'missing', value: "CORRUPT", completed: false, loreFragment: "Corruption purged.", keyHint: "dd" },
      { description: "Yank the KEY line (yy)", type: 'run_command', value: "yy", completed: false, loreFragment: "Key copied.", keyHint: "yy" },
      { description: "Paste into SLOT (p)", type: 'contains', value: "SLOT: KEY", completed: false, loreFragment: "Key injected.", keyHint: "p" }
    ],
    hints: ["'dd' deletes (cuts) a line.", "'yy' yanks (copies) a line.", "'p' puts (pastes) after cursor."],
    loreReveal: "Transfer complete. Encryption broken."
  },
  {
    id: 4,
    config: {
      id: 4, episode: 1, episodeTitle: "THE BREACH",
      filename: "network_map.xml",
      objective: "Sector Scan.",
      newKeys: ['/', 'n', 'N', '<C-d>'],
      mechanics: ['search_scroll'],
      ghostPar: 6
    },
    briefing: "SECTOR SCAN.\n\nThe map is vast. Use 'Ctrl+d' to scroll down, then search for the R&D Hub.",
    initialText: [
      "<root>",
      "  <sector id='01'>SAFE</sector>",
      "  <sector id='02'>SAFE</sector>",
      "  <sector id='03'>SAFE</sector>",
      "  <sector id='04'>SAFE</sector>",
      "  <sector id='05'>SAFE</sector>",
      "  <sector id='06'>SAFE</sector>",
      "  <sector id='07'>SAFE</sector>",
      "  <sector id='08'>SAFE</sector>",
      "  <sector id='09'>SAFE</sector>",
      "  <sector id='10'>R&D_HUB</sector>",
      "</root>"
    ],
    targetText: [],
    tasks: [
      { description: "Scroll down (<C-d>)", type: 'run_command', value: "<C-d>", completed: false, loreFragment: "Visual range extended.", keyHint: "<C-d>" },
      { description: "Search for 'R&D' (/R&D)", type: 'cursor_on', value: "R&D", completed: false, loreFragment: "Hub located.", keyHint: "/" }
    ],
    hints: ["Ctrl+d scrolls down half a page.", "Type '/' followed by search term."],
    loreReveal: "R&D is physically isolated. I need a bridge."
  },
  {
    id: 5,
    config: {
      id: 5, episode: 1, episodeTitle: "THE BREACH",
      filename: "exfiltration_script.sh",
      objective: "Commit Sequence.",
      newKeys: [':w', ':q'],
      mechanics: ['command_mode'],
      ghostPar: 13
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