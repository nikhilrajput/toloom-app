import { useState } from 'react';

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
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#F5F3F5',
          borderRadius: '0',
          border: '4px solid #9A8494',
          padding: '32px',
          maxWidth: '380px',
          width: '100%',
          position: 'relative',
          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
          marginTop: '16px',
          marginBottom: '16px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
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

        {/* Add to Community Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', marginBottom: '24px' }}>
          <button
            onClick={handleSaveToCommunity}
            style={{
              backgroundColor: savedToCommunity ? '#7A6B75' : '#8B7990',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 400,
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
              minWidth: '110px'
            }}
            onMouseEnter={(e) => {
              if (!savedToCommunity) {
                e.currentTarget.style.backgroundColor = '#7A6B75';
              }
            }}
            onMouseLeave={(e) => {
              if (!savedToCommunity) {
                e.currentTarget.style.backgroundColor = '#8B7990';
              }
            }}
          >
            {/* Plus Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {savedToCommunity ? 'Added!' : 'Add'}
          </button>
          <div>
            <p style={{ 
              color: '#72686F', 
              fontSize: '14px', 
              fontWeight: 400, 
              lineHeight: '1.4',
              margin: 0
            }}>
              Add to the Community.<br />
              Your woven design will be<br />
              added to the home gallery.
            </p>
          </div>
        </div>

        {/* Download Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: downloaded ? '#7A6B75' : '#8B7990',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 400,
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
              minWidth: '140px'
            }}
            onMouseEnter={(e) => {
              if (!downloaded) {
                e.currentTarget.style.backgroundColor = '#7A6B75';
              }
            }}
            onMouseLeave={(e) => {
              if (!downloaded) {
                e.currentTarget.style.backgroundColor = '#8B7990';
              }
            }}
          >
            {/* Download Arrow Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
            {downloaded ? 'Downloaded!' : 'Download'}
          </button>
          <div>
            <p style={{ 
              color: '#72686F', 
              fontSize: '14px', 
              fontWeight: 400, 
              lineHeight: '1.4',
              margin: 0
            }}>
              Download a JPG of what
              you made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
