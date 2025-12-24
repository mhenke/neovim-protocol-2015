export enum VimMode {
  NORMAL = 'NORMAL',
  INSERT = 'INSERT',
  VISUAL = 'VISUAL',
  VISUAL_LINE = 'VISUAL_LINE',
  COMMAND = 'COMMAND'
}

export interface Cursor {
  x: number;
  y: number;
}

export interface LevelConfig {
  id: number;
  episode: number;
  episodeTitle: string;
  filename: string; // e.g. "syslog.conf"
  objective: string;
  newKeys: string[];
  mechanics: string[];
  targetFile?: string; // For :e command mechanic
  timeLimit?: number; // Seconds (Episode 2)
  maxKeystrokes?: number; // Count (Episode 3)
  idealKeystrokes?: number; // For "Ghost" par score
}

export type TaskType = 'contains' | 'missing' | 'cursor_on' | 'run_command' | 'command_and_cursor_on' | 'sequence' | 'verify_key_sequence';

export interface Task {
  description: string;
  type: TaskType;
  value?: string | string[];
  command?: string | string[];
  subTasks?: SubTask[];
  currentStep?: number;
  completed: boolean;
  loreFragment?: string; // Optional narrative reward for completing specific task
  keyHint?: string; // Short key combo hint e.g. "ciw" or "j/k"
  expectedKeySequence?: string[]; // NEW: Expected sequence of keys for 'verify_key_sequence' type
}

export interface SubTask extends Task {
  subTasks?: never; // Subtasks do not have subtasks themselves
}

export interface Level {
  id: number;
  config: LevelConfig;
  briefing: string;
  initialText: string[];
  targetText: string[] | ((currentText: string[]) => boolean); 
  tasks: Task[];
  hints: string[];
  loreReveal: string;
}

export type DialogType = 'NONE' | 'HELP' | 'MAP' | 'HINTS';

export interface LastAction {
  type: 'delete' | 'change' | 'indent' | 'insert';
  subType?: 'line' | 'word' | 'char' | 'object';
  text?: string; // For insert/change
  count?: number;
  object?: string; // for text objects
}

export interface GameState {
  currentLevelIndex: number;
  mode: VimMode;
  text: string[];
  cursor: Cursor;
  clipboard: string | null; // Register "
  clipboardType: 'line' | 'char' | null;
  commandBuffer: string; 
  operatorBuffer: string; // Pending operator (d, c, y)
  motionBuffer: string;   // Pending motion numbers (e.g. '2' in '2w') or chars (e.g. 'f')
  countBuffer: string;    // Numeric prefix (e.g. '5' in '5j')
  message: string; 
  status: 'LANDING' | 'BOOT' | 'EPISODE_INTRO' | 'BRIEFING' | 'PLAYING' | 'SUCCESS' | 'GAMEOVER' | 'EPISODE_COMPLETE';
  loreLog: string[];
  activeDialog: DialogType;
  // Mechanics
  timeLeft: number | null;
  keystrokeCount: number;
  lastAction: LastAction | null; // For Dot command
  insertBuffer: string; // Track text typed during current insert session
  viewLayout: 'single' | 'vsplit' | 'hsplit';
  lastExecutedCommand: string | null; // To validate run_command tasks
  commandHistory: string[]; // NEW: Stores recent key presses for sequence verification
}

export interface GeminiLevelResponse {
  briefing: string;
  initialText: string[];
  targetText: string[];
  loreReveal: string;
  hints: string[];
  tasks: Array<{
    description: string,
    type: 'contains' | 'missing' | 'cursor_on' | 'run_command' | 'command_and_cursor_on' | 'sequence' | 'verify_key_sequence', // Updated TaskType
    value?: string | string[],
    command?: string | string[],
    subTasks?: Task[],
    loreFragment: string,
    keyHint?: string,
    expectedKeySequence?: string[]; // NEW: Expected sequence of keys
  }>;
}