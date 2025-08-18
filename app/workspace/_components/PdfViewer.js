import React, { useState, useEffect } from 'react';

function PdfViewer({ fileUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [viewportHeight, setViewportHeight] = useState('100vh');

  useEffect(() => {
    if (fileUrl) {
      setIsLoading(true);
    }
    
    // Responsive height adjustment
    const updateHeight = () => {
      // On mobile, subtract extra height to account for browser UI
      const isMobile = window.innerWidth < 768;
      const height = isMobile ? 'calc(100vh - 56px)' : '100vh';
      setViewportHeight(height);
    };
    
    // Set initial height
    updateHeight();
    
    // Update height on resize
    window.addEventListener('resize', updateHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateHeight);
  }, [fileUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className="w-full bg-white overflow-auto relative"
      style={{ 
        height: viewportHeight,
        maxHeight: viewportHeight,
      }}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-gray-100 animate-pulse p-2 sm:p-4 md:p-8">
          {/* Page skeleton animation - responsive spacing */}
          <div className="space-y-3 sm:space-y-4">
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-1 sm:space-y-2">
              <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="pt-2 sm:pt-4 space-y-1 sm:space-y-2">
              <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="pt-2 sm:pt-4 space-y-1 sm:space-y-2">
              <div className="h-32 sm:h-64 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      {fileUrl && (
        <div className="w-full h-full">
          <iframe
            src={fileUrl+''}
            className="w-full h-full border-0 block"
            title="PDF Viewer"
            onLoad={handleIframeLoad}
            style={{ 
              visibility: isLoading ? 'hidden' : 'visible',
            }}
            allow="fullscreen"
          />
        </div>
      )}
      
      {/* Mobile controls (optional) */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <button 
          onClick={() => {
            // Try to request fullscreen on mobile
            const iframe = document.querySelector('iframe');
            if (iframe) {
              try {
                if (iframe.requestFullscreen) {
                  iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                  iframe.webkitRequestFullscreen();
                }
              } catch (error) {
                console.log("Fullscreen not supported");
              }
            }
          }}
          className="bg-gray-800 text-white rounded-full p-2 shadow-lg"
          aria-label="Fullscreen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PdfViewer;