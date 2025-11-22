import { useEffect, useState, useRef } from 'react';
import { Share2 } from 'lucide-react';
import { MobileToolsPanel } from './MobileToolsPanel';
import { TabletToolsPanel } from './TabletToolsPanel';
import { DesktopToolsPanel } from './DesktopToolsPanel';
import { CustomColorPicker } from './CustomColorPicker';
import svgPaths from "../imports/svg-p5dm832wl4";

interface ToolsPanelProps {
  warpColor: string;
  weftColor: string;
  onWarpColorChange: (color: string) => void;
  onWeftColorChange: (color: string) => void;
  selectedDrafts: number[];
  onToggleDraft: (draft: number) => void;
  threadSize: number;
  onThreadSizeChange: (size: number) => void;
  onAddWarpRow: () => void;
  onAutoWeave: () => void;
  onUndo: () => void;
  onDeleteAll: () => void;
  toolbarsVisible: boolean;
  onToggleToolbars: () => void;
  onShare?: () => void;
  onClose?: () => void;
  weavingStyle?: string;
  onWeavingStyleChange?: (style: any) => void;
}

export function ToolsPanel({
  warpColor,
  weftColor,
  onWarpColorChange,
  onWeftColorChange,
  selectedDrafts,
  onToggleDraft,
  threadSize,
  onThreadSizeChange,
  onAddWarpRow,
  onAutoWeave,
  onUndo,
  onDeleteAll,
  toolbarsVisible,
  onToggleToolbars,
  onShare,
  onClose,
  weavingStyle,
  onWeavingStyleChange,
}: ToolsPanelProps) {
  const patterns = [1, 2, 3, 4];
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [sliderExpanded, setSliderExpanded] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // State for custom color pickers (desktop/tablet only)
  const [warpColorPickerOpen, setWarpColorPickerOpen] = useState(false);
  const [weftColorPickerOpen, setWeftColorPickerOpen] = useState(false);
  const [savedColors, setSavedColors] = useState<string[]>(() => {
    const saved = localStorage.getItem('weavingSavedColors');
    const defaultColors = ['#F8E8F1', '#FFA3D9', '#D2E228']; // Default warp and weft colors
    if (saved) {
      const parsedColors = JSON.parse(saved);
      // Add default colors if they're not already in the saved colors
      const uniqueColors = [...new Set([...defaultColors, ...parsedColors])];
      return uniqueColors;
    }
    return defaultColors;
  });

  const handleSaveColor = (color: string) => {
    if (!savedColors.includes(color)) {
      const newColors = [...savedColors, color];
      setSavedColors(newColors);
      localStorage.setItem('weavingSavedColors', JSON.stringify(newColors));
    }
  };

  const handleRemoveColor = (color: string) => {
    const newColors = savedColors.filter(c => c !== color);
    setSavedColors(newColors);
    localStorage.setItem('weavingSavedColors', JSON.stringify(newColors));
  };

  // Detect device type
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle click outside slider to collapse it
  useEffect(() => {
    if (!sliderExpanded) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target as Node)) {
        setSliderExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [sliderExpanded]);
  
  // Close color pickers when clicking outside (desktop/tablet only)
  useEffect(() => {
    if (deviceType === 'mobile') return;
    if (!warpColorPickerOpen && !weftColorPickerOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is outside color picker
      const target = e.target as HTMLElement;
      if (!target.closest('.color-picker-container') && !target.closest('.color-picker-button')) {
        setWarpColorPickerOpen(false);
        setWeftColorPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [deviceType, warpColorPickerOpen, weftColorPickerOpen]);

  // Handle keyboard events for number selection, Enter and Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        onToggleDraft(Number(e.key));
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        onAddWarpRow();
        return;
      }
      if (e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onAddWarpRow();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleDraft, onAddWarpRow]);

  // Mobile Layout
  if (deviceType === 'mobile') {
    return (
      <MobileToolsPanel
        warpColor={warpColor}
        weftColor={weftColor}
        onWarpColorChange={onWarpColorChange}
        onWeftColorChange={onWeftColorChange}
        selectedDrafts={selectedDrafts}
        onToggleDraft={onToggleDraft}
        threadSize={threadSize}
        onThreadSizeChange={onThreadSizeChange}
        onAddWarpRow={onAddWarpRow}
        onAutoWeave={onAutoWeave}
        onUndo={onUndo}
        onDeleteAll={onDeleteAll}
        toolbarsVisible={toolbarsVisible}
        onToggleToolbars={onToggleToolbars}
        onShare={onShare}
        onClose={onClose}
        weavingStyle={weavingStyle}
        onWeavingStyleChange={onWeavingStyleChange}
        sliderExpanded={sliderExpanded}
        onSliderToggle={() => setSliderExpanded(!sliderExpanded)}
        sliderRef={sliderRef}
      />
    );
  }

  // Tablet Layout (768-1024px)
  if (deviceType === 'tablet') {
    return (
      <TabletToolsPanel
        warpColor={warpColor}
        weftColor={weftColor}
        onWarpColorChange={onWarpColorChange}
        onWeftColorChange={onWeftColorChange}
        selectedDrafts={selectedDrafts}
        onToggleDraft={onToggleDraft}
        threadSize={threadSize}
        onThreadSizeChange={onThreadSizeChange}
        onAddWarpRow={onAddWarpRow}
        onAutoWeave={onAutoWeave}
        onUndo={onUndo}
        onDeleteAll={onDeleteAll}
        toolbarsVisible={toolbarsVisible}
        onToggleToolbars={onToggleToolbars}
        onShare={onShare}
        onClose={onClose}
        weavingStyle={weavingStyle}
        onWeavingStyleChange={onWeavingStyleChange}
        sliderExpanded={sliderExpanded}
        onSliderToggle={() => setSliderExpanded(!sliderExpanded)}
        sliderRef={sliderRef}
      />
    );
  }

  // Desktop Layout
  if (deviceType === 'desktop') {
    return (
      <DesktopToolsPanel
        warpColor={warpColor}
        weftColor={weftColor}
        onWarpColorChange={onWarpColorChange}
        onWeftColorChange={onWeftColorChange}
        selectedDrafts={selectedDrafts}
        onToggleDraft={onToggleDraft}
        threadSize={threadSize}
        onThreadSizeChange={onThreadSizeChange}
        onAddWarpRow={onAddWarpRow}
        onAutoWeave={onAutoWeave}
        onUndo={onUndo}
        onDeleteAll={onDeleteAll}
        toolbarsVisible={toolbarsVisible}
        onToggleToolbars={onToggleToolbars}
        onShare={onShare}
        onClose={onClose}
        weavingStyle={weavingStyle}
        onWeavingStyleChange={onWeavingStyleChange}
        sliderExpanded={sliderExpanded}
        onSliderToggle={() => setSliderExpanded(!sliderExpanded)}
        sliderRef={sliderRef}
        warpColorPickerOpen={warpColorPickerOpen}
        setWarpColorPickerOpen={setWarpColorPickerOpen}
        weftColorPickerOpen={weftColorPickerOpen}
        setWeftColorPickerOpen={setWeftColorPickerOpen}
        savedColors={savedColors}
        onSaveColor={handleSaveColor}
        onRemoveColor={handleRemoveColor}
      />
    );
  }

  return null;
}