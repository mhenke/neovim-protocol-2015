
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, VimMode, Level, LevelConfig, Task, DialogType, LastAction } from './types';
import { CURRICULUM, INITIAL_LORE, LEVEL_1_FALLBACK, EPISODE_CONTEXT } from './constants';
import { generateLevel } from './services/geminiService';
import * as fs from './utils/fsHelpers';

// --- Utility Components ---

const GlitchText = ({ text, as = 'span', className = '' }: { text: string, as?: any, className?: string }) => {
  const Component = as;
  return (
    <Component className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-[1px] text-red-500 opacity-70 animate-pulse hidden sm:block pointer-events-none" style={{clipPath: 'inset(0 0 60% 0)'}} aria-hidden="true">{text}</span>
      <span className="absolute top-0 left-0 ml-[1px] text-cyan-500 opacity-70 animate-pulse hidden sm:block pointer-events-none" style={{clipPath: 'inset(40% 0 0 0)'}} aria-hidden="true">{text}</span>
    </Component>
  );
};

const Modal = ({ title, children, onClose }: { title: string, children?: React.ReactNode, onClose: () => void }) => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
        <div className="bg-[#0a0a0a] border-2 border-[#33ff00] w-[800px] max-w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-[0_0_30px_rgba(51,255,0,0.2)]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
                <GlitchText text={title} className="text-2xl font-bold text-[#33ff00] tracking-widest" />
                <button onClick={onClose} className="text-gray-500 hover:text-white hover:bg-red-900/50 px-2 py-1">[ESC] CLOSE</button>
            </div>
            <div className="text-gray-300">
                {children}
            </div>
        </div>
    </div>
);

// --- New Screen Components ---

const LandingScreen = ({ onStart }: { onStart: () => void }) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onStart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStart]);

  useEffect(() => {
      // Animation Logic for Lore
      let timeoutIds: any[] = [];
      let cumulativeTime = 0;

      INITIAL_LORE.forEach((line, index) => {
          // Add dramatic pauses for decoding/separators
          const delay = line.includes('...') || line.includes('---') ? 800 : 400;
          
          const id = setTimeout(() => {
              setTerminalLines(prev => [...prev, line]);
              if (index === INITIAL_LORE.length - 1) setIsComplete(true);
          }, cumulativeTime);
          
          timeoutIds.push(id);
          cumulativeTime += delay;
      });

      return () => timeoutIds.forEach(clearTimeout);
  }, []);

  // Auto-scroll
  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }, [terminalLines]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono relative overflow-hidden text-center p-8">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="z-10 relative w-full max-w-3xl flex flex-col items-center">
        <div className="mb-6">
          <GlitchText text="NEOVIM PROTOCOL: 2015" className="text-4xl md:text-6xl font-bold text-[#33ff00] tracking-tighter" />
          <div className="text-gray-500 text-sm mt-4 tracking-[0.5em] uppercase animate-pulse">
            System Breach Detected // User: Ghost
          </div>
        </div>

        {/* Introduction Context */}
        <div className="text-gray-400 text-sm leading-relaxed max-w-xl mb-6">
          <p>
            The year is 2015. Aethelgard Biologics has scrubbed their servers. 
            The mouse is disabled. The GUI is gone.
          </p>
        </div>

        {/* Terminal Output */}
        <div 
            ref={scrollRef}
            className="w-full bg-black/90 border border-[#33ff00]/30 p-6 font-mono text-sm text-left shadow-[0_0_30px_rgba(51,255,0,0.1)] mb-8 h-64 overflow-y-auto rounded-sm backdrop-blur-sm"
        >
            {terminalLines.map((line, i) => (
                <div key={i} className="mb-2 leading-relaxed text-[#33ff00] animate-fadeIn break-words border-l-2 border-transparent hover:border-[#33ff00] pl-2 transition-colors">
                    <span className="opacity-50 mr-3 select-none">&gt;</span>
                    {line}
                </div>
            ))}
            {!isComplete && (
                <div className="animate-pulse bg-[#33ff00] w-2 h-4 inline-block ml-4"></div>
            )}
            {isComplete && (
                 <div className="mt-4 text-gray-500 text-xs text-center animate-pulse">
                    -- END OF TRANSMISSION --
                 </div>
            )}
        </div>

        <div className="pt-2">
          <button 
            onClick={onStart}
            className="group relative px-12 py-4 bg-[#33ff00] text-black font-bold text-xl tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(51,255,0,0.4)]"
          >
            <span className="absolute inset-0 border-2 border-[#33ff00] translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></span>
            INITIALIZE UPLINK
          </button>
          <div className="mt-6 text-xs text-gray-600 animate-pulse">
            [ PRESS ENTER TO START ]
          </div>
        </div>
      </div>
    </div>
  );
};

const EpisodeScreen = ({ episode, onContinue }: { episode: number, onContinue: () => void }) => {
  const context = EPISODE_CONTEXT[episode] || EPISODE_CONTEXT[1];
  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onContinue();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onContinue]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-12 text-center relative">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#33ff00]/10 via-black to-black"></div>
       
       <div className="z-10 max-w-2xl w-full border-t border-b border-[#33ff00]/30 py-12">
          <div className="text-[#33ff00] text-sm tracking-[0.5em] mb-4 uppercase">Episode 0{episode}</div>
          <GlitchText text={context.title} className="text-6xl font-bold text-white mb-12 block" />
          
          <div className="text-gray-300 text-lg leading-loose font-light whitespace-pre-wrap">
            {context.lore}
          </div>
       </div>

       <div className="mt-12 z-10">
          <button onClick={onContinue} className="text-[#33ff00] hover:text-white border border-[#33ff00] px-6 py-2 hover:bg-[#33ff00]/10 transition-colors">
            ACCESS_SECTOR_0{episode} &gt;&gt;
          </button>
          <div className="mt-2 text-[10px] text-gray-600 uppercase">Press Enter</div>
       </div>
    </div>
  );
};

