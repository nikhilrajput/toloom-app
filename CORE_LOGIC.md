# Toloom Core Logic Explanation

## Overview
Toloom is a digital weaving application that simulates a 4-shaft loom. Users create weaving patterns by selecting heddles (1-4) and adding weft rows, which creates visual patterns based on how threads interlace.

---

## 🏗️ Architecture

### Main Components

1. **App.tsx** - Main application state and routing
2. **WeavingCanvas.tsx** - Core rendering logic for the weaving visualization
3. **ToolsPanel.tsx** - UI controls for color, pattern selection, and actions
4. **Gallery.tsx** - Community gallery of saved designs
5. **exportWeaving.ts** - Canvas rendering for export/download

---

## 🧵 Core Weaving Concepts

### 1. **Warp vs Weft**
- **Warp threads**: Vertical threads (run top to bottom)
- **Weft threads**: Horizontal threads (run left to right, added row by row)

### 2. **4-Shaft Loom System**
The app simulates a 4-shaft loom where:
- **Heddles 1-4** control different sets of warp threads
- Each heddle controls every 4th warp thread:
  - Heddle 1: positions 0, 4, 8, 12... (i % 4 === 0)
  - Heddle 2: positions 1, 5, 9, 13... (i % 4 === 1)
  - Heddle 3: positions 2, 6, 10, 14... (i % 4 === 2)
  - Heddle 4: positions 3, 7, 11, 15... (i % 4 === 3)

### 3. **Over/Under Pattern**
At each intersection:
- **Weft over warp** = Weft color shows
- **Warp over weft** = Warp color shows

---

## 📊 Data Structures

### WarpRow Interface
```typescript
interface WarpRow {
  startColumns: number[];  // Selected heddles (1-4) for this row
  pattern: number[];       // (Currently unused, reserved for future)
  weftColor: string;       // Weft color when this row was created
}
```

### State Management (App.tsx)
```typescript
- warpRows: WarpRow[]        // Array of all woven rows
- selectedDrafts: number[]   // Currently selected heddles (1-4)
- warpColor: string          // Color of warp threads
- weftColor: string          // Color of weft threads
- weavingStyle: 'plain' | 'twill' | 'herringbone'
- threadSize: number         // Pixel size of threads (10-40px)
```

---

## 🎨 Pattern Generation Logic

### Core Function: `generateWeftPattern()`

Located in `WeavingCanvas.tsx`, this function determines which warp threads the weft goes over/under.

#### Step-by-Step:

1. **Input**: 
   - `startColumns`: Selected heddles (e.g., [1, 3])
   - `totalPositions`: Number of warp thread positions
   - `rowIndex`: Current row number
   - `style`: Weaving style (plain/twill/herringbone)

2. **Style-Based Shifting**:
   ```typescript
   // Plain: No shift (shift = 0)
   // Twill: Shifts by 1 each row (creates diagonal lines)
   // Herringbone: Shifts then reverses (creates zigzag)
   ```

3. **Pattern Calculation**:
   ```typescript
   for each position i:
     shiftedPosition = (i - shift) % totalPositions
     if shiftedPosition % 4 === (heddle - 1):
       isWeftOver = true  // Weft goes over this warp thread
   ```

4. **Output**: Boolean array where `true` = weft over, `false` = warp over

### Example Pattern Generation

**Selected Heddles: [1, 3]**
- Heddle 1 controls: positions 0, 4, 8, 12...
- Heddle 3 controls: positions 2, 6, 10, 14...
- Result: Weft goes over at positions 0, 2, 4, 6, 8, 10, 12, 14...

---

## 🖼️ Rendering Logic

### WeavingCanvas Component

#### 1. **Warp Threads (Vertical)**
- **Dark warp threads**: At positions 0, 120, 240... (every `threadGap`)
- **Light warp threads**: At positions 60, 180, 300... (offset by `threadSize`)
- Light color = `lightenColor(warpColor, 7%)` for subtle contrast

#### 2. **Weft Threads (Horizontal)**
- Each `WarpRow` becomes one horizontal weft thread
- Position: `y = rowIndex * threadSize`
- Width: Full canvas width (3000px)

#### 3. **Intersection Points**
For each weft row, at every `threadSize` interval:
```typescript
if (isWeftOver):
  show weftColor
else if (isDarkWarp):
  show warpColor
else if (isLightWarp):
  show lightWarpColor
```

