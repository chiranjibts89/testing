import React, { useEffect, useRef } from 'react';

interface SplineViewerProps {
  url?: string;
  className?: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ url = "undefined", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Spline viewer script if not already loaded
    if (!document.querySelector('script[src*="spline-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js';
      script.onload = () => {
        console.log('Spline viewer loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Spline viewer');
      };
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup script on unmount
      // Note: We don't remove the script as it might be used by other components
    };
  }, []);

  useEffect(() => {
    // Mouse parallax effect with improved performance
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      // Clamp movement to prevent excessive rotation
      const clampedX = Math.max(-0.1, Math.min(0.1, deltaX));
      const clampedY = Math.max(-0.1, Math.min(0.1, deltaY));
      
      const splineViewer = containerRef.current.querySelector('spline-viewer');
      if (splineViewer) {
        (splineViewer as HTMLElement).style.transform = `
          perspective(1000px) 
          rotateY(${clampedX * 10}deg) 
          rotateX(${-clampedY * 10}deg)
        `;
        (splineViewer as HTMLElement).style.transition = 'transform 0.1s ease-out';
      }
    };

    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      
      const splineViewer = containerRef.current.querySelector('spline-viewer');
      if (splineViewer) {
        (splineViewer as HTMLElement).style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        (splineViewer as HTMLElement).style.transition = 'transform 0.3s ease-out';
      }
    };

    // Use throttling for better performance
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', throttledMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', throttledMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <spline-viewer 
        url={url}
        style={{
          width: '100%',
          height: '100%',
          willChange: 'transform',
          display: 'block',
          minHeight: '400px',
        }}
        loading="lazy"
      />
      {/* Fallback content in case Spline doesn't load */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#091D23]/50 to-[#774C3E]/50 backdrop-blur-sm rounded-lg pointer-events-none">
        <div className="text-center text-white/70">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
            <p className="text-sm">Loading 3D Experience...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplineViewer;