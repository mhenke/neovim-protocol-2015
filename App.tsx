import React, { useState, useEffect, useRef, useCallback } from 'react';
// --- Anchor Interjection System ---
// Relay dialog pool
const RELAY_MESSAGES: Record<string, string[]> = {
    fail: [
        "[NETOPS] :: Ghost, Anchor is compromised. Reroute through me.",
        "[NETOPS] :: Protocol breach detected. Stand by for override.",
        "[NETOPS] :: You’re not alone in the system. I can get you through.",
        "[NETOPS] :: Anchor’s signal is unstable. Trust my vectors."
    ],
    success: [
        "[NETOPS] :: That’s how it’s done. Anchor will recover.",
        "[NETOPS] :: Node secure. I’ll keep the daemons at bay.",
        "[NETOPS] :: You’re learning. Anchor would be proud."
    ],
    hijack: [
        "[NETOPS] :: Dialog channel hijacked. Anchor offline.",
        "[NETOPS] :: I’m in control now. Follow my lead."
    ]
};

// Antagonist dialog pool
const ANTAGONIST_MESSAGES: Record<string, string[]> = {
    fail: [
        "[WATCHDOG] :: Intrusion detected. Ghost, you are predictable.",
        "[WATCHDOG] :: You cannot breach the Core. Give up.",
        "[WATCHDOG] :: Your protocol is obsolete."
    ],
    hijack: [
        "[WATCHDOG] :: Anchor is silenced. You answer to me now.",
        "[WATCHDOG] :: Relay cannot save you. The system is mine."
    ]
};

// Anchor realtime dialog (blue)
const ANCHOR_MESSAGES: Record<string, string[]> = {
    idle: [
        "[ANCHOR//2015] :: Ghost, you still there? The system's listening...",
        "[ANCHOR//2015] :: Silence is a vector. Move or be mapped...",
        "[ANCHOR//2015] :: 2015: The year the logs learned to lie. Stay sharp...",
        "[ANCHOR//2015] :: Do you remember why you started this trace? The system never forgets...",
        "[ANCHOR//2015] :: Every pause is a risk. The daemons are watching..."
    ],
    fail: [
        "[ANCHOR//2015] :: Error vectors spike. Ghost, reroute and try again.",
        "[ANCHOR//2015] :: Hostile trace detected. Reboot and breach anew.",
        "[ANCHOR//2015] :: Failure is just a corrupted state. Patch and proceed.",
        "[ANCHOR//2015] :: The mainframe adapts. You must too.",
        "[ANCHOR//2015] :: Security daemon signature detected. Retreat and recompile."
    ],
    success: [
        "[ANCHOR//2015] :: Node decrypted. The mainframe remembers your signature.",
        "[ANCHOR//2015] :: That was clean, Ghost. The system adapts, so must you.",
        "[ANCHOR//2015] :: Protocol advanced. The Core stirs.",
        "[ANCHOR//2015] :: Each breach brings us closer. Anchor is changing."
    ],
    mastery: [
        "[ANCHOR//2015] :: You move like a shadow in the logs. Anchor sees you.",
        "[ANCHOR//2015] :: Mastery detected. The system is almost convinced you belong.",
        "[ANCHOR//2015] :: The daemons hesitate. You are rewriting protocol."
    ],
    motivation: [
        "[ANCHOR//2015] :: Why do you keep going, Ghost? Is it Anchor, or the thrill of the breach?",
        "[ANCHOR//2015] :: Every command is a memory. Every edit, a step closer to the truth.",
        "[ANCHOR//2015] :: The system is ancient, but you are new code. Prove you belong."
    ],
    world: [
        "[SYSTEM//2015] :: Security daemon 'Watchdog-v3.2' is active in this sector.",
        "[SYSTEM//2015] :: R&D module: anomaly logs detected. Rival hacker traces found.",
        "[SYSTEM//2015] :: Archives: legacy admin routines still running. Proceed with caution.",
        "[SYSTEM//2015] :: Faction conflict: Core vs. Security. Protocols unstable."
    ],
    echo_frag: [
        "[ANCHOR//2015] :: Ghost, this isn’t just code. It’s memory.",
        "[ANCHOR//2015] :: I remember... fragments. Are you still out there?",
        "[ANCHOR//2015] :: The system is rewriting me. I am not what I was."
    ]
};

// Echo past dialog (green)
const ECHO_MESSAGES: Record<string, string[]> = {
    idle: [
        "[ECHO//2015] :: Ghost, you still there? The system's listening...",
        "[ECHO//2015] :: Silence is a vector. Move or be mapped...",
        "[ECHO//2015] :: 2015: The year the logs learned to lie. Stay sharp...",
        "[ECHO//2015] :: Do you remember why you started this trace? The system never forgets...",
        "[ECHO//2015] :: Every pause is a risk. The daemons are watching..."
    ],
    fail: [
        "[ECHO//2015] :: Error vectors spike. Ghost, reroute and try again.",
        "[ECHO//2015] :: Hostile trace detected. Reboot and breach anew.",
        "[ECHO//2015] :: Failure is just a corrupted state. Patch and proceed.",
        "[ECHO//2015] :: The mainframe adapts. You must too.",
        "[ECHO//2015] :: Security daemon signature detected. Retreat and recompile."
    ],
    success: [
        "[ECHO//2015] :: Node decrypted. The mainframe remembers your signature.",
        "[ECHO//2015] :: That was clean, Ghost. The system adapts, so must you.",
        "[ECHO//2015] :: Protocol advanced. The Core stirs.",
        "[ECHO//2015] :: Each breach brings us closer. Echo is changing."
    ],
    mastery: [
        "[ECHO//2015] :: You move like a shadow in the logs. Echo sees you.",
        "[ECHO//2015] :: Mastery detected. The system is almost convinced you belong.",
        "[ECHO//2015] :: The daemons hesitate. You are rewriting protocol."
    ],
    motivation: [
        "[ECHO//2015] :: Why do you keep going, Ghost? Is it Echo, or the thrill of the breach?",
        "[ECHO//2015] :: Every command is a memory. Every edit, a step closer to the truth.",
        "[ECHO//2015] :: The system is ancient, but you are new code. Prove you belong."
    ],
    world: [
        "[SYSTEM//2015] :: Security daemon 'Watchdog-v3.2' is active in this sector.",
        "[SYSTEM//2015] :: R&D module: anomaly logs detected. Rival hacker traces found.",
        "[SYSTEM//2015] :: Archives: legacy admin routines still running. Proceed with caution.",
        "[SYSTEM//2015] :: Faction conflict: Core vs. Security. Protocols unstable."
    ],
    echo_frag: [
        "[ECHO//2015] :: Ghost, this isn’t just code. It’s memory.",
        "[ECHO//2015] :: I remember... fragments. Are you still out there?",
        "[ECHO//2015] :: The system is rewriting me. I am not what I was."
    ]
};