#### 4. **Animation**
- New rows animate in with a weave effect
- Even rows: left-to-right animation
- Odd rows: right-to-left animation
- Duration: 600ms

---

## 🎯 Key User Actions

### 1. **Select Heddles**
```typescript
handleToggleDraft(draft: number)
```
- Toggles heddle selection (1-4)
- Multiple heddles can be selected
- Stored in `selectedDrafts` array

### 2. **Add Weft Row**
```typescript
handleAddWarpRow()
```
- Creates new `WarpRow` with:
  - `startColumns`: Currently selected heddles
  - `weftColor`: Current weft color
- Adds to `warpRows` array
- Clears selection

### 3. **Auto Weave**
```typescript
handleAutoWeave()
```
- Generates random pattern sequences:
  - Diamond: [1] → [2] → [3] → [4] → [3] → [2] → [1]
  - Triple: [1,2,3] → [2,3,4] → [3,4,1] → ...
  - Simple: [1,2] → [3,4]
  - Rotating: [1,2] → [2,3] → [3,4] → [4,1]
- Adds rows with 650ms delay for animation

### 4. **Save Design**
```typescript
handleSaveToCommunity()
```
- Renders weaving to canvas using `renderWeavingToCanvas()`
- Calculates dynamic height: `wovenHeight + 200px padding`
- Converts to JPEG base64
- Saves to PostgreSQL via API

---

## 🔄 Weaving Styles

### Plain Weave
- No shift applied
- Simple over/under pattern
- Classic checkerboard-like appearance

### Twill
```typescript
shift = rowIndex % 4
```
- Pattern shifts by 1 position each row
- Creates diagonal lines
- Repeats every 4 rows

### Herringbone
```typescript
zigzagPeriod = 8
if (posInCycle < zigzagPeriod):
  shift = posInCycle % 4  // Ascending
else:
  shift = (zigzagPeriod - (posInCycle - zigzagPeriod) - 1) % 4  // Descending
```
- Shifts then reverses direction
- Creates zigzag/chevron pattern
- Changes direction every 8 rows

---

## 💾 Data Flow

### Saving a Design
```
User clicks "Save to Community"
  ↓
renderWeavingToCanvas() creates HTML5 canvas
  ↓
getCanvasDataURL() converts to JPEG base64
  ↓
saveDesign() POSTs to /api/designs
  ↓
Server saves to PostgreSQL:
  - image_data (base64 JPEG)
  - warp_rows (JSON)
  - colors, pattern, grid_size, timestamp
```

### Loading Designs
```
Gallery component mounts
  ↓
getDesigns() fetches from /api/designs
  ↓
Server queries PostgreSQL
  ↓
Returns array of SavedDesign objects
  ↓
Gallery displays in masonry layout
```

---

## 🎨 Color System

### Warp Color Variations
- **Base warp color**: User-selected
- **Light warp color**: `lightenColor(warpColor, 7%)`
- Alternates: dark, light, dark, light...

### Weft Color
- Each row stores its own `weftColor`
- Allows color changes mid-weave
- Preserved when row is created

---

## 📐 Canvas Dimensions

### Dynamic Sizing
- **Width**: Fixed at 3000px (scrollable)
- **Height**: 
  - Minimum: 2500px
  - Maximum: 10000px
  - Calculated: `(warpRows.length * threadSize) + 1000px`

### Thread Spacing
- **Thread gap**: `threadSize * 2`
- **Thread size**: 10-40px (user adjustable)
- Default: 20px

---

## 🔧 Key Utilities

### `lightenColor(hex, percent)`
- Lightens a hex color by moving towards white
- Used for alternating warp thread colors

### `renderWeavingToCanvas(options)`
- Renders weaving to HTML5 canvas for export
- Matches visual rendering logic
- Used for downloads and community saves

---

## 🎵 Additional Features

### Music Engine
- Plays sounds during weaving (optional)
- Located in `utils/musicEngine.ts`

### Analytics
- Google Analytics integration
- Tracks user actions (weave, save, share, etc.)

---

## 🧩 Summary

**The core logic is:**
1. User selects heddles (1-4) → controls which warp threads are lifted
2. User adds weft row → creates pattern based on selected heddles
3. Pattern generation → calculates over/under at each intersection
4. Rendering → displays warp (vertical) and weft (horizontal) threads
5. Visual result → shows interwoven pattern based on selections

**The magic happens in `generateWeftPattern()`** which translates heddle selections into visual patterns using modular arithmetic and style-based shifting.

