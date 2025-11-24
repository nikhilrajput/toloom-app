import plainPattern from "../assets/plain-pattern.png";
import twillPattern from "../assets/twill-pattern.png";
import basketPattern from "../assets/basket-pattern.png";
import herringbonePattern from "../assets/herringbone-pattern.png";

interface LearnModalProps {
  onClose: () => void;
}

export function LearnModal({ onClose }: LearnModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '16px',
        paddingTop: '32px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#F5F3F5',
          borderRadius: '0',
          border: '4px solid #9A8494',
          maxWidth: '56rem',
          width: '100%',
          maxHeight: 'calc(100vh - 64px)',
          position: 'relative',
          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: '#72686F',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10
          }}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Scrollable Content Container */}
        <div style={{ 
          overflowY: 'auto', 
          padding: '48px',
          paddingLeft: '48px',
          paddingRight: '48px',
          paddingBottom: '64px',
          flex: 1,
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* Two Column Layout */}
          <div className="learn-modal-grid" style={{ position: 'relative', width: '100%', maxWidth: '100%' }}>
          {/* Left Column */}
          <div>
            <h2 style={{ color: '#72686F', fontSize: '18px', fontWeight: 400, marginBottom: '24px' }}>
              Weave patterns similar to a handloom by:
            </h2>
            <p style={{ color: '#72686F', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              Tapping the numbers in a sequence and pressing the arrow button or use your keyboard keys followed by space bar or return key
            </p>
            
            {/* Number Buttons */}
            <div className="learn-modal-buttons" style={{ display: 'flex', marginBottom: '32px' }}>
              {[1, 2, 3, 4].map(num => (
                <div key={num} className="learn-modal-button">
                  {num}
                </div>
              ))}
              <div className="learn-modal-button">
                <svg className="learn-modal-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 6 8 10 12 6"></polyline>
                </svg>
              </div>
            </div>
            
            <p style={{ color: '#72686F', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              Tap the thread button to auto-weave, slider for bigger threads and the cloud/sun emoji to only see your pattern and nothing else.
            </p>
            
            {/* Icon Buttons */}
            <div className="learn-modal-buttons">
              <div className="learn-modal-button learn-modal-emoji">🧵</div>
              <div className="learn-modal-button">
                <div className="learn-modal-slider">
                  <div className="learn-modal-slider-thumb"></div>
                </div>
              </div>
              <div className="learn-modal-button learn-modal-emoji">⛅</div>
            </div>
          </div>

          {/* Dotted Divider - Only on desktop */}
          <div className="learn-modal-divider" style={{ position: 'absolute', left: '50%', top: '48px', bottom: '48px', width: '1px', borderLeft: '2px dotted rgba(114, 104, 111, 0.3)' }}></div>

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
    </div>
  );
}
