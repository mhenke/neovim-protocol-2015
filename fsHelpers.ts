
import { GameState, Cursor, VimMode } from '../types';

// --- Helpers ---

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const isWordChar = (char: string) => /[\w]/.test(char);

// --- Core Logic ---

export const moveCursor = (state: GameState, dx: number, dy: number): GameState => {
  const newY = clamp(state.cursor.y + dy, 0, state.text.length - 1);
  let newX = state.cursor.x + dx;
  
  // Snap to line length (Vim behavior)
  const lineLen = (state.text[newY] || '').length;
  // In normal mode, cursor is on the last char, not after it (unless empty line)
  const maxCol = Math.max(0, state.mode === VimMode.INSERT ? lineLen : lineLen - 1);
  newX = clamp(newX, 0, maxCol);

  return {
    ...state,
    cursor: { x: newX, y: newY },
    motionBuffer: '',
    countBuffer: '' 
  };
};

export const jumpWord = (state: GameState, direction: 'next' | 'prev' | 'end', count: number = 1): GameState => {
  let newState = { ...state };
  for (let i = 0; i < count; i++) {
     newState = jumpWordSingle(newState, direction);
  }
  return { ...newState, countBuffer: '' };
};

const jumpWordSingle = (state: GameState, direction: 'next' | 'prev' | 'end'): GameState => {
  const { text, cursor } = state;
  let { x, y } = cursor;
  
  if (direction === 'next') {
    let hasMoved = false;
    // Find next word start
    while (y < text.length) {
      const line = text[y];
      x++;
      if (x >= line.length) {
        y++;
        x = -1; 
        continue;
      }
      
      const char = line[x];
      const prevChar = x > 0 ? line[x-1] : ' ';
      
      if (char !== ' ' && (x === 0 || prevChar === ' ')) {
         hasMoved = true;
         break;
      }
      if (!isWordChar(char) && char !== ' ' && isWordChar(prevChar)) {
          hasMoved = true;
          break;
      }
    }
    if (!hasMoved) return state; 
  } 
  else if (direction === 'prev') {
      while (y >= 0) {
          x--;
          if (x < 0) {
              y--;
              if (y < 0) break;
              x = text[y].length;
              continue;
          }
          const line = text[y] || '';
          const char = line[x];
          const prevChar = x > 0 ? line[x-1] : ' ';
          
          if (char !== ' ' && (x === 0 || prevChar === ' ')) {
             break;
          }
      }
      if (y < 0) { y = 0; x = 0; }
  }

  const lineLen = (text[y]||'').length;
  x = clamp(x, 0, Math.max(0, lineLen - 1));

  return { ...state, cursor: { x, y } };
};

export const deleteText = (state: GameState, type: 'char' | 'line' | 'word', count: number = 1): GameState => {
  const newText = [...state.text];
  const { x, y } = state.cursor;
  let clipboard = state.clipboard;
  let clipboardType = state.clipboardType;

  if (type === 'char') {
    const line = newText[y];
    if (line.length > 0) {
       // Handle count for 'x' (e.g., 3x)
       const deleteCount = Math.min(count, line.length - x);
       newText[y] = line.slice(0, x) + line.slice(x + deleteCount);
       if (x >= newText[y].length && x > 0) state.cursor.x--;
    }
  } else if (type === 'line') {
    clipboard = "";
    clipboardType = 'line';
    
    // Delete 'count' lines
    for(let i = 0; i < count; i++) {
        if (y < newText.length) {
            clipboard += newText[y] + "\n";
            newText.splice(y, 1);
        }
    }
    if (newText.length === 0) newText.push("");
    if (state.cursor.y >= newText.length) state.cursor.y = Math.max(0, newText.length - 1);
    state.cursor.x = 0; 
  }

  return { ...state, text: newText, clipboard, clipboardType, countBuffer: '', operatorBuffer: '' };
};

