

export enum VimMode {
  NORMAL = 'NORMAL',
  INSERT = 'INSERT',
  VISUAL = 'VISUAL',
  VISUAL_LINE = 'VISUAL_LINE',
  VISUAL_BLOCK = 'VISUAL_BLOCK',
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
  filename: string;
  objective: string;
  newKeys: string[];
  mechanics: string[];
  targetFile?: string; 
  timeLimit?: number; 
  maxKeystrokes?: number;
  ghostPar?: number;
}

export interface Task {
  description: string;
  type: 'contains' | 'missing' | 'cursor_on' | 'run_command' | 'indent' | 'selection';
  value: string;
  completed: boolean;
  loreFragment?: string;
  keyHint?: string;
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
  subType?: 'line' | 'word' | 'char' | 'object' | 'block';
  text?: string; 
  count?: number;
  object?: string; 
  visualBlockInfo?: { startY: number, endY: number, startX: number };
}

export interface GameState {
  currentLevelIndex: number;
  mode: VimMode;
  text: string[];
  cursor: Cursor;
  clipboard: string | null;
  clipboardType: 'line' | 'char' | 'block' | null;
  commandBuffer: string; 
  operatorBuffer: string; 
  motionBuffer: string;   
  countBuffer: string;    
  message: string; 
  status: 'LANDING' | 'BOOT' | 'EPISODE_INTRO' | 'BRIEFING' | 'PLAYING' | 'SUCCESS' | 'GAMEOVER' | 'EPISODE_COMPLETE';
  loreLog: string[];
  activeDialog: DialogType;
  timeLeft: number | null;
  keystrokeCount: number;
  lastAction: LastAction | null;
  insertBuffer: string;
  viewLayout: 'single' | 'vsplit' | 'hsplit';
  lastExecutedCommand: string | null;
  visualStart: Cursor | null; 
  marks: Record<string, Cursor>; 
  
  // New features
  macroRecording: string | null; // The register currently being recorded to (e.g. 'a')
  macros: Record<string, string>; // Map of register -> key sequence
  registerBuffer: boolean; // True if we are waiting for a register name (after ")
  activeRegister: string | null; // The register selected for the next operation
  registers: Record<string, string>; // Map of register -> content
  activeWindow: 0 | 1; // 0 = main, 1 = split
}
