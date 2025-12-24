
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
  // --- EPISODE 1: THE BREACH (Foundation) ---
  {
    id: 1, episode: 1, episodeTitle: "THE BREACH",
    filename: "signal_trace.log",
    objective: "Decrypt network traffic by navigating signal patterns using h, j, k, l, w, b, 0, $, gg, and G.",
    newKeys: ['h', 'j', 'k', 'l', 'w', 'b', '0', '$', 'gg', 'G'],
    mechanics: ['nav_basic', 'nav_word', 'nav_line', 'nav_file'],
    idealKeystrokes: 15
  },
  {
    id: 2, episode: 1, episodeTitle: "THE BREACH",
    filename: "sector_map.xml",
    objective: "Inject false coordinates into the sector mapping system using i, a, o, O, A, I, and Esc.",
    newKeys: ['i', 'a', 'o', 'O', 'A', 'I', 'Esc'],
    mechanics: ['insert_mode', 'append_mode', 'open_line'],
    idealKeystrokes: 20
  },
  {
    id: 3, episode: 1, episodeTitle: "THE BREACH",
    filename: "security_router.conf",
    objective: "Disable security protocols by editing configuration values using x, r, cw, ciw, and C.",
    newKeys: ['x', 'r', 'cw', 'ciw', 'C'],
    mechanics: ['delete_char', 'replace_char', 'change_word', 'change_inner_word', 'change_to_line_end'],
    idealKeystrokes: 12
  },
  {
    id: 4, episode: 1, episodeTitle: "THE BREACH",
    filename: "access_log_ECHO-7.purged",
    objective: "Purge compromised log entries and duplicate clean ones using dd, D, yy, p, P, u, and Ctrl+r.",
    newKeys: ['dd', 'D', 'yy', 'p', 'P', 'u', 'Ctrl+r'],
    mechanics: ['delete_line', 'yank_line', 'paste', 'undo', 'redo'],
    idealKeystrokes: 25
  },
  {
    id: 5, episode: 1, episodeTitle: "THE BREACH",
    filename: "exfiltration.sh",
    objective: "Save the backdoor script and open multiple files for data extraction using :w, :q, :wq, :q!, :e, :ls, :bn, and :bp.",
    newKeys: [':w', ':q', ':wq', ':q!', ':e filename', ':ls', ':bn', ':bp'],
    mechanics: ['command_mode', 'file_management', 'buffer_management'],
    idealKeystrokes: 18
  },

  // --- EPISODE 2: THE TRACE (Efficiency) ---
  {
    id: 6, episode: 2, episodeTitle: "THE TRACE",
    filename: "firewall_rules.json",
    objective: "Modify firewall rules without breaking JSON structure using text objects like ci\", ci{, and diw.",
    newKeys: ['ci"', "ci'", 'ci(', 'ci{', 'ci[', 'cit', 'diw', 'daw'],
    mechanics: ['text_objects'],
    timeLimit: 120,
    idealKeystrokes: 20
  },
  {
    id: 7, episode: 2, episodeTitle: "THE TRACE",
    filename: "packet_stream.dat",
    objective: "Search and navigate through encrypted packet data using /, ?, n, N, *, #, and :nohl.",
    newKeys: ['/pattern', '?pattern', 'n', 'N', '*', '#', ':nohl'],
    mechanics: ['search', 'search_word'],
    timeLimit: 90,
    idealKeystrokes: 15
  },
  {
    id: 8, episode: 2, episodeTitle: "THE TRACE",
    filename: "blockchain_ledger.dat",
    objective: "Extract and manipulate transaction blocks visually using v, V, Ctrl+v, d, y, >, and <.",
    newKeys: ['v', 'V', 'Ctrl+v', 'd', 'y', '>', '<'],
    mechanics: ['visual_mode', 'visual_line_mode', 'visual_block_mode', 'indent'],
    timeLimit: 100,
    idealKeystrokes: 22
  },
  {
    id: 9, episode: 2, episodeTitle: "THE TRACE",
    filename: "neural_net.py",
    objective: "Fix corrupted neural network code with precision targeting using f, t, F, T, ;, ,, and %.",
    newKeys: ['f', 't', 'F', 'T', ';', ',', '%'],
    mechanics: ['find_char', 'match_bracket'],
    timeLimit: 80,
    idealKeystrokes: 18
  },
  {
    id: 10, episode: 2, episodeTitle: "THE TRACE",
    filename: "config_array.ini",
    objective: "Fix repeated configuration errors efficiently using the . command and counts with operators (e.g., 5j, 3dd).",
    newKeys: ['.', '5j', '3dd', '2yy'],
    mechanics: ['dot_command', 'counts'],
    timeLimit: 60,
    idealKeystrokes: 10
  },

  // --- EPISODE 3: THE CORE (Mastery) ---
  {
    id: 11, episode: 3, episodeTitle: "THE CORE",
    filename: "code_analysis.cpp",
    objective: "Analyze and refactor C++ codebase across multiple windows using :sp, :vsp, Ctrl+w, and scroll with Ctrl+u/d.",
    newKeys: [':sp', ':vsp', 'Ctrl+w h/j/k/l', 'Ctrl+w c', 'Ctrl+u', 'Ctrl+d'],
    mechanics: ['splits', 'window_navigation', 'scrolling'],
    maxKeystrokes: 40,
    idealKeystrokes: 25
  },
  {
    id: 12, episode: 3, episodeTitle: "THE CORE",
    filename: "quantum_state.sys",
    objective: "Mark quantum states and navigate between entangled positions using marks (ma, 'a) and the jump list (Ctrl+o, Ctrl+i).",
    newKeys: ['ma', "'a", "``a``", 'Ctrl+o', 'Ctrl+i'],
    mechanics: ['marks', 'jump_list'],
    maxKeystrokes: 35,
    idealKeystrokes: 20
  },
  {
    id: 13, episode: 3, episodeTitle: "THE CORE",
    filename: "source_code.js",
    objective: "Indent and format corrupted source code using >>, <<, ==, gg=G, and join lines with J/gJ.",
    newKeys: ['>>', '<<', '==', 'gg=G', 'J', 'gJ'],
    mechanics: ['indent', 'auto_indent', 'join_lines'],
    maxKeystrokes: 30,
    idealKeystrokes: 15
  },
  {
    id: 14, episode: 3, episodeTitle: "THE CORE",
    filename: "reality.sys",
    objective: "Rewrite reality itself through mass find-and-replace using :s, :%s, and the & command.",
    newKeys: [':s/old/new/g', ':%s/old/new/g', ':%s/old/new/gc', '&'],
    mechanics: ['substitute'],
    maxKeystrokes: 25,
    idealKeystrokes: 15
  },
  {
    id: 15, episode: 3, episodeTitle: "THE CORE",
    filename: "FINAL_GATE.lock",
    objective: "The final barrier requires mastery of all techniques combined. Navigate splits, search/replace, use marks, text objects, visual block, format code, and use counts and dot command.",
    newKeys: ['ALL'],
    mechanics: ['mastery'],
    maxKeystrokes: 60,
    idealKeystrokes: 40
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
