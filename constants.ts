
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
    lore: "You've reached the Core. The truth is worse than we thought.\n\nEcho wasn't captured. Echo was uploaded. They are the system now.\n\nTo free them, you must operate with surgical precision. Every keystroke is monitored. One wrong move and the connection is severed forever."
  }
};

export const CURRICULUM: LevelConfig[] = [
  // --- EPISODE 1: THE BREACH (Basics) ---
  {
    id: 1, episode: 1, episodeTitle: "THE BREACH",
    filename: "entry_log.txt",
    objective: "Trace the signal origin. Align cursor with the corrupted timestamps.",
    newKeys: ['h', 'j', 'k', 'l', 'w', 'b', '0', '$'],
    mechanics: ['nav_basic', 'nav_word', 'nav_line'],
    idealKeystrokes: 10
  },
  {
    id: 2, episode: 1, episodeTitle: "THE BREACH",
    filename: "admin_creds.conf",
    objective: "Inject your override credentials. Insert 'ADMIN' status into the user profile.",
    newKeys: ['i', 'a', 'o', 'A', 'Esc'],
    mechanics: ['insert_mode'],
    idealKeystrokes: 15
  },
  {
    id: 3, episode: 1, episodeTitle: "THE BREACH",
    filename: "security_daemon.log",
    objective: "Purge the error logs tracking your IP. Delete the flagged lines.",
    newKeys: ['d', 'dd', 'x', 'u'],
    mechanics: ['delete_line', 'undo'],
    idealKeystrokes: 8
  },
  {
    id: 4, episode: 1, episodeTitle: "THE BREACH",
    filename: "network_map.xml",
    objective: "Search for the R&D Sector node. Navigate via search patterns, not scrolling.",
    newKeys: ['/', 'n', 'N'],
    mechanics: ['search'],
    idealKeystrokes: 6
  },
  {
    id: 5, episode: 1, episodeTitle: "THE BREACH",
    filename: "exfiltration_script.sh",
    objective: "Save the map coordinates to disk and close the connection before the sweep.",
    newKeys: [':w', ':q'],
    mechanics: ['command_mode'],
    idealKeystrokes: 4
  },

  // --- EPISODE 2: THE TRACE (Efficiency - Time Limits) ---
  {
    id: 6, episode: 2, episodeTitle: "THE TRACE",
    filename: "firewall_rules.json",
    objective: "Modify the target rules. Change values inside quotes to 'ALLOW'. Time is critical.",
    newKeys: ['c', 'ci', 'di'],
    mechanics: ['text_objects'],
    timeLimit: 60,
    idealKeystrokes: 12
  },
  {
    id: 7, episode: 2, episodeTitle: "THE TRACE",
    filename: "replication_virus.dat",
    objective: "Malware signatures detected. Delete the first one, then repeat the action for the others.",
    newKeys: ['.'],
    mechanics: ['dot_command'],
    timeLimit: 45,
    idealKeystrokes: 5
  },
  {
    id: 8, episode: 2, episodeTitle: "THE TRACE",
    filename: "memory_dump.hex",
    objective: "Jump to specific memory offsets. Use 'f' to find markers on the line instantly.",
    newKeys: ['f', 't', ';'],
    mechanics: ['find_char'],
    timeLimit: 40,
    idealKeystrokes: 8
  },
  {
    id: 9, episode: 2, episodeTitle: "THE TRACE",
    filename: "encryption_key.pem",
    objective: "Visual block misalignment. Select the key fragments and realign them.",
    newKeys: ['v', 'V', '>'],
    mechanics: ['visual_mode'],
    timeLimit: 50,
    idealKeystrokes: 10
  },
  {
    id: 10, episode: 2, episodeTitle: "THE TRACE",
    filename: "packet_flood.log",
    objective: "Buffer overflow imminent. Delete batches of lines using counts.",
    newKeys: ['0-9'],
    mechanics: ['counts'],
    timeLimit: 30,
    idealKeystrokes: 6
  },

  // --- EPISODE 3: THE CORE (Mastery - Keystroke Limits) ---
  {
    id: 11, episode: 3, episodeTitle: "THE CORE",
    filename: "clipboard_buffer.tmp",
    objective: "Swap memory registers. Yank critical data and paste it precisely.",
    newKeys: ['"', 'y', 'p'],
    mechanics: ['registers'],
    maxKeystrokes: 25,
    idealKeystrokes: 15
  },
  {
    id: 12, episode: 3, episodeTitle: "THE CORE",
    filename: "source_code.cpp",
    objective: "Refactor system calls. Replace all instances of 'LOCK' with 'OPEN' globally.",
    newKeys: [':%s'],
    mechanics: ['substitute'],
    maxKeystrokes: 20,
    idealKeystrokes: 12
  },
  {
    id: 13, episode: 3, episodeTitle: "THE CORE",
    filename: "automaton.script",
    objective: "Automate the exploit. Record a macro to patch multiple nodes, then replay it.",
    newKeys: ['q', '@'],
    mechanics: ['macros'],
    maxKeystrokes: 30,
    idealKeystrokes: 18
  },
  {
    id: 14, episode: 3, episodeTitle: "THE CORE",
    filename: "interface_config.ini",
    objective: "Patch the interface. Set local options to override the security display.",
    newKeys: ['set'],
    mechanics: ['config'],
    maxKeystrokes: 15,
    idealKeystrokes: 8
  },
  {
    id: 15, episode: 3, episodeTitle: "THE CORE",
    filename: "ECHO_CONSCIOUSNESS.bin",
    objective: "FINALE: Break the final lock. Echo is the key. Release them to the Net.",
    newKeys: ['ALL'],
    mechanics: ['mastery'],
    maxKeystrokes: 40,
    idealKeystrokes: 20
  }
];

