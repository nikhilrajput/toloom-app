import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from 'wouter';
import ToloomLogo from "../imports/Group60";
import { getDesigns, SavedDesign } from "../utils/api";
import plainPattern from "../assets/plain-pattern.png";
import twillPattern from "../assets/twill-pattern.png";
import basketPattern from "../assets/basket-pattern.png";
import herringbonePattern from "../assets/herringbone-pattern.png";

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
                    className="relative"
                    style={{
                      marginBottom: '30px',
                      paddingLeft: '15px',
                      paddingRight: '15px'
                    }}
                  >
                    <img
                      src={design.imageData}
                      alt="Woven design"
                      className="w-full"
                      style={{ display: 'block' }}
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
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setShowLearnModal(false)}
        >
          <div
            style={{
              backgroundColor: '#F5F3F5',
              borderRadius: '0',
              border: '2px solid #9A8494',
              padding: '48px',
              maxWidth: '56rem',
              width: '100%',
              position: 'relative',
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLearnModal(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                color: '#72686F',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr', gap: '48px' }}>
              {/* Left Column */}
              <div>
                <h2 style={{ color: '#72686F', fontSize: '18px', fontWeight: 400, marginBottom: '24px' }}>
                  Weave patterns similar to a handloom by:
                </h2>
                <p style={{ color: '#72686F', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Tap the numbers in a sequence and press the arrow key or use your keyboard and space bar or return key
                </p>
                
                {/* Number Buttons */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#72686F', fontSize: '18px' }}>
                      {num}
                    </div>
                  ))}
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#72686F' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="4 6 8 10 12 6"></polyline>
                    </svg>
                  </div>
                </div>
                
                <p style={{ color: '#72686F', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Tap the thread button to auto-weave, slider for bigger threads and cloud to only see your pattern.
                </p>
                
                {/* Icon Buttons */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🧵</div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '24px', height: '4px', backgroundColor: '#72686F', borderRadius: '9999px', position: 'relative' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#72686F', borderRadius: '50%', position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)' }}></div>
                    </div>
                  </div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>☁️</div>
                </div>
              </div>

              {/* Dotted Divider - Only on desktop */}
              {window.innerWidth >= 768 && (
                <div style={{ position: 'absolute', left: '50%', top: '48px', bottom: '48px', width: '1px', borderLeft: '2px dotted rgba(114, 104, 111, 0.3)' }}></div>
              )}

              {/* Right Column */}
              <div>
                <h2 style={{ color: '#72686F', fontSize: '18px', fontWeight: 400, marginBottom: '24px' }}>
                  Here are some patterns you can make:
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Plain Pattern */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={plainPattern} alt="Plain pattern" style={{ width: '96px', height: '64px', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ color: '#72686F', fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>Plain</h3>
                      <p style={{ color: '#72686F', fontSize: '14px' }}>1↓ 2↓ 3↓ 4↓</p>
                    </div>
                  </div>

                  {/* Twill Pattern */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={twillPattern} alt="Twill pattern" style={{ width: '96px', height: '64px', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ color: '#72686F', fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>Twill</h3>
                      <p style={{ color: '#72686F', fontSize: '14px' }}>123↓ 234↓ 341↓ 412↓</p>
                    </div>
                  </div>

                  {/* Basket Pattern */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={basketPattern} alt="Basket pattern" style={{ width: '96px', height: '64px', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ color: '#72686F', fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>Basket</h3>
                      <p style={{ color: '#72686F', fontSize: '14px' }}>12↓ 34↓</p>
                    </div>
                  </div>

                  {/* Herringbone Pattern */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={herringbonePattern} alt="Herringbone pattern" style={{ width: '96px', height: '64px', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ color: '#72686F', fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>Herringbone</h3>
                      <p style={{ color: '#72686F', fontSize: '14px' }}>12↓ 23↓ 34↓ 41↓</p>
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