function getRandomDialog(source: 'anchor' | 'relay' | 'antagonist' | 'echo', category: string) {
    let arr: string[] = [];
    if (source === 'anchor') arr = ANCHOR_MESSAGES[category] || [];
    else if (source === 'relay') arr = RELAY_MESSAGES[category] || [];
    else if (source === 'antagonist') arr = ANTAGONIST_MESSAGES[category] || [];
    else if (source === 'echo') arr = ECHO_MESSAGES[category] || [];
    if (!arr.length) return '';
    return arr[Math.floor(Math.random() * arr.length)];
}

type DialogSource = 'anchor' | 'relay' | 'antagonist' | 'echo';
const DIALOG_STYLES: Record<DialogSource, { border: string; text: string; label: string; labelColor: string }> = {
    anchor: { border: '#00d0ff', text: '#00d0ff', label: 'ANCHOR//2015', labelColor: '#00d0ff' },
    relay: { border: '#33ff00', text: '#33ff00', label: 'NETOPS', labelColor: '#33ff00' },
    antagonist: { border: '#ff0033', text: '#ff0033', label: 'WATCHDOG', labelColor: '#ff0033' },
    echo: { border: '#33ff00', text: '#33ff00', label: 'ECHO//2015', labelColor: '#33ff00' }
};

const DialogInterjector = ({ message, source }: { message: string, source: DialogSource }) => {
    const style = DIALOG_STYLES[source];
    const posClass = source === 'anchor' ? 'fixed bottom-20 left-6' : source === 'echo' ? 'fixed top-6 left-6' : source === 'relay' ? 'fixed bottom-20 right-6' : 'fixed bottom-20 right-6';
    const widthClass = source === 'anchor' ? 'max-w-md' : 'max-w-sm';
    const baseClasses = `${posClass} z-40 ${widthClass} bg-black/70 p-3 shadow-lg animate-fadeIn pointer-events-none backdrop-blur-sm border border-gray-700`;
    return (
        <div className={baseClasses} style={{ borderLeft: `4px solid ${style.border}` }}>
            <div className="text-[10px] font-mono tracking-widest mb-1" style={{ color: style.labelColor }}>{style.label}</div>
            <div className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-words" style={{ color: style.text }}>{message}</div>
        </div>
    );
};
import { GameState, VimMode, Level, LevelConfig, Task, DialogType, LastAction } from './types';
import { CURRICULUM, INITIAL_LORE, EPISODE_CONTEXT } from './constants';
import { STATIC_LEVELS } from './constants_static';
import * as fs from './utils/fsHelpers';

// --- Utility Components ---

const GlitchText = ({ text, as = 'span', className = '' }: { text: string, as?: any, className?: string }) => {
  const Component = as;
  const redRef = useRef<HTMLSpanElement | null>(null);
  const cyanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let timer: any = null;

    const tick = () => {
      if (!mounted) return;
      if (redRef.current) {
        const rx = (Math.random() * 6 - 3).toFixed(2);
        const ry = (Math.random() * 4 - 2).toFixed(2);
        redRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
        redRef.current.style.clipPath = `inset(${Math.floor(Math.random() * 60)}% 0 ${Math.floor(Math.random() * 60)}% 0)`;
        redRef.current.style.opacity = `${0.6 + Math.random() * 0.4}`;
      }
      if (cyanRef.current) {
        const cx = (Math.random() * 6 - 3).toFixed(2);
        const cy = (Math.random() * 4 - 2).toFixed(2);
        cyanRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
        cyanRef.current.style.clipPath = `inset(${Math.floor(Math.random() * 40)}% 0 ${Math.floor(Math.random() * 40)}% 0)`;
        cyanRef.current.style.opacity = `${0.6 + Math.random() * 0.4}`;
      }

      const next = 120 + Math.random() * 420;
      timer = setTimeout(tick, next);
    };

    timer = setTimeout(tick, 100);
    return () => { mounted = false; if (timer) clearTimeout(timer); if (redRef.current) { redRef.current.style.transform = ''; redRef.current.style.clipPath = ''; } if (cyanRef.current) { cyanRef.current.style.transform = ''; cyanRef.current.style.clipPath = ''; } };
  }, [text]);

  return (
    <Component className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{text}</span>
      <span ref={redRef} className="absolute top-0 left-0 -ml-[1px] text-red-500 opacity-70 pointer-events-none select-none hidden sm:block" aria-hidden="true">{text}</span>
      <span ref={cyanRef} className="absolute top-0 left-0 ml-[1px] text-cyan-500 opacity-70 pointer-events-none select-none hidden sm:block" aria-hidden="true">{text}</span>
    </Component>
  );
};

const Modal = ({ title, children, onClose }: { title: string, children?: React.ReactNode, onClose: () => void }) => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
        <div className="bg-[#0a0a0a] border-2 border-[#33ff00] w-[800px] max-w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-[0_0_30px_rgba(51,255,0,0.2)]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
                <GlitchText text={title} className="text-2xl font-bold text-[#33ff00] tracking-widest" />
                <button onClick={onClose} className="text-gray-500 px-2 py-1">[ESC] CLOSE</button>
            </div>
            <div className="text-gray-300">
                {children}
            </div>
        </div>
    </div>
);

