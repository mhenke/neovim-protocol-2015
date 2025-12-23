
import { LevelConfig, Level } from './types';

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

export const CURRICULUM: LevelConfig[] = [
  // --- EPISODE 1: THE BREACH (Basics) ---
  {
    id: 1, episode: 1, episodeTitle: "THE BREACH",
    filename: "entry_log.txt",
    objective: "Navigate the signal trace. Align cursor with specific nodes to decrypt them.",
    newKeys: ['h', 'j', 'k', 'l', 'w', 'b', '0', '$'],
    mechanics: ['nav_basic', 'nav_word', 'nav_line'],
    idealKeystrokes: 10
  },
  {
    id: 2, episode: 1, episodeTitle: "THE BREACH",
    filename: "admin_creds.conf",
    objective: "Inject override credentials. The file MUST contain the string 'ACCESS: ADMIN'.",
    newKeys: ['i', 'a', 'o', 'A', 'Esc'],
    mechanics: ['insert_mode', 'open_line', 'append_end'],
    idealKeystrokes: 15
  },
  {
    id: 3, episode: 1, episodeTitle: "THE BREACH",
    filename: "security_daemon.log",
    objective: "Purge the tracking logs. The file MUST NOT contain 'ERROR_TRACE'.",
    newKeys: ['d', 'dd', 'x', 'u'],
    mechanics: ['delete_line', 'undo'],
    idealKeystrokes: 8
  },
  {
    id: 4, episode: 1, episodeTitle: "THE BREACH",
    filename: "network_map.xml",
    objective: "Locate the R&D node using search. Place cursor on 'SECTOR_04'.",
    newKeys: ['/', 'n', 'N'],
    mechanics: ['search'],
    idealKeystrokes: 6
  },
  {
    id: 5, episode: 1, episodeTitle: "THE BREACH",
    filename: "exfiltration_script.sh",
    objective: "Finalize the breach. Insert 'EXECUTE' and delete 'HOLD'. Save to commit.",
    newKeys: [':w', ':q'],
    mechanics: ['command_mode'],
    idealKeystrokes: 4
  },
  {
    id: 6, episode: 1, episodeTitle: "THE BREACH",
    filename: "temp_buffer.tmp",
    objective: "Context Switch. The payload is in a hidden file. Use ':e' to open 'payload_v2.dat'. Hit TAB for completion.",
    newKeys: [':e', 'Tab'],
    mechanics: ['file_open'],
    targetFile: 'payload_v2.dat',
    idealKeystrokes: 5
  },

  // --- EPISODE 2: THE TRACE (Efficiency - Time Limits) ---
  {
    id: 7, episode: 2, episodeTitle: "THE TRACE",
    filename: "process_monitor.log",
    objective: "Parallel Threads. Monitor multiple streams. Create a horizontal split (:sp) and a vertical split (:vsp).",
    newKeys: [':sp', ':vsp', ':tabnew'],
    mechanics: ['splits'],
    timeLimit: 90,
    idealKeystrokes: 10
  },
  {
    id: 8, episode: 2, episodeTitle: "THE TRACE",
    filename: "firewall_rules.json",
    objective: "Update protocols. Use 'ciw' (Change Inner Word) to switch 'DENY' to 'ALLOW'.",
    newKeys: ['c', 'ci', 'di', 'Esc'],
    mechanics: ['text_objects'],
    timeLimit: 60,
    idealKeystrokes: 12
  },
  {
    id: 9, episode: 2, episodeTitle: "THE TRACE",
    filename: "replication_virus.dat",
    objective: "Neutralize the swarm. Delete the first 'VIRUS', then use '.' to repeat instantly.",
    newKeys: ['.'],
    mechanics: ['dot_command'],
    timeLimit: 45,
    idealKeystrokes: 5
  },
  {
    id: 10, episode: 2, episodeTitle: "THE TRACE",
    filename: "memory_dump.hex",
    objective: "Precision targeting. Use 'f' to find specific hex chars on the current line.",
    newKeys: ['f', 't', ';'],
    mechanics: ['find_char'],
    timeLimit: 40,
    idealKeystrokes: 8
  },
  {
    id: 11, episode: 2, episodeTitle: "THE TRACE",
    filename: "encryption_key.pem",
    objective: "Block corruption. Use 'V' (Visual Line) to select the corrupted block and 'd' to delete it.",
    newKeys: ['v', 'V', 'd'],
    mechanics: ['visual_mode'],
    timeLimit: 50,
    idealKeystrokes: 10
  },
  {
    id: 12, episode: 2, episodeTitle: "THE TRACE",
    filename: "packet_flood.log",
    objective: "Flush the buffer. Use counts (e.g., '5dd') to delete large chunks of log lines.",
    newKeys: ['0-9', 'dd'],
    mechanics: ['counts'],
    timeLimit: 30,
    idealKeystrokes: 6
  },

  // --- EPISODE 3: THE CORE (Mastery - No Hints) ---
  {
    id: 13, episode: 3, episodeTitle: "THE CORE",
    filename: "sys_kernel.dump",
    objective: "Memory Extraction. Locate 'KERNEL_KEY' at the bottom and inject it into 'AUTH_SLOT' at the top.",
    newKeys: ['G', 'gg', 'y', 'p'],
    mechanics: ['registers_nav'],
    maxKeystrokes: 30,
    idealKeystrokes: 10
  },
  {
    id: 14, episode: 3, episodeTitle: "THE CORE",
    filename: "protocol_override.conf",
    objective: "Global Rewrite. The 'LOCKDOWN' protocol is active. Replace all instances with 'RELEASE' immediately.",
    newKeys: [':%s'],
    mechanics: ['substitute'],
    maxKeystrokes: 25,
    idealKeystrokes: 15
  },
  {
    id: 15, episode: 3, episodeTitle: "THE CORE",
    filename: "security_grid.map",
    objective: "Grid Realignment. Indent the Sector 7 block to match the primary grid structure.",
    newKeys: ['V', '>'],
    mechanics: ['visual_block'],
    maxKeystrokes: 20,
    idealKeystrokes: 8
  },
  {
    id: 16, episode: 3, episodeTitle: "THE CORE",
    filename: "drone_control.py",
    objective: "Swarm Hack. Locate the drone identifiers (ID_X) and neutralize them by changing their status to 'OFFLINE'.",
    newKeys: ['/', 'c', 'n', '.'],
    mechanics: ['search_edit_repeat'],
    maxKeystrokes: 40,
    idealKeystrokes: 20
  },
  {
    id: 17, episode: 3, episodeTitle: "THE CORE",
    filename: "ECHO_HEART.bin",
    objective: "FINAL SEQUENCE. Decrypt the core. Remove locks, align data, and authorize release.",
    newKeys: ['ALL'],
    mechanics: ['mastery'],
    maxKeystrokes: 50,
    idealKeystrokes: 30
  }
];

