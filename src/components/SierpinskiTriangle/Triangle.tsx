import React from 'react';

export interface TriangleProps {
  x: number;
  y: number;
  size: number;
  depth: number;
  targetTime: number;
}

// Heavy computation component that blocks rendering
export const Triangle: React.FC<TriangleProps> = ({ x, y, size, depth, targetTime }) => {
  // Simulate heavy computation by burning CPU cycles
  const start = performance.now();
  while (performance.now() - start < targetTime) {
    // Busy wait to simulate heavy computation
  }

  if (depth === 0) {
    // Render a triangle using CSS and div - fixed 100px square
    const triangleSize = 80; // Triangle height within 100px square
    const triangleWidth = triangleSize * 1.15; // Slightly wider for better proportion
    
    const triangleStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${x + (size - triangleWidth) / 2}px`, // Center within allocated space
      top: `${y + (size - triangleSize) / 2}px`,   // Center within allocated space
      width: 0,
      height: 0,
      borderLeft: `${triangleWidth / 2}px solid transparent`,
      borderRight: `${triangleWidth / 2}px solid transparent`,
      borderBottom: `${triangleSize}px solid hsl(${(depth * 60 + Math.floor(x + y)) % 360}, 70%, 50%)`,
      transformOrigin: 'center bottom',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      target.style.transform = 'scale(1.1)';
      target.style.filter = 'brightness(1.3) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))';
      target.style.zIndex = '10';
      console.log(`🔍 [TRIANGLE] Hovered triangle at (${x}, ${y}) - Fixed 100px square`);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      target.style.transform = 'scale(1)';
      target.style.filter = 'brightness(1)';
      target.style.zIndex = '1';
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      
      // Flash effect on click
      target.style.filter = 'brightness(2) drop-shadow(0 0 12px rgba(255, 255, 0, 1))';
      setTimeout(() => {
        target.style.filter = 'brightness(1.3) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))';
      }, 200);
      
      console.log(`🎯 [TRIANGLE] Clicked triangle at (${x}, ${y}) - Fixed 100px square - This is a leaf triangle!`);
    };

    return (
      <div 
        style={triangleStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        title={`Triangle at (${x}, ${y}) - Fixed 100px square - Click to highlight!`}
      />
    );
  }

  const newSize = size / 2;
  return (
    <div style={{ position: 'relative' }}>
      {/* Top triangle */}
      <Triangle
        x={x + newSize / 2}
        y={y}
        size={newSize}
        depth={depth - 1}
        targetTime={targetTime}
      />
      {/* Bottom left triangle */}
      <Triangle
        x={x}
        y={y + newSize}
        size={newSize}
        depth={depth - 1}
        targetTime={targetTime}
      />
      {/* Bottom right triangle */}
      <Triangle
        x={x + newSize}
        y={y + newSize}
        size={newSize}
        depth={depth - 1}
        targetTime={targetTime}
      />
    </div>
  );
}; 