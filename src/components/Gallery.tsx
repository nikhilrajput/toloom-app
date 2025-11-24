import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from 'wouter';
import ToloomLogo from "../imports/Group60";
import { getDesigns, SavedDesign } from "../utils/api";
import { LearnModal } from './LearnModal';

export function Gallery() {
  const [communityDesigns, setCommunityDesigns] = useState<SavedDesign[]>([]);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDesigns();
  }, []);

  const loadDesigns = async () => {
    try {
      setLoading(true);
      const designs = await getDesigns();
      setCommunityDesigns(designs);
    } catch (e) {
      console.error('Failed to load community designs', e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Full-width Container */}
      <div className="relative">
        {/* Navigation Links - Fixed and Floating, Left-aligned within container */}
        <div className="fixed top-[30px] left-[5%] z-20 flex gap-[30px]" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 400 }}>
          <Link href="/weave">
            <span className="cursor-pointer text-[18px]" style={{ color: '#72686F', backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '8px 16px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '3px' }}>
              Weave
            </span>
          </Link>
          <button
            onClick={() => setShowLearnModal(true)}
            className="cursor-pointer text-[18px]"
            style={{ color: '#72686F', backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '8px 16px', textTransform: 'uppercase', letterSpacing: '3px' }}
          >
            Learn
          </button>
        </div>

        {/* Gallery Grid - Centered with padding */}
        <div className="px-0 pb-[10px]">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <p className="text-[#8B7355] text-lg">Loading community designs...</p>
            </div>
          ) : communityDesigns.length > 0 ? (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 6 }}
            >
              <Masonry gutter="60px">
                {communityDesigns.map((design) => (
                  <div
                    key={design.id}
                    style={{
                      width: '100%',
                      display: 'block',
                      boxSizing: 'border-box'
                    }}
                  >
                    <img
                      src={design.imageData}
                      alt="Woven design"
                      style={{ 
                        display: 'block', 
                        width: '100%',
                        maxHeight: '312px', 
                        height: 'auto', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <p className="text-[#8B7355] text-lg">No community designs yet. Be the first to share!</p>
            </div>
          )}
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
        <LearnModal onClose={() => setShowLearnModal(false)} />
      )}
    </div>
  );
}