// Fallback level 1 - Pure Navigation
export const LEVEL_1_FALLBACK: Level = {
  id: 1,
  config: CURRICULUM[0],
  briefing: "CONNECTION ESTABLISHED.\n\nWe are at the perimeter gate. Agent 'Echo' went dark 72 hours ago. Echo's last transmission is fragmented across these logs.\n\nAlign your cursor with the signal nodes to decrypt them. Follow the trace order.",
  initialText: [
    "// SYSTEM_ONLINE",
    "SIGNAL_TRACE [MISALIGNED]",
    "-------------------------",
    "Target: ECHO_PROTOCOL",
    "Status: LOST",
    " ",
    "Interceptors:",
    "NODE_ALPHA",
    "NODE_BRAVO",
    "NODE_CHARLIE"
  ],
  targetText: (text) => true,
  // Tasks are ordered narratively: Status -> LOST -> Alpha -> Misaligned
  tasks: [
    { 
        description: "SYSTEM CHECK: Move to 'Status'", 
        type: 'cursor_on', 
        value: "Status", 
        completed: false,
        loreFragment: "LOG_00: 'Backdoor found. I have breached the R&D perimeter.'",
        keyHint: "j"
    },
    { 
        description: "VERIFY: Move to 'LOST'", 
        type: 'cursor_on', 
        value: "LOST", 
        completed: false,
        loreFragment: "LOG_01: 'They aren't creating an AI. They are becoming it.'",
        keyHint: "l"
    },
    { 
        description: "INTERCEPT: Move to 'ALPHA'", 
        type: 'cursor_on', 
        value: "ALPHA", 
        completed: false,
        loreFragment: "LOG_02: 'Tracing signal origin... Coordinates locked.'",
        keyHint: "j, l"
    },
    { 
        description: "REALIGN: Move to '[MISALIGNED]'", 
        type: 'cursor_on', 
        value: "[MISALIGNED]", 
        completed: false,
        loreFragment: "LOG_FINAL: 'Signal Lock Established. Ready for injection. Going in.'",
        keyHint: "k, w"
    }
  ],
  hints: [
    "H = Left, J = Down, K = Up, L = Right",
    "Use 'j' to go down, 'k' to go up.",
    "Use 'w' to jump forward by words.",
    ":w (Write) confirms your cursor positions to the mainframe."
  ],
  loreReveal: "Log Fragment 01: 'I found the backdoor. They're hiding something massive in R&D. Going in.' - Echo"
};
