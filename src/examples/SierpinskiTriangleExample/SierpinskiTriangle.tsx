import React, { useState, useEffect, useRef } from 'react';
import { Triangle } from '../../components/SierpinskiTriangle';
import './SierpinskiTriangle.css';

interface SierpinskiTriangleProps {
  onBack?: () => void;
}

const SierpinskiTriangle: React.FC<SierpinskiTriangleProps> = ({ onBack }) => {
  const [depth, setDepth] = useState(6);
  const [targetTime, setTargetTime] = useState(0.5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState(0);
  const [triangleSize, setTriangleSize] = useState(250);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  // Track render performance
  useEffect(() => {
    const renderStart = performance.now();
    return () => {
      const renderEnd = performance.now();
      setLastRenderTime(renderEnd - renderStart);
      setRenderCount(prev => prev + 1);
    };
  });

  const startAnimation = () => {
    setIsAnimating(true);
    startTimeRef.current = performance.now();
    
    const animate = () => {
      const elapsed = performance.now() - (startTimeRef.current || 0);
      
      // Animate depth with a slower cycle (every 4 seconds)
      const depthCycle = Math.sin(elapsed * 0.0008) * 2 + 3.5; // Range: 1.5-5.5
      const newDepth = Math.max(1, Math.min(6, Math.floor(depthCycle)));
      setDepth(newDepth);
      
      // Animate triangle size with a different cycle (every 3 seconds)
      const sizeCycle = Math.sin(elapsed * 0.001) * 50 + 250; // Range: 200-300
      const newSize = Math.max(150, Math.min(300, Math.floor(sizeCycle)));
      setTriangleSize(newSize);
      
      if (isAnimating) {
        // Add delay to make re-renders more noticeable and blocking
        setTimeout(() => {
          if (isAnimating) {
            animationRef.current = requestAnimationFrame(animate);
          }
        }, 150); // 150ms delay between updates for more dramatic blocking
      }
    };
    
    animate();
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resetStats = () => {
    setRenderCount(0);
    setLastRenderTime(0);
  };

  console.log(`[SIERPINSKI] Render #${renderCount} - Depth: ${depth}, Size: ${triangleSize}px, Time per triangle: ${targetTime}ms, Total triangles: ${Math.pow(3, depth)}`);
  
  // Log when rendering is heavy
  if (lastRenderTime > 100) {
    console.warn(`🚨 [SIERPINSKI] Heavy render detected! ${lastRenderTime.toFixed(1)}ms - This blocks the main thread in React 17!`);
  }
  
  // Log animation changes
  if (isAnimating && renderCount > 1) {
    console.log(`🔄 [SIERPINSKI] Animation update - Depth: ${depth}, Size: ${triangleSize}px (${Math.pow(3, depth)} triangles)`);
  }

  return (
    <div className="sierpinski-triangle">
      {/* Header */}
      <div className="sierpinski-triangle__header">
        <div className="sierpinski-triangle__title-container">
          {onBack && (
            <button
              onClick={onBack}
              className="sierpinski-triangle__back-button"
            >
              ← Back
            </button>
          )}
          <h2 className="sierpinski-triangle__title">
            🔺 Sierpiński Triangle - React 17 Performance Demo
          </h2>
        </div>
        <p className="sierpinski-triangle__subtitle">
          Demonstrates synchronous rendering blocking the main thread
        </p>
      </div>

      {/* Controls */}
      <div className="sierpinski-triangle__controls">
        <div className="sierpinski-triangle__control-group">
          <label className="sierpinski-triangle__control-label">
            Recursion Depth: {depth}
          </label>
          <input
            type="range"
            min="1"
            max="7"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="sierpinski-triangle__control-input"
            disabled={isAnimating}
          />
        </div>

        <div className="sierpinski-triangle__control-group">
          <label className="sierpinski-triangle__control-label">
            CPU Time per Triangle: {targetTime}ms
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={targetTime}
            onChange={(e) => setTargetTime(parseFloat(e.target.value))}
            className="sierpinski-triangle__control-input"
            disabled={isAnimating}
          />
        </div>

        <div className="sierpinski-triangle__button-group">
          <button
            onClick={isAnimating ? stopAnimation : startAnimation}
            className={`sierpinski-triangle__button ${
              isAnimating ? 'sierpinski-triangle__button--danger' : 'sierpinski-triangle__button--primary'
            }`}
          >
            {isAnimating ? '⏹️ Stop Animation' : '▶️ Start Animation'}
          </button>
          <button
            onClick={resetStats}
            className="sierpinski-triangle__button sierpinski-triangle__button--secondary"
          >
            🔄 Reset Stats
          </button>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="sierpinski-triangle__stats">
        <div className="sierpinski-triangle__stat-card">
          <div className="sierpinski-triangle__stat-value sierpinski-triangle__stat-value--primary">
            {renderCount}
          </div>
          <div className="sierpinski-triangle__stat-label">Total Renders</div>
        </div>

        <div className="sierpinski-triangle__stat-card">
          <div className={`sierpinski-triangle__stat-value ${
            lastRenderTime > 16 ? 'sierpinski-triangle__stat-value--danger' : 'sierpinski-triangle__stat-value--success'
          }`}>
            {lastRenderTime.toFixed(1)}ms
          </div>
          <div className="sierpinski-triangle__stat-label">Last Render Time</div>
        </div>

        <div className="sierpinski-triangle__stat-card">
          <div className={`sierpinski-triangle__stat-value ${
            Math.pow(3, depth) > 100 ? 'sierpinski-triangle__stat-value--danger' : 'sierpinski-triangle__stat-value--warning'
          }`}>
            {Math.pow(3, depth)}
          </div>
          <div className="sierpinski-triangle__stat-label">Triangle Count</div>
        </div>

        {isAnimating && (
          <div className="sierpinski-triangle__stat-card">
            <div className="sierpinski-triangle__stat-value sierpinski-triangle__stat-value--primary">
              {triangleSize}px
            </div>
            <div className="sierpinski-triangle__stat-label">Triangle Size</div>
          </div>
        )}
      </div>

      {/* Warning */}
      {(targetTime > 2 || depth > 5) && (
        <div className="sierpinski-triangle__warning">
          ⚠️ React 17 Performance Problem Demonstration
          <div className="sierpinski-triangle__warning-subtitle">
            These settings will cause heavy synchronous rendering that blocks the main thread.
            Try interacting with the page during animation to see the freeze!
            <br/>
            <strong>React 18's concurrent mode would solve this by allowing render interruption.</strong>
          </div>
        </div>
      )}

      {/* Sierpiński Triangle Visualization */}
      <div className="sierpinski-triangle__visualization">
        <div className="sierpinski-triangle__container">
          <Triangle
            x={Math.max(10, (400 - triangleSize) / 2)}
            y={Math.max(10, (350 - triangleSize) / 2)}
            size={triangleSize}
            depth={depth}
            targetTime={targetTime}
          />
        </div>
      </div>

      {/* Explanation */}
      <div className="sierpinski-triangle__explanation">
        <h3 className="sierpinski-triangle__explanation-title">🔍 What This Demonstrates:</h3>
        <ul className="sierpinski-triangle__explanation-list">
          <li><strong>Synchronous Rendering:</strong> React 17 renders all components synchronously, blocking the main thread</li>
          <li><strong>CPU Blocking:</strong> Heavy computations freeze the entire UI until complete</li>
          <li><strong>No Interruption:</strong> User interactions are blocked during rendering</li>
          <li><strong>Performance Impact:</strong> Watch render times increase exponentially with depth/CPU time</li>
          <li><strong>React 18 Solution:</strong> Concurrent mode would allow interrupting renders for user interactions</li>
        </ul>
        
        <div className="sierpinski-triangle__tip">
          <div className="sierpinski-triangle__tip-title">💡 How to See React 17 Problems:</div>
          <div className="sierpinski-triangle__tip-text">
            <strong>Step 1:</strong> Set depth to 6+ and CPU time to 2ms+<br/>
            <strong>Step 2:</strong> Start the animation<br/>
            <strong>Step 3:</strong> Try to scroll, click buttons, or interact with the page<br/>
            <strong>Result:</strong> Everything freezes! This shows React 17's synchronous rendering blocking the main thread.
            <br/><br/>
            <strong>React 18 Fix:</strong> Concurrent mode would allow interrupting renders for user interactions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SierpinskiTriangle; 