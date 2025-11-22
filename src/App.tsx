import { useState, useRef } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { WeavingCanvas } from './components/WeavingCanvas';
import { ToolsPanel } from './components/ToolsPanel';
import { Gallery } from './components/Gallery';
import { ShareModal } from './components/ShareModal';
import { musicEngine } from './utils/musicEngine';
import { renderWeavingToCanvas, downloadCanvasAsJPG, getCanvasDataURL } from './utils/exportWeaving';
import { saveDesign } from './utils/api';

export type WeavingStyle = 'plain' | 'twill' | 'herringbone';

export interface WarpRow {
  startColumns: number[]; // Which column numbers (1-4) are selected for this warp
  pattern: number[]; // Array indicating which weft threads this warp goes over
  weftColor: string; // The weft color at the time this row was created
}

function WeaveApp() {
  const [, setLocation] = useLocation();
  const [weavingStyle, setWeavingStyle] = useState<WeavingStyle>('plain');
  const [warpColor, setWarpColor] = useState('#F8E8F1');
  const [weftColor, setWeftColor] = useState('#D2E228');
  const [selectedDrafts, setSelectedDrafts] = useState<number[]>([]); // Multi-select drafts
  const [threadSize, setThreadSize] = useState(20); // Thread width/height in pixels (10-40px range)
  const [warpRows, setWarpRows] = useState<WarpRow[]>([]); // Track added warp rows
  const [toolbarsVisible, setToolbarsVisible] = useState(true); // Track toolbar visibility
  const [showShareModal, setShowShareModal] = useState(false);
  const weavingContainerRef = useRef<HTMLDivElement>(null);

  const handleAddWarpRow = () => {
    if (selectedDrafts.length > 0) {
      const newRow: WarpRow = { 
        startColumns: [...selectedDrafts], 
        pattern: [],
        weftColor: weftColor
      };
      setWarpRows(prev => [...prev, newRow]);
      setSelectedDrafts([]);
    }
  };

  const handleToggleDraft = (draft: number) => {
    setSelectedDrafts(prev => {
      const isCurrentlySelected = prev.includes(draft);
      if (isCurrentlySelected) {
        return prev.filter(d => d !== draft);
      } else {
        return [...prev, draft];
      }
    });
  };

  const handleAutoWeave = () => {
    const patterns = [
      { name: 'diamond', sequence: [[1], [2], [3], [4], [3], [2], [1]] },
      { name: 'triple', sequence: [[1,2,3], [2,3,4], [3,4,1], [4,1,2], [3,4,1], [2,3,4], [1,2,3]] },
      { name: 'simple', sequence: [[1,2], [3,4]] },
      { name: 'rotating', sequence: [[1,2], [2,3], [3,4], [4,1]] }
    ];
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Add rows sequentially with a delay
    randomPattern.sequence.forEach((heddles, index) => {
      setTimeout(() => {
        setWarpRows(prev => [
          ...prev,
          {
            startColumns: heddles,
            pattern: [],
            weftColor: weftColor
          }
        ]);
      }, index * 650); // 650ms delay between each row (slightly longer than animation)
    });
  };

  const handleUndo = () => {
    setWarpRows(prev => prev.slice(0, -1));
  };

  const handleDeleteAll = () => {
    setWarpRows([]);
    setSelectedDrafts([]);
  };

  const handleSaveToCommunity = async () => {
    try {
      // Render the weaving to a canvas at the CURRENT thread size
      // Use a fixed preview size that will clip the design on the right if needed
      const previewSize = 1200;
      const canvas = renderWeavingToCanvas({
        warpColor,
        weftColor,
        threadSize, // Use the current thread size to preserve the "pixel" look
        warpRows,
        width: previewSize,
        height: previewSize
      });
      const imageData = getCanvasDataURL(canvas);
      
      const newDesign = {
        imageData,
        warpRows,
        warpColor,
        weftColor,
        pattern: weavingStyle,
        gridSize: threadSize,
        timestamp: Date.now()
      };
      
      // Save to backend API
      await saveDesign(newDesign);
      console.log('Design saved to community successfully!');
    } catch (error) {
      console.error('Failed to save design to community:', error);
      alert('Failed to save design. Please try again.');
    }
  };

  const handleDownloadJPG = () => {
    // Render the weaving to a canvas
    const canvas = renderWeavingToCanvas({
      warpColor,
      weftColor,
      threadSize,
      warpRows,
      width: 1200,
      height: Math.max(1200, warpRows.length * threadSize)
    });
    downloadCanvasAsJPG(canvas, `toloom-weaving-${Date.now()}.jpg`);
  };

  return (
    <div className="bg-[#fcfaf6] w-full min-h-screen relative">
      <WeavingCanvas
        weavingStyle={weavingStyle}
        warpColor={warpColor}
        weftColor={weftColor}
        threadSize={threadSize}
        warpRows={warpRows}
        canvasRef={weavingContainerRef}
      />
      
      <ToolsPanel
        warpColor={warpColor}
        weftColor={weftColor}
        onWarpColorChange={setWarpColor}
        onWeftColorChange={setWeftColor}
        selectedDrafts={selectedDrafts}
        onToggleDraft={handleToggleDraft}
        weavingStyle={weavingStyle}
        onWeavingStyleChange={setWeavingStyle}
        threadSize={threadSize}
        onThreadSizeChange={setThreadSize}
        onAddWarpRow={handleAddWarpRow}
        onAutoWeave={handleAutoWeave}
        onUndo={handleUndo}
        onDeleteAll={handleDeleteAll}
        toolbarsVisible={toolbarsVisible}
        onToggleToolbars={() => setToolbarsVisible(!toolbarsVisible)}
        onShare={() => setShowShareModal(true)}
        onClose={() => setLocation('/')}
      />

      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          onSaveToCommunity={handleSaveToCommunity}
          onDownloadJPG={handleDownloadJPG}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Gallery} />
      <Route path="/weave" component={WeaveApp} />
    </Switch>
  );
}