const GameOverScreen = ({ reason, onRetry }: { reason: string, onRetry: () => void }) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
          if (e.key === 'Enter') onRetry();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onRetry]);

    return (
        <div className="absolute inset-0 z-50 bg-red-950/90 backdrop-blur-sm flex items-center justify-center text-center p-8">
            <div className="bg-black border-4 border-red-600 p-12 max-w-xl w-full shadow-[0_0_50px_rgba(255,0,0,0.5)] transform -rotate-1">
                <h2 className="text-6xl font-bold text-red-600 mb-2 tracking-tighter">FATAL ERROR</h2>
                <div className="h-1 bg-red-600 w-full mb-8"></div>
                
                <p className="text-white text-xl mb-4 font-bold">{reason}</p>
                <p className="text-red-400 mb-12 animate-pulse">CONNECTION TERMINATED BY HOST.</p>

                <button 
                    onClick={onRetry}
                    className="bg-red-600 text-black px-8 py-3 font-bold hover:bg-white hover:text-red-900 transition-colors uppercase tracking-widest text-lg"
                >
                    [ REBOOT SYSTEM ]
                </button>
                <div className="mt-4 text-xs text-gray-500">PRESS ENTER TO RETRY</div>
            </div>
        </div>
    );
};

// --- Main App ---

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevelIndex: 0,
    mode: VimMode.NORMAL,
    text: LEVEL_1_FALLBACK.initialText, // Ensure initial text is never empty
    cursor: { x: 0, y: 0 },
    commandBuffer: '',
    operatorBuffer: '',
    motionBuffer: '',
    countBuffer: '',
    clipboard: null,
    clipboardType: null,
    message: '',
    status: 'LANDING',
    loreLog: INITIAL_LORE,
    activeDialog: 'NONE',
    timeLeft: null,
    keystrokeCount: 0,
    lastAction: null,
    insertBuffer: ''
  });

  const [currentLevel, setCurrentLevel] = useState<Level>(LEVEL_1_FALLBACK);
  const [isLoading, setIsLoading] = useState(false);

  // --- Effects ---

  // Timer Effect
  useEffect(() => {
      let timer: any;
      if (gameState.status === 'PLAYING' && gameState.timeLeft !== null && gameState.timeLeft !== undefined) {
          timer = setInterval(() => {
              setGameState(prev => {
                  if (prev.timeLeft !== null && prev.timeLeft <= 0) {
                      clearInterval(timer);
                      return { ...prev, status: 'GAMEOVER', message: 'CONNECTION TIMEOUT' };
                  }
                  return { ...prev, timeLeft: (prev.timeLeft || 0) - 1 };
              });
          }, 1000);
      }
      return () => clearInterval(timer);
  }, [gameState.status, gameState.timeLeft]);


  // --- Task Validation Logic ---

  useEffect(() => {
    if (gameState.status !== 'PLAYING') return;

    setCurrentLevel(prevLevel => {
        const newTasks = prevLevel.tasks.map(task => {
            if (task.completed && task.type === 'cursor_on') {
                return task;
            }

            let isMet = false;
            const currentLine = gameState.text[gameState.cursor.y] || '';
            
            if (task.type === 'contains') {
                isMet = gameState.text.some(line => line.includes(task.value));
            } else if (task.type === 'missing') {
                isMet = !gameState.text.some(line => line.includes(task.value));
            } else if (task.type === 'cursor_on') {
                // Strict check: Cursor must be overlapping the specific word
                const targetIndex = currentLine.indexOf(task.value);
                if (targetIndex !== -1) {
                    const endIndex = targetIndex + task.value.length;
                    isMet = gameState.cursor.x >= targetIndex && gameState.cursor.x < endIndex;
                }
            }

            if (task.type === 'cursor_on') {
               return { ...task, completed: task.completed || isMet };
            }
            return { ...task, completed: isMet };
        });

        const hasChanged = JSON.stringify(newTasks) !== JSON.stringify(prevLevel.tasks);
        if (!hasChanged) return prevLevel;

        return { ...prevLevel, tasks: newTasks };
    });

  }, [gameState.text, gameState.cursor, gameState.status]);


  // --- Logic Helpers ---

  const loadLevel = useCallback(async (index: number) => {
    if (index >= CURRICULUM.length) {
      setGameState(prev => ({ ...prev, status: 'EPISODE_COMPLETE', message: "SYSTEM RESTORED" }));
      return;
    }

    const config = CURRICULUM[index];
    const prevConfig = CURRICULUM[index - 1];
    
    // Logic: Only show EPISODE_INTRO if we are moving to a NEW episode AND it's not the very first level.
    // Level 1 (Index 0) intro is handled by the Landing Screen + Briefing Header.
    const isNewEpisode = index > 0 && prevConfig && config.episode > prevConfig.episode;
    
    setIsLoading(true);
    try {
      let levelData: Level;
      
      // Use fallback if no key or for level 1 to ensure smooth start
      if (index === 0 || !process.env.API_KEY) {
         levelData = LEVEL_1_FALLBACK;
      } else {
        // Fix: Removed apiKey argument to comply with guidelines, accessing process.env.API_KEY directly in service
        const genLevel = await generateLevel(config, gameState.loreLog);
        
        const hydratedTasks: Task[] = genLevel.tasks.map(t => ({
             ...t,
             completed: false
        }));

        levelData = {
          id: config.id,
          config: config,
          briefing: genLevel.briefing,
          initialText: genLevel.initialText,
          targetText: genLevel.targetText,
          loreReveal: genLevel.loreReveal,
          hints: genLevel.hints,
          tasks: hydratedTasks
        };
      }

      // Safety: Ensure text is never empty to prevent crash
      if (!levelData.initialText || levelData.initialText.length === 0) {
          levelData.initialText = ["DATA_CORRUPT", "RETRY_MANUAL_OVERRIDE"];
      }

      setCurrentLevel(levelData);
      
      setGameState(prev => ({
        ...prev,
        currentLevelIndex: index,
        status: isNewEpisode ? 'EPISODE_INTRO' : 'BRIEFING', // Skip Intro for Level 1
        mode: VimMode.NORMAL,
        text: [...levelData.initialText],
        cursor: { x: 0, y: 0 },
        message: '',
        commandBuffer: '',
        operatorBuffer: '',
        motionBuffer: '',
        countBuffer: '',
        activeDialog: 'NONE',
        timeLeft: config.timeLimit || null,
        keystrokeCount: 0,
        lastAction: null,
        insertBuffer: ''
      }));

    } catch (e) {
      console.error(e);
      setCurrentLevel(LEVEL_1_FALLBACK);
      setGameState(prev => ({...prev, message: "CONNECTION_LOST. RETRYING LOCAL CACHE.", status: 'BRIEFING', text: LEVEL_1_FALLBACK.initialText}));
    } finally {
      setIsLoading(false);
    }
  }, [gameState.loreLog]);

  // --- Input Handler ---

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameState.status === 'LANDING' || gameState.status === 'EPISODE_INTRO' || gameState.status === 'BOOT' || gameState.status === 'GAMEOVER') return;

    if (gameState.activeDialog !== 'NONE') {
        if (e.key === 'Escape') setGameState(prev => ({ ...prev, activeDialog: 'NONE' }));
        return; 
    }

    if (e.key === 'F1') { e.preventDefault(); setGameState(prev => ({ ...prev, activeDialog: 'HELP' })); return; }
    if (e.key === 'F2') { e.preventDefault(); setGameState(prev => ({ ...prev, activeDialog: 'MAP' })); return; }
    if (e.key === 'F3') { e.preventDefault(); setGameState(prev => ({ ...prev, activeDialog: 'HINTS' })); return; }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    if (gameState.status === 'BRIEFING') {
      if (e.key === 'Enter') setGameState(prev => ({ ...prev, status: 'PLAYING' }));
      return;
    }

    if (gameState.status === 'SUCCESS') {
      if (e.key === 'Enter') {
         const nextIdx = gameState.currentLevelIndex + 1;
         const newLog = [...gameState.loreLog, `> [${currentLevel.config.filename}]: DECRYPTED`, `> ${currentLevel.loreReveal}`];
         setGameState(prev => ({ ...prev, loreLog: newLog }));
         loadLevel(nextIdx);
      }
      return;
    }

    if (gameState.status !== 'PLAYING') return;

    // Check Keystroke Limit
    const limit = currentLevel.config.maxKeystrokes;
    const isExceeded = limit && (gameState.keystrokeCount + 1 > limit);
    if (isExceeded) {
        setGameState(prev => ({ ...prev, status: 'GAMEOVER', message: 'KEYSTROKE LIMIT EXCEEDED' }));
        return;
    }

    setGameState(prev => {
      // Increment keystroke count for valid inputs
      let newState = { ...prev, keystrokeCount: prev.keystrokeCount + 1 };
      
      // INSERT MODE
      if (prev.mode === VimMode.INSERT) {
        if (e.key === 'Escape') {
            // Save insert action
            const insertAction: LastAction = { 
                type: 'insert', 
                text: prev.insertBuffer 
            };
            return { 
                ...newState, 
                mode: VimMode.NORMAL, 
                message: '', 
                cursor: { ...prev.cursor, x: Math.max(0, prev.cursor.x - 1) },
                lastAction: insertAction,
                insertBuffer: ''
            };
        } else if (e.key === 'Backspace') {
          return fs.handleBackspace(newState);
        } else if (e.key === 'Enter') {
          return fs.handleNewLine(newState);
        } else if (e.key.length === 1) {
          const s = fs.insertChar(newState, e.key);
          s.insertBuffer = prev.insertBuffer + e.key;
          return s;
        }
        return newState;
      }

      // COMMAND MODE
      if (prev.mode === VimMode.COMMAND) {
        if (e.key === 'Escape') return { ...newState, mode: VimMode.NORMAL, commandBuffer: '' };
        if (e.key === 'Enter') {
          const cmd = prev.commandBuffer.trim();
          
          if (cmd === ':w' || cmd === ':wq' || cmd === ':x') {
             const allDone = currentLevel.tasks.every(t => t.completed);
             if (allDone) {
                 return { ...newState, status: 'SUCCESS', mode: VimMode.NORMAL, commandBuffer: '' };
             } else {
                 return { ...newState, mode: VimMode.NORMAL, commandBuffer: '', message: 'E503: PRIMARY DIRECTIVE INCOMPLETE' };
             }
          }

          if (cmd === ':q' || cmd === ':q!' || cmd === ':qa') {
             return { 
                ...newState, 
                text: [...currentLevel.initialText], 
                mode: VimMode.NORMAL, 
                commandBuffer: '', 
                cursor: { x: 0, y: 0 },
                message: 'CHANGES DISCARDED. RESETTING...' 
             };
          }

          if (cmd.startsWith('/')) {
             return { ...fs.executeSearch(newState, cmd.slice(1)), mode: VimMode.NORMAL, commandBuffer: '' };
          }
          return { ...newState, mode: VimMode.NORMAL, commandBuffer: '', message: 'E492: Not an editor command' };
        }
        if (e.key === 'Backspace') {
           const newCmd = prev.commandBuffer.slice(0, -1);
           return { ...newState, commandBuffer: newCmd, mode: newCmd === '' ? VimMode.NORMAL : VimMode.COMMAND };
        }
        if (e.key.length === 1) return { ...newState, commandBuffer: prev.commandBuffer + e.key };
        return newState;
      }

      // NORMAL MODE
      const { operatorBuffer, countBuffer } = prev;
      const count = parseInt(countBuffer || '1');

      // 1. Text Object Operator Pending (e.g. 'ci')
      if (operatorBuffer === 'ci' || operatorBuffer === 'di') {
          if (e.key === 'w' || e.key === '(' || e.key === ')' || e.key === '"') {
             const action = operatorBuffer[0] as 'c' | 'd';
             const res = fs.handleTextObject(newState, action, e.key as any);
             // Approximate LastAction for dot command (Text Objects are hard to replicate without full parser)
             res.lastAction = { type: action === 'c' ? 'change' : 'delete', subType: 'object', object: e.key };
             return res;
          }
          if (e.key === 'Escape') return { ...newState, operatorBuffer: '', countBuffer: '' };
      }

      // 2. Simple Operator Pending (e.g. 'd')
      if (operatorBuffer === 'd') {
         if (e.key === 'd') {
             const res = fs.deleteText(newState, 'line', count);
             res.lastAction = { type: 'delete', subType: 'line', count: count };
             return res;
         }
         if (e.key === 'w') { // Approximation
             const res = fs.deleteText(newState, 'word', count); 
             res.lastAction = { type: 'delete', subType: 'word', count: count };
             return res;
         }
         if (e.key === 'i') return { ...newState, operatorBuffer: 'di' }; // Start Text Object
         if (e.key === 'Escape') return { ...newState, operatorBuffer: '', countBuffer: '' };
      }
      if (operatorBuffer === 'c') {
         if (e.key === 'w') {
            const res = fs.changeWord(newState);
            // Change word enters insert mode, lastAction is pending until Esc
            // But we can flag it. For simplicity in this demo, let's treat changeWord as immediate for Dot
            // Actually changeWord puts us in INSERT. The completion (Esc) will log 'insert'.
            // To properly Dot repeat 'cw', we need to know it was a change.
            // Simplified: we rely on the insert logic.
            return res;
         }
         if (e.key === 'i') return { ...newState, operatorBuffer: 'ci' };
         if (e.key === 'Escape') return { ...newState, operatorBuffer: '', countBuffer: '' };
      }
      if (operatorBuffer === 'y' && e.key === 'y') {
          return { ...newState, clipboard: prev.text[prev.cursor.y], clipboardType: 'line', operatorBuffer: '', countBuffer: '', message: `${count} line(s) yanked` };
      }


      // 3. Numbers (Counts)
      if (/[0-9]/.test(e.key)) {
         // Prevent 0 as first digit (it's start of line)
         if (prev.countBuffer === '' && e.key === '0') {
             return { ...newState, cursor: { ...prev.cursor, x: 0 } };
         }
         return { ...newState, countBuffer: prev.countBuffer + e.key };
      }

      // 4. Normal Motions & Commands
      switch (e.key) {
        // Navigation
        case 'h': return fs.moveCursor(newState, -1 * count, 0);
        case 'j': return fs.moveCursor(newState, 0, 1 * count);
        case 'k': return fs.moveCursor(newState, 0, -1 * count);
        case 'l': return fs.moveCursor(newState, 1 * count, 0);
        case 'w': return fs.jumpWord(newState, 'next', count);
        case 'b': return fs.jumpWord(newState, 'prev', count);
        case '0': return { ...newState, cursor: { ...prev.cursor, x: 0 }, countBuffer: '' };
        case '$': return { ...newState, cursor: { ...prev.cursor, x: Math.max(0, (prev.text[prev.cursor.y]||'').length - 1) }, countBuffer: '' };
        case 'G': return { ...newState, cursor: { x: 0, y: prev.text.length - 1 }, countBuffer: '' };
        case 'g': 
           if (prev.motionBuffer === 'g') return { ...newState, cursor: { x: 0, y: 0 }, motionBuffer: '', countBuffer: '' };
           return { ...newState, motionBuffer: 'g' };
        
        // Find char
        case 'f': return { ...newState, motionBuffer: 'f' };
        case 't': return { ...newState, motionBuffer: 't' }; 
        case ';': {
            // Repeat last f/t
            // Implementing simplified version: repeat last known motion if it was f/t?
            // This requires storing 'lastMotion'. 
            // For now, let's just make it a no-op placeholder or repeat the EXACT last f/t if we tracked it.
            // Skipping strictly for simplicity unless requested.
            return { ...newState, message: '; (Repeat find) - Not cached' };
        }
        
        // Operators
        case 'x': {
            const res = fs.deleteText(newState, 'char', count);
            res.lastAction = { type: 'delete', subType: 'char', count: count };
            return res;
        }
        case 'd': return { ...newState, operatorBuffer: 'd' };
        case 'y': return { ...newState, operatorBuffer: 'y' };
        case 'c': return { ...newState, operatorBuffer: 'c' };
        case 'p': {
             if (prev.clipboardType === 'line' && prev.clipboard) {
                 const newText = [...prev.text];
                 newText.splice(prev.cursor.y + 1, 0, prev.clipboard);
                 return { ...newState, text: newText, cursor: { x: 0, y: prev.cursor.y + 1 }, countBuffer: '' };
             }
             if (prev.clipboardType === 'char' && prev.clipboard) {
                 return { ...fs.insertChar(newState, prev.clipboard), mode: VimMode.NORMAL }; // Approx paste
             }
             return { ...newState, message: 'Nothing in register' };
        }
        case 'u': return { ...newState, message: 'Undo not implemented yet' }; 

        // Mode Switches
        case 'i': return { ...newState, mode: VimMode.INSERT, message: '-- INSERT --', countBuffer: '', insertBuffer: '' };
        case 'a': return { ...newState, mode: VimMode.INSERT, cursor: { ...prev.cursor, x: Math.min((prev.text[prev.cursor.y]||'').length, prev.cursor.x + 1) }, message: '-- INSERT --', countBuffer: '', insertBuffer: '' };
        case 'A': return { ...newState, mode: VimMode.INSERT, cursor: { ...prev.cursor, x: (prev.text[prev.cursor.y]||'').length }, message: '-- INSERT --', countBuffer: '', insertBuffer: '' };
        case 'o': {
             const newText = [...prev.text];
             newText.splice(prev.cursor.y + 1, 0, '');
             return { ...newState, text: newText, mode: VimMode.INSERT, cursor: { x: 0, y: prev.cursor.y + 1 }, message: '-- INSERT --', countBuffer: '', insertBuffer: '' };
        }
        case 'O': {
             const newText = [...prev.text];
             newText.splice(prev.cursor.y, 0, '');
             return { ...newState, text: newText, mode: VimMode.INSERT, cursor: { x: 0, y: prev.cursor.y }, message: '-- INSERT --', countBuffer: '', insertBuffer: '' };
        }
        case 'v': return { ...newState, mode: VimMode.VISUAL, message: '-- VISUAL --', countBuffer: '' };
        case '.': {
            // DOT COMMAND IMPLEMENTATION
            if (prev.lastAction) {
                const act = prev.lastAction;
                if (act.type === 'delete') {
                    if (act.subType === 'line') return fs.deleteText(newState, 'line', act.count || 1);
                    if (act.subType === 'word') return fs.deleteText(newState, 'word', act.count || 1);
                    if (act.subType === 'char') return fs.deleteText(newState, 'char', act.count || 1);
                }
                if (act.type === 'insert' && act.text) {
                     // Replay text insertion at current cursor
                     let s = newState;
                     for (const char of act.text) {
                         s = fs.insertChar(s, char);
                     }
                     s.cursor.x -= 1; // Vim cursor adjustment after insert
                     return s;
                }
                if (act.type === 'indent') {
                    const newText = [...prev.text];
                    newText[prev.cursor.y] = "  " + newText[prev.cursor.y];
                    return { ...newState, text: newText, message: 'Repeated >' };
                }
                return { ...newState, message: 'Action not repeatable yet' };
            }
            return { ...newState, message: 'Nothing to repeat' };
        }

        // Command
        case ':': return { ...newState, mode: VimMode.COMMAND, commandBuffer: ':', countBuffer: '' };
        case '/': return { ...newState, mode: VimMode.COMMAND, commandBuffer: '/', countBuffer: '' };
      }
      
      // Handle 'f' and 't' completion
      if (prev.motionBuffer === 'f' || prev.motionBuffer === 't') {
           // Simple implementation: jump to next char
           const target = e.key;
           const line = prev.text[prev.cursor.y];
           const offset = prev.motionBuffer === 't' ? 1 : 0;
           const idx = line.indexOf(target, prev.cursor.x + 1);
           
           if (idx !== -1) {
               return { ...newState, cursor: { ...prev.cursor, x: idx - offset }, motionBuffer: '' };
           } else {
               return { ...newState, motionBuffer: '' };
           }
      }

      // Visual Mode basic hack
      if (prev.mode === VimMode.VISUAL) {
          if (e.key === 'd' || e.key === 'x') {
             const res = fs.deleteText(newState, 'char'); // Simplification for visual selection delete
             res.lastAction = { type: 'delete', subType: 'char', count: 1 };
             return { ...res, mode: VimMode.NORMAL, message: '' };
          }
          if (e.key === '>') {
              // Indent
             const newText = [...prev.text];
             newText[prev.cursor.y] = "  " + newText[prev.cursor.y];
             return { ...newState, text: newText, mode: VimMode.NORMAL, message: '1 line >ed', lastAction: { type: 'indent' } };
          }
          if (e.key === 'Escape') return { ...newState, mode: VimMode.NORMAL, message: '' };
      }
      
      return newState;
    });
  }, [gameState.status, currentLevel, gameState.currentLevelIndex, gameState.activeDialog]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const areAllTasksComplete = currentLevel.tasks.every(t => t.completed);

  // --- RENDER HELPERS ---
  
  const TopButton = ({ label, shortcut, active, onClick }: { label: string, shortcut: string, active: boolean, onClick: () => void }) => (
      <button 
        onClick={onClick}
        className={`px-4 py-2 text-sm font-bold border-r border-gray-800 flex items-center gap-2 transition-colors
            ${active ? 'bg-[#33ff00] text-black' : 'bg-[#0a0a0a] text-gray-400 hover:text-white hover:bg-gray-900'}
        `}
      >
          <span>{label}</span>
          <span className={`text-[10px] px-1 rounded border ${active ? 'border-black text-black' : 'border-gray-600 text-gray-500'}`}>{shortcut}</span>
      </button>
  );

  const episodes = Array.from(new Set(CURRICULUM.map(l => l.episode)));


  // --- MAIN RENDER SWITCH ---

  if (gameState.status === 'LANDING') {
    return <LandingScreen onStart={() => loadLevel(0)} />;
  }

  if (gameState.status === 'EPISODE_INTRO') {
     return <EpisodeScreen 
              episode={currentLevel.config.episode} 
              onContinue={() => setGameState(prev => ({...prev, status: 'BRIEFING'}))} 
            />;
  }

  // Find the first uncompleted task for highlighting
  const activeTaskIndex = currentLevel.tasks.findIndex(t => !t.completed);

  return (
    <div className="h-screen bg-[#050505] text-[#a9b7c6] font-mono flex flex-col relative overflow-hidden">
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

      {/* --- TOP PANEL --- */}
      <div className="h-10 border-b border-gray-800 bg-[#050505] flex items-center z-50 select-none">
          <div className="px-4 text-[#33ff00] font-bold tracking-widest text-sm border-r border-gray-800 h-full flex items-center">
              NEOVIM:2015
          </div>
          <TopButton 
            label="HELP" 
            shortcut="F1" 
            active={gameState.activeDialog === 'HELP'} 
            onClick={() => setGameState(prev => ({...prev, activeDialog: prev.activeDialog === 'HELP' ? 'NONE' : 'HELP'}))} 
          />
          <TopButton 
            label="MAP" 
            shortcut="F2" 
            active={gameState.activeDialog === 'MAP'} 
            onClick={() => setGameState(prev => ({...prev, activeDialog: prev.activeDialog === 'MAP' ? 'NONE' : 'MAP'}))} 
          />
          <TopButton 
            label="NOTES" 
            shortcut="F3" 
            active={gameState.activeDialog === 'HINTS'} 
            onClick={() => setGameState(prev => ({...prev, activeDialog: prev.activeDialog === 'HINTS' ? 'NONE' : 'HINTS'}))} 
          />
          <div className="flex-1"></div>
          <div className="px-4 text-xs text-gray-600">
             EP_{currentLevel.config.episode} // LVL_{currentLevel.config.id}
          </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT: MAIN TERMINAL AREA --- */}
        <div className="flex-1 flex flex-col p-6 z-10 relative">
            
            {/* Header Info */}
            <div className="flex justify-between items-end border-b border-gray-800 pb-2 mb-4 text-xs tracking-widest text-gray-500">
                <div>
                <span className="text-[#33ff00] mr-4">USER: GHOST</span>
                <span>CONNECTION: ENCRYPTED</span>
                </div>
                <div>
                {currentLevel.config.episodeTitle}
                </div>
            </div>

            {/* EDITOR OR LOADING */}
            {isLoading ? (
                <div className="flex-1 flex items-center justify-center text-[#33ff00] animate-pulse">
                    DOWNLOADING PACKETS...
                </div>
            ) : (
                <div className="flex-1 relative flex flex-col">
                    {/* File Name Header within Editor */}
                    <div className="bg-[#2b2b2b] text-gray-400 px-3 py-1 text-sm mb-2 w-fit rounded-t-sm">
                    {currentLevel.config.filename}
                    </div>

                    {/* Briefing Overlay (If active) */}
                    {gameState.status === 'BRIEFING' && (
                        <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
                            <div className="text-xs text-gray-500 mb-2 tracking-[0.5em] uppercase">EPISODE {currentLevel.config.episode}: {currentLevel.config.episodeTitle}</div>
                            <h2 className="text-[#33ff00] text-2xl mb-4 font-bold tracking-widest uppercase">
                                Target Acquired: {currentLevel.config.filename}
                            </h2>
                            <div className="text-gray-300 mb-8 max-w-lg leading-relaxed border-l-2 border-[#33ff00] pl-4 text-left">
                                {currentLevel.briefing}
                            </div>
                            <div className="text-[#33ff00] text-sm animate-pulse border border-[#33ff00] px-4 py-2 hover:bg-[#33ff00] hover:text-black cursor-pointer">
                                [ PRESS ENTER TO INITIALIZE ]
                            </div>
                        </div>
                    )}

                    {/* Success Overlay */}
                    {gameState.status === 'SUCCESS' && (
                        <div className="absolute inset-0 bg-black/80 z-30 flex flex-col items-center justify-center p-8 text-center animate-fadeIn backdrop-blur-sm">
                            <div className="border-2 border-[#33ff00] p-8 bg-black box-border shadow-[0_0_20px_rgba(51,255,0,0.3)] transform rotate-1">
                                <GlitchText text="MISSION COMPLETE" className="text-4xl text-[#33ff00] font-bold mb-4" />
                                <div className="text-white text-lg mb-2">INTEGRITY VERIFIED</div>
                                <div className="text-gray-500 italic text-sm mb-6 max-w-md">"{currentLevel.loreReveal}"</div>
                                <div className="animate-pulse text-sm text-[#33ff00]">
                                    [ PRESS ENTER FOR NEXT NODE ]
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Game Over Overlay */}
                    {gameState.status === 'GAMEOVER' && (
                        <GameOverScreen 
                           reason={gameState.message} 
                           onRetry={() => loadLevel(gameState.currentLevelIndex)} 
                        />
                    )}
                    
                    {/* Actual Editor Content */}
                    <div className="flex-1 font-['Fira_Code'] text-lg relative outline-none bg-[#0a0a0a] p-4 border border-gray-800 shadow-inner overflow-hidden" tabIndex={0}>
                        {gameState.text.map((line, idx) => (
                            <div key={idx} className="flex min-h-[1.5em]">
                            <div className="w-8 text-gray-700 text-right mr-4 select-none text-sm pt-1">{idx + 1}</div>
                            <div className="relative whitespace-pre text-[#a9b7c6]">
                                {line.length === 0 && gameState.cursor.y === idx ? (
                                    <span className="absolute left-0 top-0 bg-[#a9b7c6] opacity-80 w-[1ch] h-[1.2em] animate-pulse"></span>
                                ) : (
                                line.split('').map((char, charIdx) => {
                                    const isCursor = gameState.cursor.y === idx && gameState.cursor.x === charIdx;
                                    return (
                                    <span key={charIdx} className={`${isCursor ? 'bg-[#a9b7c6] text-black' : ''}`}>
                                        {char}
                                    </span>
                                    );
                                })
                                )}
                                {gameState.cursor.y === idx && gameState.cursor.x === line.length && line.length > 0 && (
                                <span className="absolute bg-[#a9b7c6] opacity-80 w-[1ch] h-[1.2em] animate-pulse" style={{left: `${line.length}ch`}}></span>
                                )}
                            </div>
                            </div>
                        ))}
                        {Array.from({ length: Math.max(0, 15 - gameState.text.length) }).map((_, i) => (
                            <div key={`empty-${i}`} className="flex">
                                <div className="w-8 text-[#464f5b] text-right mr-4 select-none font-bold">~</div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Vim Status Bar */}
                    <div className="mt-2 bg-[#2b2b2b] text-[#a9b7c6] px-3 py-1 text-sm flex justify-between font-bold border-t border-gray-700 shadow-lg">
                        <div className="flex gap-4 items-center">
                            <span className={`px-2 uppercase text-xs ${gameState.mode === VimMode.NORMAL ? 'bg-[#a9b7c6] text-black' : 'bg-[#cc7832] text-white'}`}>
                                {gameState.mode}
                            </span>
                            {gameState.message && <span className="text-[#cc7832] italic text-xs">[{gameState.message}]</span>}
                            {gameState.countBuffer && <span className="text-white text-xs">{gameState.countBuffer}</span>}
                            {gameState.operatorBuffer && <span className="text-yellow-500 text-xs">OP:{gameState.operatorBuffer}</span>}
                            {gameState.commandBuffer && <span className="text-white text-xs">{gameState.commandBuffer}</span>}
                        </div>
                        <div className="flex gap-4 text-xs text-gray-400">
                            <span>Ln {gameState.cursor.y + 1}, Col {gameState.cursor.x + 1}</span>
                            <span>{Math.round(((gameState.cursor.y + 1) / Math.max(1, gameState.text.length)) * 100)}%</span>
                        </div>
                    </div>

                </div>
            )}
        </div>

        {/* --- RIGHT: MISSION LOG (HUD) --- */}
        <div className="w-80 border-l border-gray-800 bg-[#080808] p-6 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
            
            {/* HUD Header */}
            <div className="mb-8 border-b border-gray-700 pb-2 flex justify-between items-end">
                <h3 className="text-[#33ff00] font-bold text-lg tracking-widest">MISSION LOG</h3>
                <div className={`text-[10px] animate-pulse ${areAllTasksComplete ? 'text-[#33ff00]' : 'text-gray-600'}`}>
                    STATUS: {areAllTasksComplete ? 'READY TO COMMIT' : 'ACTIVE'}
                </div>
            </div>

            {/* Constraints HUD */}
            {(currentLevel.config.timeLimit || currentLevel.config.maxKeystrokes || currentLevel.config.idealKeystrokes) && (
                <div className="mb-6 border border-gray-800 bg-gray-900/20 p-4 relative overflow-hidden">
                    {/* Time Limit */}
                    {currentLevel.config.timeLimit && (
                        <div className="mb-4">
                             <div className="text-[10px] text-red-400 uppercase tracking-widest">Trace Timeout</div>
                             <div className="text-3xl font-bold text-red-500 tabular-nums">
                                 {gameState.timeLeft !== null ? gameState.timeLeft : '--'}s
                             </div>
                        </div>
                    )}
                    
                    {/* Keystrokes & Ghost Metric */}
                    {(currentLevel.config.maxKeystrokes || currentLevel.config.idealKeystrokes) && (
                        <div>
                             <div className="flex justify-between items-end mb-1">
                                 <div className="text-[10px] text-gray-400 uppercase tracking-widest">Keystrokes</div>
                                 {currentLevel.config.idealKeystrokes && (
                                     <div className="text-[10px] text-[#33ff00] uppercase tracking-widest">
                                         PAR: {currentLevel.config.idealKeystrokes}
                                     </div>
                                 )}
                             </div>
                             
                             <div className="text-xl font-bold tabular-nums flex items-baseline gap-2">
                                 <span className={currentLevel.config.maxKeystrokes && gameState.keystrokeCount > currentLevel.config.maxKeystrokes ? 'text-red-500' : 'text-white'}>
                                    {gameState.keystrokeCount}
                                 </span>
                                 {currentLevel.config.maxKeystrokes && (
                                     <span className="text-sm text-gray-600">/ {currentLevel.config.maxKeystrokes} (LIMIT)</span>
                                 )}
                             </div>

                             {currentLevel.config.maxKeystrokes && (
                                 <div className="w-full bg-gray-800 h-1 mt-1 overflow-hidden">
                                     <div 
                                        className={`h-full transition-all duration-200 ${gameState.keystrokeCount > currentLevel.config.maxKeystrokes ? 'bg-red-500' : 'bg-[#33ff00]'}`}
                                        style={{ width: `${Math.min(100, (gameState.keystrokeCount / (currentLevel.config.maxKeystrokes || 1)) * 100)}%` }}
                                     ></div>
                                 </div>
                             )}
                        </div>
                    )}
                </div>
            )}

            {/* Target Info */}
            <div className="mb-6">
                <div className="text-gray-500 text-[10px] mb-1 uppercase tracking-widest">Target File</div>
                <div className="text-white font-bold font-mono border border-gray-800 p-2 bg-black/50 text-sm mb-2">
                {currentLevel.config.filename}
                </div>
                <div className="text-gray-500 text-[10px] mb-1 uppercase tracking-widest mt-4">Primary Directive</div>
                <div className="text-gray-400 text-xs leading-relaxed italic border-l-2 border-[#cc7832] pl-2">
                {currentLevel.config.objective}
                </div>
            </div>

            {/* Atomic Tasks Checklist */}
            <div className="mb-8">
                <div className="text-gray-500 text-[10px] mb-2 uppercase tracking-widest">Tactical Intel</div>
                <div className="space-y-2">
                    {currentLevel.tasks.map((task, idx) => {
                        const isActive = idx === activeTaskIndex;
                        const isFuture = idx > activeTaskIndex && activeTaskIndex !== -1;
                        const isDone = task.completed;
                        
                        let borderClass = 'border-gray-800 bg-gray-900/30';
                        if (isDone) borderClass = 'border-[#33ff00] bg-[#33ff00]/10';
                        if (isActive) borderClass = 'border-white bg-white/10 animate-pulse';

                        return (
                            <div key={idx} className={`flex items-start gap-3 p-2 rounded border transition-all duration-300 ${borderClass} ${isFuture ? 'opacity-30 blur-[0.5px]' : 'opacity-100'}`}>
                                <div className={`mt-1 text-sm ${isDone ? 'text-[#33ff00]' : (isActive ? 'text-white' : 'text-gray-600')}`}>
                                    {isDone ? '☑' : (isActive ? '➤' : '☐')}
                                </div>
                                <div className={`text-xs leading-relaxed ${isDone ? 'line-through text-gray-500' : (isActive ? 'text-white font-bold' : 'text-gray-400')}`}>
                                    {task.description}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Visual Indicator for :w */}
                {areAllTasksComplete && gameState.status !== 'SUCCESS' && (
                    <div className="mt-4 p-2 bg-[#33ff00]/10 border border-[#33ff00] text-[#33ff00] text-xs text-center animate-pulse">
                        ⚠ DIRECTIVES MET<br/>
                        TYPE <span className="font-bold">:w</span> TO COMMIT
                    </div>
                )}
            </div>
            
            {/* Hints / Intel */}
            <div className="mb-8 flex-1">
                <div className="text-gray-500 text-[10px] mb-2 uppercase tracking-widest">Operator Notes</div>
                <ul className="space-y-3">
                {currentLevel.hints.map((hint, idx) => (
                    <li key={idx} className="flex gap-2 text-gray-400 text-xs items-start">
                        <span className="text-[#cc7832] mt-[2px]">›</span>
                        <span className="leading-tight">{hint}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {gameState.activeDialog === 'HELP' && (
          <Modal title="SYSTEM MANUAL (F1)" onClose={() => setGameState(prev => ({...prev, activeDialog: 'NONE'}))}>
              <div className="grid grid-cols-2 gap-8">
                  <div>
                      <h4 className="text-[#33ff00] mb-4 border-b border-gray-700 pb-1">CURRENT PROTOCOLS</h4>
                      <ul className="space-y-2 text-sm">
                          {currentLevel.config.newKeys.map(key => (
                              <li key={key} className="flex justify-between">
                                  <span className="font-mono bg-gray-800 px-1 text-white">{key}</span>
                                  <span className="text-gray-500">Active</span>
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-[#33ff00] mb-4 border-b border-gray-700 pb-1">GLOBAL COMMANDS</h4>
                      <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                             <span className="font-mono bg-gray-800 px-1 text-white">:w</span>
                             <span className="text-gray-500">Save & Verify</span>
                          </li>
                          <li className="flex justify-between">
                             <span className="font-mono bg-gray-800 px-1 text-white">:q</span>
                             <span className="text-gray-500">Abort / Reset</span>
                          </li>
                          <li className="flex justify-between">
                             <span className="font-mono bg-gray-800 px-1 text-white">Esc</span>
                             <span className="text-gray-500">Normal Mode / Close</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </Modal>
      )}

      {gameState.activeDialog === 'HINTS' && (
          <Modal title="OPERATOR NOTES (F3)" onClose={() => setGameState(prev => ({...prev, activeDialog: 'NONE'}))}>
              <div className="space-y-6">
                  <div className="bg-[#1a1a1a] p-4 border-l-4 border-[#cc7832]">
                      <h4 className="text-[#cc7832] font-bold mb-2">PRIMARY OBJECTIVE</h4>
                      <p className="text-lg">{currentLevel.config.objective}</p>
                  </div>
                  <div>
                      <h4 className="text-gray-500 text-sm tracking-widest mb-2">FIELD GUIDE</h4>
                      <ul className="space-y-4">
                          {currentLevel.hints.map((hint, idx) => (
                              <li key={idx} className="flex gap-4 items-start text-lg">
                                  <span className="text-[#33ff00] font-bold">{idx + 1}.</span>
                                  <span>{hint}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </Modal>
      )}

      {gameState.activeDialog === 'MAP' && (
          <Modal title="NETWORK MAP (F2)" onClose={() => setGameState(prev => ({...prev, activeDialog: 'NONE'}))}>
              <div className="space-y-8">
                  {episodes.map(epId => (
                      <div key={epId}>
                          <h4 className="text-gray-500 text-xs tracking-widest mb-4 border-b border-gray-800">
                             EPISODE {epId}
                          </h4>
                          <div className="flex flex-wrap gap-4">
                              {CURRICULUM.filter(l => l.episode === epId).map(lvl => {
                                  const isLocked = lvl.id > (CURRICULUM[gameState.currentLevelIndex].id || 0) && gameState.currentLevelIndex < CURRICULUM.length;
                                  const isCompleted = lvl.id <= gameState.currentLevelIndex;
                                  const isCurrent = lvl.id === CURRICULUM[gameState.currentLevelIndex].id;
                                  
                                  let statusClass = "border-gray-800 bg-gray-900 text-gray-600 opacity-50";
                                  if (isCurrent) statusClass = "border-[#33ff00] bg-[#33ff00]/20 text-white animate-pulse";
                                  else if (isCompleted) statusClass = "border-[#33ff00] bg-black text-[#33ff00]";

                                  return (
                                      <div key={lvl.id} className={`w-32 h-24 border p-2 flex flex-col justify-between relative ${statusClass}`}>
                                          <div className="text-xs font-bold">{lvl.filename}</div>
                                          <div className="text-[10px] uppercase">{lvl.mechanics[0].replace('_', ' ')}</div>
                                          {isLocked && <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-red-900 font-bold">LOCKED</div>}
                                      </div>
                                  )
                              })}
                          </div>
                      </div>
                  ))}
              </div>
          </Modal>
      )}

    </div>
  );
}
