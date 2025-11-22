import React, { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from 'wouter';
import ToloomLogo from "../imports/Group60";

interface SavedDesign {
  id: string;
  imageData: string;
  warpRows: any[];
  warpColor: string;
  weftColor: string;
  pattern: string;
  gridSize: number;
  timestamp: number;
}

export function Gallery() {
  const [communityDesigns, setCommunityDesigns] = useState<SavedDesign[]>([]);
  const [showLearnModal, setShowLearnModal] = useState(false);

  useEffect(() => {
    // Load community designs from localStorage
    const stored = localStorage.getItem('communityDesigns');
    if (stored) {
      try {
        const designs = JSON.parse(stored);
        setCommunityDesigns(designs);
      } catch (e) {
        console.error('Failed to load community designs', e);
      }
    }
  }, []);

  // Calculate dynamic height based on number of warp rows
  const getTileHeight = (design: SavedDesign) => {
    const baseHeight = 200;
    const maxHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 375;
    const minHeight = 150;
    
    // Height corresponds to how much was woven
    const rowCount = design.warpRows?.length || 0;
    const height = baseHeight + (rowCount * 2);
    
    return Math.max(minHeight, Math.min(maxHeight, height));
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Centered Container */}
      <div className="max-w-[1440px] mx-auto relative">
        {/* Navigation Links - Fixed and Floating, Left-aligned within container */}
        <div className="fixed top-[30px] left-[5%] z-20 flex gap-[46px]" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 500 }}>
          <Link href="/weave">
            <span className="cursor-pointer text-[20px] md:text-[16px]" style={{ color: '#72686F', backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '8px 16px', display: 'inline-block' }}>
              Weave
            </span>
          </Link>
          <button
            onClick={() => setShowLearnModal(true)}
            className="cursor-pointer text-[20px] md:text-[16px]"
            style={{ color: '#72686F', backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '8px 16px' }}
          >
            Learn
          </button>
        </div>

        {/* Gallery Grid - Centered with padding */}
        <div className="px-[5%] pb-[10px]">
          {communityDesigns.length > 0 ? (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 6 }}
            >
              <Masonry gutter="60px">
                {communityDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="relative overflow-hidden"
                    style={{
                      height: `${getTileHeight(design)}px`,
                      marginBottom: '30px',
                      paddingLeft: '15px',
                      paddingRight: '15px'
                    }}
                  >
                    <img
                      src={design.imageData}
                      alt="Woven design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          ) : null}
        </div>
      </div>

      {/* Floating TOLOOM Logo - Centered */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30">
        <div style={{ width: '381.71px', height: '95.79px' }}>
          <ToloomLogo />
        </div>
      </div>

      {/* Learn Modal */}
      {showLearnModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLearnModal(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4">About Toloom</h2>
            <p className="text-[#8B7355] mb-4">
              Toloom is an interactive weaving app that lets you create digital weaving patterns
              using different styles. Select heddles to control the warp threads, choose your
              colors, and create beautiful woven designs.
            </p>
            <button
              onClick={() => setShowLearnModal(false)}
              className="px-4 py-2 bg-[#8B7355] text-white rounded hover:bg-[#6B5335] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}