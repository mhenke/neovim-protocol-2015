

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
  timeLimit?: number; // Seconds (Episode 2)
  maxKeystrokes?: number; // Count (Episode 3)
  idealKeystrokes?: number; // For "Ghost" par score
}

export interface Task {
  description: string;
  type: 'contains' | 'missing' | 'cursor_on';
  value: string;
  completed: boolean;
  loreFragment?: string; // Optional narrative reward for completing specific task
  keyHint?: string; // Short key combo hint e.g. "ciw" or "j/k"
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
  // New Mechanics
  timeLeft: number | null;
  keystrokeCount: number;
  lastAction: LastAction | null; // For Dot command
  insertBuffer: string; // Track text typed during current insert session
}

export interface GeminiLevelResponse {
  briefing: string;
  initialText: string[];
  targetText: string[];
  loreReveal: string;
  hints: string[];
  tasks: Array<{ 
    description: string, 
    type: 'contains' | 'missing' | 'cursor_on', 
    value: string, 
    loreFragment: string,
    keyHint?: string 
  }>;
}