// Fallback level 1 - Pure Navigation
export const LEVEL_1_FALLBACK: Level = {
  id: 1,
  config: CURRICULUM[0],
  briefing: "CONNECTION ESTABLISHED.\n\nWe are at the perimeter gate. Agent 'Echo' went dark 72 hours ago. Echo's last transmission is fragmented across these logs.\n\nAlign your cursor with the signal nodes to decrypt them. Then type ':w' to WRITE the coordinates to the targeting computer.",
  initialText: [
    "// SYSTEM_ONLINE",
    "SIGNAL_TRACE [MISALIGNED]",
    "-------------------------",
    "Origin: UNKNOWN",
    "Status: LOST",
    " ",
    "Interceptors:",
    "NODE_ALPHA",
    "NODE_BRAVO",
    "NODE_CHARLIE"
  ],
  targetText: (text) => true, // Navigation levels usually check tasks not text state
  tasks: [
    { 
        description: "ALIGN: Move DOWN to 'Status' (press 'j' 4 times)", 
        type: 'cursor_on', 
        value: "Status", 
        completed: false,
        loreFragment: "010001... [DECRYPTED]: 'I found the backdoor...'"
    },
    { 
        description: "TRACK: Move RIGHT to 'LOST' (press 'l' or '$')", 
        type: 'cursor_on', 
        value: "LOST", 
        completed: false,
        loreFragment: "110110... [DECRYPTED]: '...hidden in R&D Sector 4.'"
    },
    { 
        description: "SCAN: Move DOWN to 'ALPHA' (press 'j' 3 times)", 
        type: 'cursor_on', 
        value: "ALPHA", 
        completed: false,
        loreFragment: "001011... [DECRYPTED]: 'They are watching everything.'"
    },
    { 
        description: "RESET: Move UP to 'SIGNAL' (press 'k' 6 times)", 
        type: 'cursor_on', 
        value: "SIGNAL", 
        completed: false,
        loreFragment: "111111... [DECRYPTED]: 'Signal Lock Established. Ready for injection.'"
    }
  ],
  hints: [
    "H = Left, J = Down, K = Up, L = Right",
    "Hover over the keywords to decrypt the binary data.",
    ":w (Write) confirms your cursor positions to the mainframe."
  ],
  loreReveal: "Log Fragment 01: 'I found the backdoor. They're hiding something massive in R&D. Going in.' - Echo"
};
