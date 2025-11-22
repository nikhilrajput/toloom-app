import React, { useState } from 'react';
import { X, Download, Globe } from 'lucide-react';

interface ShareModalProps {
  onClose: () => void;
  onSaveToCommunity: () => void;
  onDownloadJPG: () => void;
}

export function ShareModal({ onClose, onSaveToCommunity, onDownloadJPG }: ShareModalProps) {
  const [savedToCommunity, setSavedToCommunity] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSaveToCommunity = () => {
    onSaveToCommunity();
    setSavedToCommunity(true);
    setTimeout(() => setSavedToCommunity(false), 2000);
  };

  const handleDownload = () => {
    onDownloadJPG();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-6">Share Your Design</h2>

        {/* Save to Community */}
        <button
          onClick={handleSaveToCommunity}
          className="w-full mb-4 px-4 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#6B5335] transition-colors flex items-center justify-center gap-2"
        >
          <Globe className="w-5 h-5" />
          {savedToCommunity ? 'Saved to Community!' : 'Save to Community'}
        </button>

        {/* Download JPG */}
        <button
          onClick={handleDownload}
          className="w-full px-4 py-3 bg-white text-[#8B7355] border-2 border-[#8B7355] rounded-lg hover:bg-[#FFF6E5] transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          {downloaded ? 'Downloaded!' : 'Download JPG'}
        </button>
      </div>
    </div>
  );
}