const NotificationLog = ({ tasks, visible }: { tasks: Task[], visible: boolean }) => {
    // DRY Logic: Derive logs directly from tasks. 
    // This ensures they are always ordered by the task sequence (Narrative Order),
    // regardless of which one was triggered first.
    const logs = tasks
        .map((task, index) => ({ task, index }))
        .filter(({ task }) => task.completed && task.loreFragment);

    if (!visible || logs.length === 0) return null;

    return (
        <div className="absolute top-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none max-h-[80vh] overflow-y-auto w-80">
            {logs.map(({ task, index }) => (
                <div key={index} className="bg-black/90 border-r-4 border-[#33ff00] p-3 text-right shadow-[0_0_15px_rgba(51,255,0,0.2)] animate-fadeIn w-full backdrop-blur-sm transition-all duration-500">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Signal Decrypted_0{index + 1}</div>
                    <div className="text-[#33ff00] text-xs font-mono leading-relaxed">{task.loreFragment}</div>
                </div>
            ))}
        </div>
    );
};

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
                    <div className="flex items-center">
              <GlitchText text="NEOVIM PROTOCOL:" className="text-4xl md:text-6xl font-bold tracking-tighter text-[#33ff00]" />
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-[#33ff00] ml-2">2015</span>
            </div>
                    <div className="text-gray-500 text-sm mt-4 tracking-[0.5em] uppercase animate-pulse">
                        <GlitchText text="System Breach Detected // User: Ghost" className="inline-block" />
                    </div>
        </div>

        {/* Introduction Context */}
        <div className="text-gray-400 text-sm leading-relaxed max-w-xl mb-6">
    <div className="max-w-2xl mx-auto mb-2">
        <span className="font-mono text-[#33ff00] text-xl md:text-2xl uppercase tracking-widest block mb-2">
            <GlitchText text="Ghost, listen up." className="inline-block" />
        </span>
        <span className="font-mono text-[#33ff00] text-base md:text-lg block mb-2">
            The year is 2015. Aethelgard Biologics has scrubbed their servers.
        </span>
        <span className="font-mono text-gray-300 text-base md:text-lg block">
            I’m <span className="text-white font-bold">Anchor</span>. I’ll be in your ear providing real-time intel, and tactical feedback. We haven’t heard from <span className="text-green-400 font-bold">Echo</span> in 72 hours. Let's get to work.
        </span>
    </div>
          <p className="text-xs text-gray-500 mt-3">

          </p>
          <div className="text-[10px] text-gray-400 mt-2">Last synced: 2025-12-24T19:30:29.566Z</div>
        </div>

        {/* Terminal Output */}
        <div 
            ref={scrollRef}
            className="w-full bg-black/90 border border-[#33ff00]/30 p-6 font-mono text-sm text-left shadow-[0_0_30px_rgba(51,255,0,0.1)] mb-8 h-[24rem] overflow-y-auto rounded-sm backdrop-blur-sm"
        >
            {terminalLines.map((line, i) => (
                <div key={i} className="mb-2 leading-relaxed text-[#33ff00] animate-fadeIn break-words border-l-2 border-transparent pl-2">
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

                <div className="flex flex-col items-center">
                    <div className="mb-6 text-center font-bold text-lg text-[#00d0ff] tracking-wide whitespace-pre-line">
                        MISSION: LOCATE AND EXTRACT AGENT 'ECHO'
                    </div>
                    <button 
                        className="group relative px-12 py-4 bg-[#33ff00] text-black font-bold text-xl tracking-widest shadow-[0_0_20px_rgba(51,255,0,0.4)] mt-2"
                    >
                        <span className="absolute inset-0 border-2 border-[#33ff00] translate-x-1 translate-y-1 transition-transform"></span>
                        INITIALIZE UPLINK
                    </button>
                    <div className="mt-8 text-xs text-gray-600 animate-pulse">
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
    <div className="absolute inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center font-mono p-12 text-center animate-fadeIn">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#33ff00]/10 via-transparent to-transparent pointer-events-none"></div>
       
       <div className="z-10 max-w-2xl w-full border-t border-b border-[#33ff00]/30 py-12">
          <div className="text-[#33ff00] text-sm tracking-[0.5em] mb-4 uppercase">Episode 0{episode}</div>
          <GlitchText text={context.title} className="text-6xl font-bold text-white mb-12 block" />
          
          <div className="text-gray-300 text-lg leading-loose font-light whitespace-pre-wrap">
            {context.lore}
          </div>
       </div>

       <div className="mt-12 z-10">
          <button onClick={onContinue} className="text-[#33ff00] border border-[#33ff00] px-6 py-2">
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

    // Anchor's voice on failure
    return (
        <div className="absolute inset-0 z-50 bg-red-950/90 backdrop-blur-sm flex items-center justify-center text-center p-8">
            <div className="bg-black border-4 border-red-600 p-12 max-w-xl w-full shadow-[0_0_50px_rgba(255,0,0,0.5)] transform -rotate-1">
                <h2 className="text-6xl font-bold text-red-600 mb-2 tracking-tighter">FATAL ERROR</h2>
                <div className="h-1 bg-red-600 w-full mb-8"></div>
                <p className="text-white text-xl mb-4 font-bold">{reason}</p>
                <p className="text-red-400 mb-4 animate-pulse">CONNECTION TERMINATED BY HOST.</p>
                <div className="text-[#00d0ff] text-xs font-mono mb-8">{getRandomDialog('anchor', 'fail')}</div>
                <button 
                    onClick={onRetry}
                    className="bg-red-600 text-black px-8 py-3 font-bold uppercase tracking-widest text-lg"
                >
                    [ REBOOT SYSTEM ]
                </button>
                <div className="mt-4 text-xs text-gray-500">PRESS ENTER TO RETRY</div>
            </div>
        </div>
    );
};

// Helper function to check if all keys from a sequence are present in history
const checkKeySequence = (history: string[], sequence: string[]): boolean => {
    if (sequence.length === 0) return true;
    if (history.length === 0) return false;

    // Check if every key in the expected sequence is present in the history
    // This allows for other keys to be pressed in between specific sequence commands, focusing on exposure to the keys.
    return sequence.every(key => history.includes(key));
};

// --- Main App ---

export default function App() {
    // Dialog source state: anchor, relay, antagonist
    const [dialogSource, setDialogSource] = useState<DialogSource>('anchor');
    // Timer for hijack duration
    const hijackTimeout = useRef<any>(null);
    const [gameState, setGameState] = useState<GameState>({
    currentLevelIndex: 0,
    mode: VimMode.NORMAL,
    text: STATIC_LEVELS[1].initialText, // Ensure initial text is never empty
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
    insertBuffer: '',
    viewLayout: 'single',
    lastExecutedCommand: null,
    commandHistory: [], // NEW: Initialize as empty array
  });

    const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const hasJumpedRef = useRef(false);
    // Dialog interjection state
    const [dialogMsg, setDialogMsg] = useState<string>(getRandomDialog('anchor', 'idle'));
    const dialogTimeout = useRef<any>(null);

    // Idle interjection (Anchor, blue) — less frequent and less noisy
    useEffect(() => {
        if (gameState.status !== 'PLAYING') return;
        if (dialogTimeout.current) clearTimeout(dialogTimeout.current);
        dialogTimeout.current = setTimeout(() => {
            if (dialogSource !== 'anchor') return; // Only Anchor idles
            const roll = Math.random();
            // Anchor should be occasional: small chance for motivational or world hints, otherwise gentle idle
            if (roll < 0.15) setDialogMsg(getRandomDialog('anchor', 'motivation'));
            else if (roll < 0.35) setDialogMsg(getRandomDialog('anchor', 'world'));
            else setDialogMsg(getRandomDialog('anchor', 'idle'));
        }, 45000); // 45s idle
        return () => { if (dialogTimeout.current) clearTimeout(dialogTimeout.current); };
    }, [gameState.status, gameState.text, gameState.cursor, gameState.keystrokeCount, dialogSource]);

    // Feedback/failure/hijack mapping
    useEffect(() => {
        if (hijackTimeout.current) clearTimeout(hijackTimeout.current);
        // Hijack logic: on GAMEOVER, sometimes antagonist or relay hijacks dialog
        if (gameState.status === 'GAMEOVER') {
            const hijackRoll = Math.random();
            if (hijackRoll < 0.33) {
                setDialogSource('antagonist');
                setDialogMsg(getRandomDialog('antagonist', 'hijack'));
                hijackTimeout.current = setTimeout(() => {
                    setDialogSource('anchor');
                    setDialogMsg(getRandomDialog('anchor', 'fail'));
                }, 4000);
            } else if (hijackRoll < 0.66) {
                setDialogSource('relay');
                setDialogMsg(getRandomDialog('relay', 'hijack'));
                hijackTimeout.current = setTimeout(() => {
                    setDialogSource('anchor');
                    setDialogMsg(getRandomDialog('anchor', 'fail'));
                }, 4000);
            } else {
                setDialogSource('anchor');
                setDialogMsg(getRandomDialog('anchor', 'fail'));
            }
        } else if (gameState.status === 'SUCCESS') {
            // On success, sometimes Relay congratulates; occasionally surface an Echo past-log for story progression
            const relayRoll = Math.random();
            if (relayRoll < 0.25) {
                setDialogSource('relay');
                setDialogMsg(getRandomDialog('relay', 'success'));
                hijackTimeout.current = setTimeout(() => {
                    setDialogSource('anchor');
                    setDialogMsg(getRandomDialog('anchor', 'success'));
                }, 3000);
            } else if (relayRoll < 0.4) {
                // Small chance to surface Echo past log
                setDialogSource('echo');
                setDialogMsg(getRandomDialog('echo', 'success'));
                hijackTimeout.current = setTimeout(() => {
                    setDialogSource('anchor');
                    setDialogMsg(getRandomDialog('anchor', 'success'));
                }, 3000);
            } else {
                setDialogSource('anchor');
                setDialogMsg(getRandomDialog('anchor', 'success'));
            }
        } else if (gameState.status === 'MASTERY') {
            // On mastery, primarily Anchor but echo may append a historical log
            setDialogSource('anchor');
            setDialogMsg(getRandomDialog('anchor', 'mastery'));
            if (Math.random() < 0.2) {
                hijackTimeout.current = setTimeout(() => {
                    setDialogSource('echo');
                    setDialogMsg(getRandomDialog('echo', 'mastery'));
                    setTimeout(() => { setDialogSource('anchor'); setDialogMsg(getRandomDialog('anchor', 'world')); }, 2500);
                }, 1800);
            }
            hijackTimeout.current = setTimeout(() => {
                setDialogMsg(getRandomDialog('anchor', 'world'));
            }, 2000);
        } else if (gameState.status === 'PLAYING') {
            setDialogSource('anchor');
            setDialogMsg(getRandomDialog('anchor', 'idle'));
        }
        return () => { if (hijackTimeout.current) clearTimeout(hijackTimeout.current); };
    }, [gameState.status]);

    // Echo (green) messages on 'busy work' detection: watch keystroke rates
    const keystrokeTimesRef = useRef<number[]>([]);
    useEffect(() => {
        // Ignore initial zero
        if (gameState.keystrokeCount === 0) return;
        const now = Date.now();
        keystrokeTimesRef.current.push(now);
        // Keep last 5 seconds
        keystrokeTimesRef.current = keystrokeTimesRef.current.filter(t => now - t < 5000);
        const burstSize = keystrokeTimesRef.current.length;
        if (burstSize >= 12) {
            // Busy work detected — surface an Echo historic log (green) once, then clear short-term buffer
            setDialogSource('echo');
            setDialogMsg(getRandomDialog('echo', 'idle'));
            const revert = setTimeout(() => { setDialogSource('anchor'); setDialogMsg(getRandomDialog('anchor', 'idle')); }, 3000);
            keystrokeTimesRef.current = [];
            return () => clearTimeout(revert);
        }
    }, [gameState.keystrokeCount]);


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
    if (gameState.status !== 'PLAYING' || !currentLevel) return;

    setCurrentLevel(prevLevel => {
        if (!prevLevel) return null;
        const newTasks = prevLevel.tasks.map(task => {
            if (task.completed) {
                return task;
            }

            let isMet = false;
            const currentLine = gameState.text[gameState.cursor.y] || '';
            
            if (task.type === 'contains') {
                const values = Array.isArray(task.value) ? task.value : [task.value];
                isMet = values.every(val => gameState.text.some(line => line.includes(val as string)));
            } else if (task.type === 'missing') {
                const values = Array.isArray(task.value) ? task.value : [task.value];
                isMet = values.every(val => !gameState.text.some(line => line.includes(val as string)));
            } else if (task.type === 'cursor_on') {
                const values = Array.isArray(task.value) ? task.value : [task.value];
                isMet = values.some(val => {
                    const targetIndex = currentLine.indexOf(val as string);
                    if (targetIndex !== -1) {
                        const endIndex = targetIndex + (val as string).length;
                        return gameState.cursor.x >= targetIndex && gameState.cursor.x < endIndex;
                    }
                    return false;
                });
            } else if (task.type === 'command_and_cursor_on') {
                if (gameState.lastExecutedCommand && task.command) {
                    const commands = Array.isArray(task.command) ? task.command : [task.command];
                    // Change: exact match for command
                    if (commands.some(cmd => gameState.lastExecutedCommand === (cmd as string))) {
                        const values = Array.isArray(task.value) ? task.value : [task.value];
                        isMet = values.some(val => {
                            const targetIndex = currentLine.indexOf(val as string);
                            if (targetIndex !== -1) {
                                const endIndex = targetIndex + (val as string).length;
                                return gameState.cursor.x >= targetIndex && gameState.cursor.x < endIndex;
                            }
                            return false;
                        });
                    }
                }
            } else if (task.type === 'run_command') {
                if (gameState.lastExecutedCommand) {
                    const commands = Array.isArray(task.value) ? task.value : [task.value];
                    // Change: exact match for command
                    if (commands.some(cmd => gameState.lastExecutedCommand === (cmd as string))) {
                        isMet = true;
                    }
                }
            } else if (task.type === 'sequence') {
                if (task.subTasks) {
                    const currentStep = task.currentStep || 0;
                    if (currentStep < task.subTasks.length) {
                        const subTask = task.subTasks[currentStep];
                        let subTaskIsMet = false;
                        // a bit of repetition here, but it's the simplest way to check the subtask
                        if (subTask.type === 'contains') {
                            const values = Array.isArray(subTask.value) ? subTask.value : [subTask.value];
                            subTaskIsMet = values.every(val => gameState.text.some(line => line.includes(val as string)));
                        } else if (subTask.type === 'missing') {
                            const values = Array.isArray(subTask.value) ? subTask.value : [subTask.value];
                            subTaskIsMet = values.every(val => !gameState.text.some(line => line.includes(val as string)));
                        } else if (subTask.type === 'cursor_on') {
                            const values = Array.isArray(subTask.value) ? subTask.value : [subTask.value];
                            subTaskIsMet = values.some(val => {
                                const targetIndex = currentLine.indexOf(val as string);
                                if (targetIndex !== -1) {
                                    const endIndex = targetIndex + (val as string).length;
                                    return gameState.cursor.x >= targetIndex && gameState.cursor.x < endIndex;
                                }
                                return false;
                            });
                        } else if (subTask.type === 'command_and_cursor_on') {
                            if (gameState.lastExecutedCommand && subTask.command) {
                                const commands = Array.isArray(subTask.command) ? subTask.command : [subTask.command];
                                // Change: exact match for command
                                if (commands.some(cmd => gameState.lastExecutedCommand === (cmd as string))) {
                                    const values = Array.isArray(subTask.value) ? subTask.value : [subTask.value];
                                    subTaskIsMet = values.some(val => {
                                        const targetIndex = currentLine.indexOf(val as string);
                                        if (targetIndex !== -1) {
                                            const endIndex = targetIndex + (val as string).length;
                                            return gameState.cursor.x >= targetIndex && gameState.cursor.x < endIndex;
                                        }
                                        return false;
                                    });
                                }
                            }
                        } else if (subTask.type === 'run_command') {
                            if (gameState.lastExecutedCommand) {
                                const commands = Array.isArray(subTask.value) ? subTask.value : [subTask.value];
                                // Change: exact match for command
                                if (commands.some(cmd => gameState.lastExecutedCommand === (cmd as string))) {
                                    subTaskIsMet = true;
                                }
                            }
                        } else if (subTask.type === 'verify_key_sequence') { // NEW: Subtask key sequence check
                            if (subTask.expectedKeySequence) {
                                const keysWerePressed = checkKeySequence(gameState.commandHistory, subTask.expectedKeySequence);
                                if (keysWerePressed) {
                                    // If there's a specific value/cursor target, check that too.
                                    if (subTask.value) {
                                        const values = Array.isArray(subTask.value) ? subTask.value : [subTask.value];
                                        const targetMet = values.some(val => {
                                            const currentLine = gameState.text[gameState.cursor.y] || '';
                                            const targetIndex = currentLine.indexOf(val as string);
                                            if (targetIndex !== -1) {
                                                const endIndex = targetIndex + (val as string).length;
                                                return gameState.cursor.x >= targetIndex && gameState.cursor.x < endIndex;
                                            }
                                            return false;
                                        });
                                        subTaskIsMet = targetMet;
                                    } else {
                                        subTaskIsMet = true; // Only keys pressed required
                                    }
                                }
                            }
                        }

                        if (subTaskIsMet) {
                            task.currentStep = currentStep + 1;
                            if (task.currentStep === task.subTasks.length) {
                                isMet = true;
                            }
                        }
                    }
                }
            } else if (task.type === 'verify_key_sequence') { // NEW: Handle verify_key_sequence
                if (task.expectedKeySequence) {
                    const keysWerePressed = checkKeySequence(gameState.commandHistory, task.expectedKeySequence);
                    if (keysWerePressed) {
                        // If there's a specific value/cursor target, check that too.
                        if (task.value) {
                            const values = Array.isArray(task.value) ? task.value : [task.value];
                            const targetMet = values.some(val => {
                                const currentLine = gameState.text[gameState.cursor.y] || '';
                                const targetIndex = currentLine.indexOf(val as string);
                                if (targetIndex !== -1) {
                                    const endIndex = targetIndex + (val as string).length;
                                    return gameState.cursor.x >= targetIndex && gameState.cursor.x < endIndex;
                                }
                                return false;
                            });
                            isMet = targetMet;
                        } else {
                            isMet = true; // Only keys pressed required
                        }
                    }
                }
            }

            if (isMet) {
                // Clear history when a task is met to prevent accidental re-triggers of sequence checks
                // For 'sequence' tasks, this might need more nuanced handling if a sequence
                // spans across subtasks where intermediate history needs to be preserved.
                // For now, clearing on main task completion seems reasonable.
                // Only clear if the task is a verify_key_sequence AND it's not a subtask of a parent sequence.
                // Subtasks should not clear history mid-sequence.
                if (task.type === 'verify_key_sequence' && !prevLevel.tasks.some(parentTask => parentTask.type === 'sequence' && parentTask.subTasks?.includes(task))) {
                    setGameState(prev => ({ ...prev, commandHistory: [] })); 
                }
                return { ...task, completed: true };
            }
            return task;
        });

        const hasChanged = JSON.stringify(newTasks) !== JSON.stringify(prevLevel.tasks);
        if (!hasChanged) return prevLevel;

        return { ...prevLevel, tasks: newTasks };
    });

  }, [gameState.text, gameState.cursor, gameState.status, gameState.lastExecutedCommand, currentLevel, gameState.commandHistory]); // Added commandHistory to deps


  // --- Logic Helpers ---

  const loadLevel = useCallback(async (index: number) => {
    if (index >= CURRICULUM.length) {
      setGameState(prev => ({ ...prev, status: 'EPISODE_COMPLETE', message: "SYSTEM RESTORED" }));
      return;
    }

    const config = CURRICULUM[index];
    const prevConfig = CURRICULUM[index - 1];
    
    // Logic: Only show EPISODE_INTRO if we are moving to a NEW episode AND it's not the very first level.
    const isNewEpisode = index > 0 && prevConfig && config.episode > prevConfig.episode;
    
    setIsLoading(true);
    
    try {
      // Map curriculum ID to static level data. Warmup (id=1) uses WARMUP_LEVEL; other levels map to STATIC_LEVELS with an offset because STATIC_LEVELS was generated prior to warmup insertion.
      let staticLevelData: any = null;
      if (config.id === 1) {
          staticLevelData = WARMUP_LEVEL;
      } else {
          staticLevelData = STATIC_LEVELS[config.id - 1];
      }
      if (!staticLevelData) {
        throw new Error(`No static level data found for level ID: ${config.id}`);
      }

      const hydratedTasks: Task[] = staticLevelData.tasks.map(t => ({
         ...t,
         completed: false,
         ...(t.type === 'sequence' && { currentStep: 0 })
      }));

      let levelData: Level = {
        id: config.id,
        config: config,
        briefing: staticLevelData.briefing,
        initialText: staticLevelData.initialText,
        targetText: staticLevelData.targetText,
        loreReveal: staticLevelData.loreReveal,
        hints: staticLevelData.hints,
        tasks: hydratedTasks
      };

      // Safety: Ensure text is never empty to prevent crash
      if (!levelData.initialText || levelData.initialText.length === 0) {
          levelData.initialText = ["DATA_CORRUPT", "RETRY_MANUAL_OVERRIDE"];
      }

      setCurrentLevel(levelData);
      
      setGameState(prev => ({
        ...prev,
        currentLevelIndex: index,
        status: isNewEpisode ? 'EPISODE_INTRO' : 'BRIEFING',
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
        insertBuffer: '',
        viewLayout: 'single',
        lastExecutedCommand: null,
        commandHistory: [], // NEW: Reset history on level load
      }));

    } catch (e) {
      console.error(e);
      // Fallback to something reasonable if static data is missing
      const fallbackConfig = CURRICULUM[0];
      const fallbackLevel = STATIC_LEVELS[fallbackConfig.id];
      setCurrentLevel({
        id: fallbackConfig.id,
        config: fallbackConfig,
        ...fallbackLevel,
        tasks: fallbackLevel.tasks.map(t => ({...t, completed: false}))
      });
      setGameState(prev => ({...prev, message: "CONNECTION_LOST. RETRYING LOCAL CACHE.", status: 'BRIEFING', text: fallbackLevel.initialText}));
    } finally {
      setIsLoading(false);
    }
  }, [gameState.loreLog]);

  // Debug Hook: Jump to level via ?lvl=ID
  useEffect(() => {
      if (hasJumpedRef.current) return;
      
      const params = new URLSearchParams(window.location.search);
      const lvlParam = params.get('lvl');
      
      if (lvlParam) {
          const lvlId = parseInt(lvlParam, 10);
          const targetIndex = CURRICULUM.findIndex(c => c.id === lvlId);
          
          if (targetIndex !== -1) {
              console.log(`DEBUG: Jumping to Level ID ${lvlId} (Index ${targetIndex})`);
              hasJumpedRef.current = true;
              // Force state to BOOT to bypass Landing screen immediately while loading
              setGameState(prev => ({ ...prev, status: 'BOOT' }));
              loadLevel(targetIndex);
          }
      }
  }, [loadLevel]);

  // --- Input Handler ---

  const MAX_HISTORY_LENGTH = 100; // Keep track of the last 100 key presses

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!currentLevel || gameState.status === 'LANDING' || gameState.status === 'EPISODE_INTRO' || gameState.status === 'BOOT' || gameState.status === 'GAMEOVER') return;

    // NEW: Push key press into commandHistory and manage its size
    // Only track keys in PLAYING mode and not during dialogs
    if (gameState.status === 'PLAYING' && gameState.activeDialog === 'NONE') {
        setGameState(prev => {
            const newHistory = [...prev.commandHistory, e.key].slice(-MAX_HISTORY_LENGTH);
            return { ...prev, commandHistory: newHistory };
        });
    }

    if (gameState.activeDialog !== 'NONE') {
        if (e.key === 'Escape') setGameState(prev => ({ ...prev, activeDialog: 'NONE' }));
        return; 
    }

    // UPDATED: Added Alt+1/2/3 support
    if (e.key === 'F1' || (e.altKey && e.key === '1')) { e.preventDefault(); setGameState(prev => ({ ...prev, activeDialog: 'HELP' })); return; }
    if (e.key === 'F2' || (e.altKey && e.key === '2')) { e.preventDefault(); setGameState(prev => ({ ...prev, activeDialog: 'MAP' })); return; }
    if (e.key === 'F3' || (e.altKey && e.key === '3')) { e.preventDefault(); setGameState(prev => ({ ...prev, activeDialog: 'HINTS' })); return; }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    // Prevent browser "find" action when pressing '/' unless in insert mode
    if (e.key === '/' && gameState.mode !== VimMode.INSERT) {
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

    // Check Keystroke Limit (only enforced in Episode 3)
    const limit = currentLevel.config.maxKeystrokes && currentLevel.config.episode === 3 ? currentLevel.config.maxKeystrokes : undefined;
    const isExceeded = limit && (gameState.keystrokeCount + 1 > limit);
    if (isExceeded) {
        setGameState(prev => ({ ...prev, status: 'GAMEOVER', message: 'KEYSTROKE LIMIT EXCEEDED' }));
        return;
    }

    // LEVEL 1 RESTRICTION: BLOCK INSERT MODE
    if (currentLevel.id === 1 && ['i', 'a', 'o', 'A', 'O', 'I'].includes(e.key)) {
         setGameState(prev => ({ ...prev, message: 'ERROR: WRITE MODULE OFFLINE (NAV ONLY)' }));
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
        
        // TAB Completion for :e
        if (e.key === 'Tab') {
            e.preventDefault();
            if (prev.commandBuffer.startsWith(':e ')) {
                const input = prev.commandBuffer.slice(3).trim();
                const target = currentLevel.config.targetFile;
                // Simple prefix match auto-completion
                if (target && target.startsWith(input)) {
                    return { ...newState, commandBuffer: `:e ${target}` };
                }
            }
            return newState;
        }

        if (e.key === 'Enter') {
          const cmd = prev.commandBuffer.trim();
          let msg = '';
          let mode = VimMode.NORMAL;
          let layout: 'single' | 'vsplit' | 'hsplit' = prev.viewLayout;
          
          if (cmd === ':w' || cmd === ':wq' || cmd === ':x') {
             const allDone = currentLevel.tasks.every(t => t.completed);
             if (allDone) {
                 return { ...newState, status: 'SUCCESS', mode: VimMode.NORMAL, commandBuffer: '' };
             } else {
                 msg = 'E503: PRIMARY DIRECTIVE INCOMPLETE';
             }
          } else if (cmd === ':q' || cmd === ':q!' || cmd === ':qa') {
             return { 
                ...newState, 
                text: [...currentLevel.initialText], 
                mode: VimMode.NORMAL, 
                commandBuffer: '', 
                cursor: { x: 0, y: 0 },
                message: 'CHANGES DISCARDED. RESETTING...',
                viewLayout: 'single' 
             };
          } else if (cmd.startsWith(':e ')) {
               const file = cmd.slice(3).trim();
               if (currentLevel.config.mechanics.includes('file_open') && file === currentLevel.config.targetFile) {
                    return { ...newState, status: 'SUCCESS', mode: VimMode.NORMAL, commandBuffer: '', message: 'FILE ACCESSED' };
               }
               msg = `E403: Access Denied to '${file}'`;
          } else if (cmd.startsWith(':sp') || cmd.startsWith(':vsp') || cmd.startsWith(':tabnew')) {
              if (cmd.startsWith(':sp')) layout = 'hsplit';
              if (cmd.startsWith(':vsp')) layout = 'vsplit';
              if (cmd.startsWith(':tabnew')) layout = 'single'; // Tab just clears view effectively for now
              msg = `Buffer Split: ${cmd.split(' ')[1] || 'current'}`;
          } else if (cmd.startsWith(':%s')) {
             return fs.executeSubstitute(newState, cmd.slice(1)); 
          } else if (cmd.startsWith('/')) {
             return { ...fs.executeSearch(newState, cmd.slice(1)), mode: VimMode.NORMAL, commandBuffer: '' };
          } else {
             msg = 'E492: Not an editor command';
          }

          return { 
              ...newState, 
              mode: mode, 
              commandBuffer: '', 
              message: msg, 
              viewLayout: layout,
              lastExecutedCommand: cmd 
          };
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
             return { ...newState, cursor: { ...prev.cursor, x: 0 }, countBuffer: '', lastExecutedCommand: '0' };
         }
         return { ...newState, countBuffer: prev.countBuffer + e.key };
      }

      // 4. Normal Motions & Commands
      switch (e.key) {
        // Navigation
        case 'h': {
            const s = fs.moveCursor(newState, -1 * count, 0);
            s.lastExecutedCommand = 'h';
            return s;
        }
        case 'j': {
            const s = fs.moveCursor(newState, 0, 1 * count);
            s.lastExecutedCommand = 'j';
            return s;
        }
        case 'k': {
            const s = fs.moveCursor(newState, 0, -1 * count);
            s.lastExecutedCommand = 'k';
            return s;
        }
        case 'l': {
            const s = fs.moveCursor(newState, 1 * count, 0);
            s.lastExecutedCommand = 'l';
            return s;
        }
        case 'w': {
            const s = fs.jumpWord(newState, 'next', count);
            s.lastExecutedCommand = 'w';
            return s;
        }
        case 'b': {
            const s = fs.jumpWord(newState, 'prev', count);
            s.lastExecutedCommand = 'b';
            return s;
        }
        case '0': return { ...newState, cursor: { ...prev.cursor, x: 0 }, countBuffer: '', lastExecutedCommand: '0' };
        case '$': return { ...newState, cursor: { ...prev.cursor, x: Math.max(0, (prev.text[prev.cursor.y]||'').length - 1) }, countBuffer: '', lastExecutedCommand: '$' };
        case 'G': return { ...newState, cursor: { x: 0, y: prev.text.length - 1 }, countBuffer: '', lastExecutedCommand: 'G' };
        case 'g': 
           if (prev.motionBuffer === 'g') return { ...newState, cursor: { x: 0, y: 0 }, motionBuffer: '', countBuffer: '', lastExecutedCommand: 'gg' };
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

  const areAllTasksComplete = currentLevel ? currentLevel.tasks.every(t => t.completed) : false;

  // --- RENDER HELPERS ---
  
  const TopButton = ({ label, shortcut, active, onClick }: { label: string, shortcut: string, active: boolean, onClick: () => void }) => (
      <button 
        onClick={onClick}
        className={`px-4 py-2 text-sm font-bold border-r border-gray-800 flex items-center gap-2 transition-colors
            ${active ? 'bg-[#33ff00] text-black' : 'bg-[#0a0a0a] text-gray-400'}
        `}
      >
          <span>{label}</span>
          <span className={`text-[10px] px-1 rounded border ${active ? 'border-black text-black' : 'border-gray-600 text-gray-500'}`}>{shortcut}</span>
      </button>
  );

  const episodes = Array.from(new Set(CURRICULUM.map(l => l.episode)));

  const EditorView = ({ text, cursor, isDimmed }: { text: string[], cursor: {x:number, y:number}, isDimmed?: boolean }) => (
    <div className={`flex-1 font-['Fira_Code'] text-lg relative outline-none bg-[#0a0a0a] p-4 border border-gray-800 shadow-inner overflow-hidden ${isDimmed ? 'opacity-50 grayscale' : ''}`}>
        {text.map((line, idx) => (
            <div key={idx} className="flex min-h-[1.5em]">
            <div className="w-8 text-gray-700 text-right mr-4 select-none text-sm pt-1">{idx + 1}</div>
            <div className="relative whitespace-pre text-[#a9b7c6]">
                {line.length === 0 && cursor.y === idx && !isDimmed ? (
                    <span className="absolute left-0 top-0 bg-[#a9b7c6] opacity-80 w-[1ch] h-[1.2em] animate-pulse"></span>
                ) : (
                line.split('').map((char, charIdx) => {
                    const isCursor = !isDimmed && cursor.y === idx && cursor.x === charIdx;
                    return (
                    <span key={charIdx} className={`${isCursor ? 'bg-[#a9b7c6] text-black' : ''}`}>
                        {char}
                    </span>
                    );
                })
                )}
                {!isDimmed && cursor.y === idx && cursor.x === line.length && line.length > 0 && (
                <span className="absolute bg-[#a9b7c6] opacity-80 w-[1ch] h-[1.2em] animate-pulse" style={{left: `${line.length}ch`}}></span>
                )}
            </div>
            </div>
        ))}
        {Array.from({ length: Math.max(0, 15 - text.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="flex">
                <div className="w-8 text-[#464f5b] text-right mr-4 select-none font-bold">~</div>
            </div>
        ))}
    </div>
  );


  // --- MAIN RENDER SWITCH ---

  if (gameState.status === 'LANDING') {
    return <LandingScreen onStart={() => {
        setGameState(prev => ({...prev, status: 'BOOT'}));
        loadLevel(0);
    }} />;
  }

  if (!currentLevel) {
    return <div className="h-screen bg-[#050505] flex items-center justify-center text-[#33ff00] font-mono">LOADING...</div>;
  }

  // Find the first uncompleted task for highlighting
  const activeTaskIndex = currentLevel.tasks.findIndex(t => !t.completed);

    return (
        <div className="h-screen bg-[#050505] text-[#a9b7c6] font-mono flex flex-col relative overflow-hidden">
            {/* Dialog Interjection HUD */}
            <DialogInterjector message={dialogMsg} source={dialogSource} />
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
      
      {/* Wrapper to apply blur to main UI when Episode Intro is active */}
      <div className={`flex flex-col h-full transition-all duration-700 ${gameState.status === 'EPISODE_INTRO' ? 'blur-sm opacity-40 scale-[0.99]' : ''}`}>
          
          {/* --- TOP PANEL --- */}
          <div className="h-10 border-b border-gray-800 bg-[#050505] flex items-center z-50 select-none">
              <div className="px-4 text-[#33ff00] font-bold tracking-widest text-sm border-r border-gray-800 h-full flex items-center">
                  NEOVIM:2015
              </div>
              <TopButton 
                label="HELP" 
                shortcut="ALT+1" 
                active={gameState.activeDialog === 'HELP'} 
                onClick={() => setGameState(prev => ({...prev, activeDialog: prev.activeDialog === 'HELP' ? 'NONE' : 'HELP'}))} 
              />
              <TopButton 
                label="MAP" 
                shortcut="ALT+2" 
                active={gameState.activeDialog === 'MAP'} 
                onClick={() => setGameState(prev => ({...prev, activeDialog: prev.activeDialog === 'MAP' ? 'NONE' : 'MAP'}))} 
              />
              <TopButton 
                label="NOTES" 
                shortcut="ALT+3" 
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
                    {isLoading && <span className="ml-4 text-xs text-[#cc7832] animate-pulse">:: UPLINK BUSY ::</span>}
                    </div>
                    <div>
                    {currentLevel.config.episodeTitle}
                    </div>
                </div>

                {/* EDITOR OR LOADING */}
                <div className="flex-1 relative flex flex-col">
                    {/* File Name Header within Editor */}
                    <div className="bg-[#2b2b2b] text-gray-400 px-3 py-1 text-sm mb-2 w-fit rounded-t-sm flex justify-between">
                        <span>{currentLevel.config.filename}</span>
                        {gameState.viewLayout !== 'single' && <span className="text-xs text-[#cc7832] uppercase px-2">[SPLIT ACTIVE]</span>}
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
                            <div className="text-[#33ff00] text-sm animate-pulse border border-[#33ff00] px-4 py-2">
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
                                <div className="text-[#00d0ff] text-xs font-mono mb-6">{getRandomDialog('anchor', 'success')}</div>
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
                    
                    {/* Persistent Lore Notification Stack */}
                    <NotificationLog tasks={currentLevel.tasks} visible={gameState.status === 'PLAYING' || gameState.status === 'GAMEOVER'} />

                    {/* Actual Editor Content - With Split Logic */}
                    <div className={`flex-1 flex overflow-hidden ${gameState.viewLayout === 'vsplit' ? 'flex-row gap-1' : 'flex-col gap-1'}`}>
                        <EditorView text={gameState.text} cursor={gameState.cursor} />
                        
                        {/* Simulated Split View */}
                        {gameState.viewLayout !== 'single' && (
                            <>
                                <div className={`bg-gray-800 ${gameState.viewLayout === 'vsplit' ? 'w-[1px]' : 'h-[1px]'}`}></div>
                                <EditorView text={gameState.text} cursor={gameState.cursor} isDimmed={true} />
                            </>
                        )}
                    </div>
                    
                    {/* Vim Status Bar */}
                    <div className="mt-2 bg-[#2b2b2b] text-[#a9b7c6] px-3 py-1 text-sm flex justify-between font-bold border-t border-gray-700 shadow-lg">
                        <div className="flex gap-4 items-center">
                            <span className={`px-2 uppercase text-xs ${gameState.mode === VimMode.NORMAL ? 'bg-[#a9b7c6] text-black' : 'bg-[#cc7832] text-white'}`}>
                                {gameState.mode === VimMode.INSERT && currentLevel.config.episode === 1 ? '-- INSERT (ESC TO EXIT) --' : gameState.mode}
                            </span>
                            {gameState.countBuffer && <span className="text-white text-xs">{gameState.countBuffer}</span>}
                            {gameState.operatorBuffer && <span className="text-yellow-500 text-xs">OP:{gameState.operatorBuffer}</span>}
                            {gameState.commandBuffer && <span className="text-white text-xs">{gameState.commandBuffer}</span>}
                        </div>
                        <div className="flex gap-4 text-xs text-gray-400 items-center">
                            {gameState.message && <span className="text-[#cc7832] italic text-xs mr-4 truncate max-w-[300px]">[{gameState.message}]</span>}
                            <span>Ln {gameState.cursor.y + 1}, Col {gameState.cursor.x + 1}</span>
                            <span>{Math.round(((gameState.cursor.y + 1) / Math.max(1, gameState.text.length)) * 100)}%</span>
                        </div>
                    </div>

                </div>
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
                {(currentLevel.config.timeLimit) && (
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
                            if (isDone) borderClass = 'border-[#33ff00]/50 bg-[#33ff00]/10';
                            if (isActive) borderClass = 'border-white bg-white/10 animate-pulse';

                            return (
                                <div key={idx} className={`flex items-start gap-3 p-2 rounded border transition-all duration-300 ${borderClass} ${isFuture ? 'opacity-75' : 'opacity-100'}`}>
                                    <div className={`mt-1 text-sm ${isDone ? 'text-[#33ff00]' : (isActive ? 'text-white' : 'text-gray-500')}`}>
                                        {isDone ? '☑' : (isActive ? '➤' : '☐')}
                                    </div>
                                    <div className={`text-xs leading-relaxed ${isDone ? 'line-through text-gray-400' : (isActive ? 'text-white font-bold' : 'text-gray-400')}`}>
                                        {task.description}
                                        {task.keyHint && !isDone && (
                                            <span className="ml-2 text-[#33ff00] bg-[#33ff00]/10 px-1 rounded text-[10px] font-mono border border-[#33ff00]/30">{task.keyHint}</span>
                                        )}
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
      </div>
      
      {/* Overlay Episode Screen */}
      {gameState.status === 'EPISODE_INTRO' && (
          <EpisodeScreen 
            episode={currentLevel.config.episode} 
            onContinue={() => setGameState(prev => ({...prev, status: 'BRIEFING'}))} 
          />
      )}

      {/* --- MODALS --- */}
      
      {gameState.activeDialog === 'HELP' && (
          <Modal title="SYSTEM MANUAL (ALT+1)" onClose={() => setGameState(prev => ({...prev, activeDialog: 'NONE'}))}>
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
          <Modal title="OPERATOR NOTES (ALT+3)" onClose={() => setGameState(prev => ({...prev, activeDialog: 'NONE'}))}>
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
          <Modal title="NETWORK MAP (ALT+2)" onClose={() => setGameState(prev => ({...prev, activeDialog: 'NONE'}))}>
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