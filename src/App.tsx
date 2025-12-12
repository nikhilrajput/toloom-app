import { useState, useRef, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { WeavingCanvas } from './components/WeavingCanvas';
import { ToolsPanel } from './components/ToolsPanel';
import { Gallery } from './components/Gallery';
import { ShareModal } from './components/ShareModal';
import { LearnModal } from './components/LearnModal';
import { musicEngine } from './utils/musicEngine';
import { renderWeavingToCanvas, downloadCanvasAsJPG, getCanvasDataURL } from './utils/exportWeaving';
import { saveDesign } from './utils/api';
import { initGA, trackEvent } from './lib/analytics';
import { useAnalytics } from './hooks/use-analytics';

export type WeavingStyle = 'plain' | 'twill' | 'herringbone';

export interface WarpRow {
  startColumns: number[]; // Which column numbers (1-6) are selected for this warp
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
  const [showLearnModal, setShowLearnModal] = useState(false);
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
    trackEvent('auto_weave_clicked', 'creation_tools', 'auto_weave');
    
    const patterns = [
      { name: 'diamond', sequence: [[1], [2], [3], [4], [5], [6], [5], [4], [3], [2], [1]] },
      { name: 'triple', sequence: [[1,2,3], [2,3,4], [3,4,5], [4,5,6], [5,6,1], [6,1,2], [5,6,1], [4,5,6], [3,4,5], [2,3,4], [1,2,3]] },
      { name: 'simple', sequence: [[1,2,3], [4,5,6]] },
      { name: 'rotating', sequence: [[1,2], [2,3], [3,4], [4,5], [5,6], [6,1]] },
      { name: 'wave', sequence: [[1,2], [2,3,4], [3,4,5,6], [4,5,6], [5,6], [6]] }
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
    trackEvent('undo_clicked', 'creation_tools', 'undo');
    setWarpRows(prev => prev.slice(0, -1));
  };

  const handleDeleteAll = () => {
    setWarpRows([]);
    setSelectedDrafts([]);
  };

  const handleSaveToCommunity = async () => {
    try {
      // Render the weaving to a canvas with varying height based on how much was woven
      // This creates the masonry layout effect in the gallery
      // Use actual woven height with modest padding (200px) for visual breathing room
      const wovenHeight = warpRows.length * threadSize;
      const exportHeight = Math.max(400, wovenHeight + 200); // Minimum 400px, or woven height + 200px padding
      
      const canvas = renderWeavingToCanvas({
        warpColor,
        weftColor,
        threadSize, // Use the current thread size to preserve the "pixel" look
        warpRows,
        width: 1200,
        height: exportHeight
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
      trackEvent('community_save_success', 'share_flow', 'save_to_community', warpRows.length);
      console.log('Design saved to community successfully!');
    } catch (error) {
      trackEvent('community_save_error', 'share_flow', 'save_to_community');
      console.error('Failed to save design to community:', error);
      alert('Failed to save design. Please try again.');
    }
  };

  const handleDownloadJPG = () => {
    // Render the weaving to a canvas with the same height logic as community saves
    // This ensures downloaded and shared images have consistent proportions
    const wovenHeight = warpRows.length * threadSize;
    const exportHeight = Math.max(400, wovenHeight + 200); // Minimum 400px, or woven height + 200px padding
    
    const canvas = renderWeavingToCanvas({
      warpColor,
      weftColor,
      threadSize,
      warpRows,
      width: 1200,
      height: exportHeight
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
        onShare={() => {
          trackEvent('share_modal_open', 'share_flow', 'open_share_modal');
          setShowShareModal(true);
        }}
        onLearn={() => {
          trackEvent('learn_modal_open', 'help', 'open_learn_modal');
          setShowLearnModal(true);
        }}
        onClose={() => setLocation('/')}
      />

      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          onSaveToCommunity={handleSaveToCommunity}
          onDownloadJPG={handleDownloadJPG}
        />
      )}

      {showLearnModal && (
        <LearnModal
          onClose={() => setShowLearnModal(false)}
        />
      )}
    </div>
  );
}

function Router() {
  // Track page views when routes change - from blueprint:javascript_google_analytics
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Gallery} />
      <Route path="/weave" component={WeaveApp} />
    </Switch>
  );
}

export default function App() {
  // Initialize Google Analytics when app loads - from blueprint:javascript_google_analytics
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return <Router />;
}