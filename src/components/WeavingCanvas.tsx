import { WeavingStyle } from '../App';
import { WarpRow } from '../App';
import React, { useState, useEffect } from 'react';

interface WeavingCanvasProps {
  weavingStyle: WeavingStyle;
  warpColor: string;
  weftColor: string;
  threadSize: number;
  warpRows: WarpRow[];
  canvasRef?: React.RefObject<HTMLDivElement>;
}

// Helper function to create a lighter variation of a color
const lightenColor = (hex: string, percent: number = 40): string => {
  // Remove the hash if present
  hex = hex.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Lighten by moving towards white
  const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

export function WeavingCanvas({ weavingStyle, warpColor, weftColor, threadSize, warpRows, canvasRef }: WeavingCanvasProps) {
  const [animatingRows, setAnimatingRows] = useState<Set<number>>(new Set());
  
  // When new rows are added, mark them for animation
  useEffect(() => {
    if (warpRows.length > 0) {
      const lastRowIndex = warpRows.length - 1;
      setAnimatingRows(prev => new Set(prev).add(lastRowIndex));
      
      // Remove from animating set after animation completes
      const timer = setTimeout(() => {
        setAnimatingRows(prev => {
          const next = new Set(prev);
          next.delete(lastRowIndex);
          return next;
        });
      }, 600); // Match animation duration
      
      return () => clearTimeout(timer);
    }
  }, [warpRows.length]);
  
  // Calculate grid dimensions based on thread size
  const threadGap = threadSize * 2; // Gap is double the thread size
  
  // Use a very large canvas that extends far beyond viewport for scrolling
  const maxCanvasWidth = 3000;
  
  // Dynamic canvas height: starts at 2500px, expands as user weaves up to 10000px
  const minCanvasHeight = 2500;
  const maxCanvasHeight = 10000;
  
  // Calculate required height based on woven rows (each row takes threadSize height)
  // Add some extra space (1000px) for comfortable weaving
  const requiredHeight = Math.max(
    minCanvasHeight, 
    Math.min(maxCanvasHeight, (warpRows.length * threadSize) + 1000)
  );
  
  // Calculate how many weft threads (vertical) can fit
  const weftThreads = Math.floor(maxCanvasWidth / threadGap) + 1;
  
  // Calculate total intersection points (threads + gaps between them)
  // Positions: thread at 0, gap at 60, thread at 120, gap at 180, etc.
  const totalIntersections = Math.floor(maxCanvasWidth / threadSize) + 1;

  // Generate lighter variation of warp color for alternating threads
  const lightWarpColor = lightenColor(warpColor, 40);

  // Generate pattern for a weft row based on multiple start columns and weaving style
  // Returns array where true = weft is on top (blue shows), false = warp is on top (pink/white shows)
  const generateWeftPattern = (startColumns: number[], totalPositions: number, rowIndex: number, style: WeavingStyle): boolean[] => {
    const pattern: boolean[] = [];
    
    // Auto-weave: if no columns selected, create a simple alternating pattern
    if (startColumns.length === 0) {
      for (let i = 0; i < totalPositions; i++) {
        pattern.push(i % 2 === 0);
      }
      return pattern;
    }
    
    // Calculate shift based on weaving style
    let shift = 0;
    if (style === 'Twill') {
      // Twill: pattern shifts by 1 position each row, creating diagonal lines
      shift = rowIndex % 4; // Repeat every 4 rows for a 2/2 twill
    } else if (style === 'Herringbone') {
      // Herringbone: pattern shifts then reverses, creating zigzag
      const zigzagPeriod = 8; // Change direction every 8 rows
      const posInCycle = rowIndex % (zigzagPeriod * 2);
      if (posInCycle < zigzagPeriod) {
        // Ascending phase
        shift = posInCycle % 4;
      } else {
        // Descending phase (reverse direction)
        shift = (zigzagPeriod - (posInCycle - zigzagPeriod) - 1) % 4;
      }
    }
    // Plain weave: shift = 0 (no shift)
    
    // Each position is a single warp thread (column)
    // Warp threads alternate: dark, light, dark, light...
    // Position 0 = Column 1 (dark), Position 1 = Column 2 (light), etc.
    // 
    // Heddle threading (4-shaft loom):
    // Heddle 1: columns 1, 5, 9, 13... → positions 0, 4, 8, 12... → i % 4 === 0
    // Heddle 2: columns 2, 6, 10, 14... → positions 1, 5, 9, 13... → i % 4 === 1
    // Heddle 3: columns 3, 7, 11, 15... → positions 2, 6, 10, 14... → i % 4 === 2
    // Heddle 4: columns 4, 8, 12, 16... → positions 3, 7, 11, 15... → i % 4 === 3
    
    for (let i = 0; i < totalPositions; i++) {
      let isWeftOver = false;
      
      // Apply shift for twill/herringbone patterns
      const shiftedPosition = (i - shift + totalPositions) % totalPositions;
      
      // Check if this shifted position is controlled by any of the selected heddles
      for (const heddle of startColumns) {
        // Each heddle controls every 4th warp thread
        if (shiftedPosition % 4 === (heddle - 1)) {
          isWeftOver = true;
          break;
        }
      }
      
      pattern.push(isWeftOver);
    }
    
    return pattern;
  };

  return (
    <div ref={canvasRef} className="absolute left-0 top-0 w-full h-full">
      {/* Darker warp threads (vertical) - at positions 0, 120, 240... */}
      <div className="absolute left-0 top-0">
        {Array.from({ length: weftThreads }).map((_, i) => (
          <div
            key={`warp-dark-${i}`}
            className="absolute top-0"
            style={{
              backgroundColor: warpColor,
              width: `${threadSize}px`,
              height: `${requiredHeight}px`,
              left: `${i * threadGap}px`,
            }}
          />
        ))}
      </div>

      {/* Lighter warp threads (vertical) - at positions 60, 180, 300... */}
      <div className="absolute left-0 top-0">
        {Array.from({ length: weftThreads }).map((_, i) => (
          <div
            key={`warp-light-${i}`}
            className="absolute top-0"
            style={{
              backgroundColor: lightWarpColor,
              width: `${threadSize}px`,
              height: `${requiredHeight}px`,
              left: `${threadSize + i * threadGap}px`,
            }}
          />
        ))}
      </div>

      {/* Weft threads (horizontal) - added sequentially by user */}
      <div className="absolute left-0 top-[64px]">
        {warpRows.map((warpRow, rowIndex) => {
          const pattern = generateWeftPattern(warpRow.startColumns, totalIntersections, rowIndex, weavingStyle);
          const rowWeftColor = warpRow.weftColor; // Use the weft color from when this row was created
          const isAnimating = animatingRows.has(rowIndex);
          // Alternate direction: even rows go left-to-right, odd rows go right-to-left
          const isLeftToRight = rowIndex % 2 === 0;
          
          return (
            <div
              key={`weft-${rowIndex}`}
              className="absolute left-0"
              style={{
                top: `${rowIndex * threadSize}px`,
                width: `${maxCanvasWidth}px`,
                height: `${threadSize}px`,
                clipPath: isAnimating 
                  ? (isLeftToRight ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)')
                  : 'inset(0 0 0 0)',
                animation: isAnimating 
                  ? (isLeftToRight ? 'weaveLTR 0.6s ease-out forwards' : 'weaveRTL 0.6s ease-out forwards')
                  : 'none',
              }}
            >
              {/* Base horizontal weft thread */}
              <div 
                className="absolute left-0 h-full"
                style={{
                  backgroundColor: rowWeftColor,
                  width: `${maxCanvasWidth}px`,
                }}
              />
              
              {/* Intersection points showing over/under pattern */}
              {/* Render at every threadSize interval (both pink and white warp threads) */}
              {Array.from({ length: totalIntersections }).map((_, i) => {
                const isDarkWarp = i % 2 === 0; // Even positions are darker warp threads
                const isLightWarp = i % 2 === 1; // Odd positions are lighter warp threads
                const isWeftOver = pattern[i]; // Is weft thread on top (blue shows)?
                
                // Determine what should be visible at this position
                let squareColor;
                if (isWeftOver) {
                  // Weft is over - show weft thread color from this row
                  squareColor = rowWeftColor;
                } else if (isDarkWarp) {
                  // Warp is over at a darker warp thread position
                  squareColor = warpColor;
                } else if (isLightWarp) {
                  // Warp is over at a lighter warp thread position
                  squareColor = lightWarpColor;
                }
                
                return (
                  <div
                    key={`intersection-${rowIndex}-${i}`}
                    className="absolute"
                    style={{
                      left: `${i * threadSize}px`,
                      width: `${threadSize}px`,
                      height: `${threadSize}px`,
                      backgroundColor: squareColor,
                      zIndex: isWeftOver ? 10 : 5,
                    }}
                    title={`Row ${rowIndex + 1}, Pos ${i}: ${isWeftOver ? 'Weft over' : (isDarkWarp ? 'Dark warp' : 'Light warp')} at ${i * threadSize}px`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}