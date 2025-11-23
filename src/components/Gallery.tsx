import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from 'wouter';
import ToloomLogo from "../imports/Group60";
import { getDesigns, SavedDesign } from "../utils/api";

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
        <div className="fixed top-[30px] left-[5%] z-20 flex gap-[46px]" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 400 }}>
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
        <div className="px-[5%] pb-[10px]">
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
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLearnModal(false)}
        >
          <div
            className="bg-[#F5F3F5] rounded-lg p-12 max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLearnModal(false)}
              className="absolute top-6 right-6 text-[#72686F] hover:text-[#524952] transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-[#72686F] text-lg font-normal mb-6">
                    Weave patterns similar to a handloom by:
                  </h2>
                  <p className="text-[#72686F] text-base leading-relaxed">
                    Tap the numbers in a sequence and press the arrow key or use your keyboard and space bar or return key
                  </p>
                  
                  {/* Number Buttons */}
                  <div className="flex gap-4 mt-6 mb-8">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#72686F] text-lg">1</div>
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#72686F] text-lg">2</div>
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#72686F] text-lg">3</div>
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#72686F] text-lg">4</div>
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#72686F] text-lg">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 4 10 8 6 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-[#72686F] text-base leading-relaxed">
                    Tap the thread button to auto-weave, slider for bigger threads and cloud to only see your pattern.
                  </p>
                  
                  {/* Icon Buttons */}
                  <div className="flex gap-4 mt-6">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">🧵</div>
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                      <div className="w-6 h-1 bg-[#72686F] rounded-full relative">
                        <div className="w-3 h-3 bg-[#72686F] rounded-full absolute -top-1 left-1/2 -translate-x-1/2"></div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">☁️</div>
                  </div>
                </div>
              </div>

              {/* Dotted Divider */}
              <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-px border-l-2 border-dotted border-[#72686F]/30"></div>

              {/* Right Column */}
              <div>
                <h2 className="text-[#72686F] text-lg font-normal mb-6">
                  Here are some patterns you can make:
                </h2>
                
                <div className="space-y-6">
                  {/* Plain Pattern */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-lg bg-[#E8D5E8] flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="w-3 h-3 bg-[#A88FA8]"></div>
                        <div className="w-3 h-3 bg-[#C8B5C8]"></div>
                        <div className="w-3 h-3 bg-[#C8B5C8]"></div>
                        <div className="w-3 h-3 bg-[#A88FA8]"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#72686F] font-semibold text-base mb-1">Plain</h3>
                      <p className="text-[#72686F] text-sm">1↓ 2↓ 3↓ 4↓</p>
                    </div>
                  </div>

                  {/* Twill Pattern */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-lg bg-[#D5C8D5] flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="w-2 h-2 bg-[#8F7A8F]"></div>
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#8F7A8F]"></div>
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#72686F] font-semibold text-base mb-1">Twill</h3>
                      <p className="text-[#72686F] text-sm">123↓ 234↓ 341↓ 412↓</p>
                    </div>
                  </div>

                  {/* Basket Pattern */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-lg bg-[#E0D5E0] flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-1">
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#72686F] font-semibold text-base mb-1">Basket</h3>
                      <p className="text-[#72686F] text-sm">12↓ 34↓</p>
                    </div>
                  </div>

                  {/* Herringbone Pattern */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-lg bg-[#E8D5E8] flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                        <div className="w-2 h-2 bg-[#A88FA8]"></div>
                        <div className="w-2 h-2 bg-[#C8B5C8]"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#72686F] font-semibold text-base mb-1">Herringbone</h3>
                      <p className="text-[#72686F] text-sm">12↓ 23↓ 34↓ 41↓</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}