import React, { useEffect, useRef } from 'react';

interface SplineViewerProps {
  url?: string;
  className?: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ url = "undefined", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Mouse parallax effect
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

    document.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
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
        }}
      />
    </div>
  );
};

export default SplineViewer;