// Handle Text Objects like 'ciw' or 'di('
export const handleTextObject = (state: GameState, action: 'd' | 'c', object: 'w' | '(' | '"' | ')'): GameState => {
    const newText = [...state.text];
    const { x, y } = state.cursor;
    const line = newText[y];
    let start = x;
    let end = x;

    // Word
    if (object === 'w') {
        // Find start of word
        while (start > 0 && isWordChar(line[start - 1])) start--;
        // Find end of word
        while (end < line.length && isWordChar(line[end])) end++;
    }
    // Parens
    else if (object === '(' || object === ')') {
        start = line.lastIndexOf('(', x);
        end = line.indexOf(')', x);
        if (start === -1 || end === -1) return { ...state, message: 'No matching parens' };
        start++; // Inner
    }
    // Quotes
    else if (object === '"') {
        // Simple heuristic for quotes
        start = line.lastIndexOf('"', x);
        end = line.indexOf('"', x + 1); // Look forward from current pos if we are not inside?
        
        // If we are inside
        if (start !== -1) {
             const nextQuote = line.indexOf('"', start + 1);
             if (nextQuote !== -1 && x <= nextQuote) {
                 end = nextQuote;
                 start++; // Inner
             } else {
                 return { ...state, message: 'No matching quotes' };
             }
        } else {
            return { ...state, message: 'No matching quotes' };
        }
    }

    if (start >= end) return { ...state, operatorBuffer: '' }; // Invalid range

    const deletedContent = line.slice(start, end);
    newText[y] = line.slice(0, start) + line.slice(end);

    let newState = { 
        ...state, 
        text: newText, 
        cursor: { x: start, y }, 
        clipboard: deletedContent,
        clipboardType: 'char' as any,
        operatorBuffer: '',
        countBuffer: ''
    };

    if (action === 'c') {
        newState.mode = VimMode.INSERT;
        newState.message = '-- INSERT --';
    }

    return newState;
};

export const insertChar = (state: GameState, char: string): GameState => {
  const newText = [...state.text];
  const { x, y } = state.cursor;
  const line = newText[y] || '';
  
  newText[y] = line.slice(0, x) + char + line.slice(x);
  
  return {
      ...state,
      text: newText,
      cursor: { ...state.cursor, x: x + 1 }
  };
};

export const handleNewLine = (state: GameState): GameState => {
    const newText = [...state.text];
    const { x, y } = state.cursor;
    const line = newText[y];
    
    newText[y] = line.slice(0, x);
    newText.splice(y + 1, 0, line.slice(x));
    
    return {
        ...state,
        text: newText,
        cursor: { x: 0, y: y + 1 }
    };
};

export const handleBackspace = (state: GameState): GameState => {
    const newText = [...state.text];
    const { x, y } = state.cursor;
    
    if (state.mode !== VimMode.INSERT) return state;

    if (x > 0) {
        const line = newText[y];
        newText[y] = line.slice(0, x - 1) + line.slice(x);
        return { ...state, text: newText, cursor: { x: x - 1, y } };
    } else if (y > 0) {
        const currLine = newText[y];
        const prevLine = newText[y - 1];
        newText[y - 1] = prevLine + currLine;
        newText.splice(y, 1);
        return { ...state, text: newText, cursor: { x: prevLine.length, y: y - 1 } };
    }
    return state;
};

export const executeSearch = (state: GameState, term: string): GameState => {
    const { text, cursor } = state;
    // Scan from cursor + 1
    let foundY = -1;
    let foundX = -1;
    
    // Scan forward
    for(let i = cursor.y; i < text.length; i++) {
        const line = text[i];
        const startX = (i === cursor.y) ? cursor.x + 1 : 0;
        const idx = line.indexOf(term, startX);
        if (idx !== -1) {
            foundY = i;
            foundX = idx;
            break;
        }
    }
    // Wrap around if not found
    if (foundY === -1) {
        for(let i=0; i <= cursor.y; i++) {
            const line = text[i];
            const idx = line.indexOf(term);
            if (idx !== -1) {
                foundY = i;
                foundX = idx;
                break;
            }
        }
    }

    if (foundY !== -1) {
        return { ...state, cursor: { x: foundX, y: foundY }, message: `/${term} [FOUND]` };
    } else {
        return { ...state, message: "E486: Pattern not found" };
    }
};

export const changeWord = (state: GameState): GameState => {
    const newText = [...state.text];
    const { x, y } = state.cursor;
    const line = newText[y];
    
    // Find word end
    let endX = x;
    while(endX < line.length && line[endX] !== ' ') {
        endX++;
    }
    
    newText[y] = line.slice(0, x) + line.slice(endX);
    
    return {
        ...state,
        text: newText,
        mode: VimMode.INSERT,
        message: '-- INSERT --',
        operatorBuffer: ''
    };
};
