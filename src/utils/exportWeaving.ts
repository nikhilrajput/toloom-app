import { WarpRow } from '../App';
import { lightenColor } from './colorUtils';

interface ExportOptions {
  warpColor: string;
  weftColor: string;
  threadSize: number;
  warpRows: WarpRow[];
  width?: number;
  height?: number;
}

export function renderWeavingToCanvas(options: ExportOptions): HTMLCanvasElement {
  const {
    warpColor,
    weftColor,
    threadSize,
    warpRows,
    width = 1200,
    height = 1200
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Set canvas size
  canvas.width = width;
  canvas.height = height;

  // Fill background
  ctx.fillStyle = '#fcfaf6';
  ctx.fillRect(0, 0, width, height);

  const threadGap = threadSize * 2;
  const lightWarpColor = lightenColor(warpColor, 40);
  
  // Calculate how many weft threads (vertical) can fit
  const weftThreads = Math.floor(width / threadGap) + 1;
  
  // Calculate total intersection points - matches WeavingCanvas.tsx logic
  const totalIntersections = Math.floor(width / threadSize) + 1;
  
  // Draw warp threads (vertical - darker and lighter alternating)
  // Dark warp threads at positions 0, 120, 240...
  for (let i = 0; i < weftThreads; i++) {
    const x = i * threadGap;
    ctx.fillStyle = warpColor;
    ctx.fillRect(x, 0, threadSize, height);
  }
  
  // Light warp threads at positions 60, 180, 300...
  for (let i = 0; i < weftThreads; i++) {
    const x = threadSize + i * threadGap;
    ctx.fillStyle = lightWarpColor;
    ctx.fillRect(x, 0, threadSize, height);
  }

  // Generate pattern for a weft row - matches WeavingCanvas.tsx logic
  const generateWeftPattern = (startColumns: number[], totalPositions: number): boolean[] => {
    const pattern: boolean[] = [];
    
    // Auto-weave: if no columns selected, create a simple alternating pattern
    if (startColumns.length === 0) {
      for (let i = 0; i < totalPositions; i++) {
        pattern.push(i % 2 === 0);
      }
      return pattern;
    }
    
    for (let i = 0; i < totalPositions; i++) {
      let isWeftOver = false;
      
      // Check if this position is controlled by any of the selected heddles
      for (const heddle of startColumns) {
        // Each heddle controls every 4th warp thread
        if (i % 4 === (heddle - 1)) {
          isWeftOver = true;
          break;
        }
      }
      
      pattern.push(isWeftOver);
    }
    
    return pattern;
  };

  // Draw weft rows (horizontal) - matches WeavingCanvas.tsx rendering
  warpRows.forEach((row, rowIndex) => {
    const y = rowIndex * threadSize;
    const pattern = generateWeftPattern(row.startColumns, totalIntersections);
    
    // Draw base horizontal weft thread
    ctx.fillStyle = row.weftColor;
    ctx.fillRect(0, y, width, threadSize);
    
    // Draw intersection points showing over/under pattern
    for (let i = 0; i < totalIntersections; i++) {
      const isDarkWarp = i % 2 === 0;
      const isLightWarp = i % 2 === 1;
      const isWeftOver = pattern[i];
      
      let squareColor;
      if (isWeftOver) {
        squareColor = row.weftColor;
      } else if (isDarkWarp) {
        squareColor = warpColor;
      } else if (isLightWarp) {
        squareColor = lightWarpColor;
      }
      
      const x = i * threadSize;
      ctx.fillStyle = squareColor!;
      ctx.fillRect(x, y, threadSize, threadSize);
    }
  });

  return canvas;
}

export function downloadCanvasAsJPG(canvas: HTMLCanvasElement, filename: string) {
  const imageData = canvas.toDataURL('image/jpeg', 0.9);
  const link = document.createElement('a');
  link.download = filename;
  link.href = imageData;
  link.click();
}

export function getCanvasDataURL(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/jpeg', 0.9);
}