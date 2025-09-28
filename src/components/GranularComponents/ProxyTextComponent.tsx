import React, { useState, useEffect } from 'react';
import { proxyStore, proxyStoreManager } from '../../stores/proxyStore';
import './ComponentStyles.css';

// Render counter outside component
let proxyTextRenderCount = 0;

const ProxyTextComponent: React.FC = () => {
  const [randomText, setRandomText] = useState(proxyStore.randomText);

  // Increment render count on every render
  proxyTextRenderCount += 1;

  // Log re-render to console
  console.log(`[PROXY] [TEXT COMPONENT] Re-render #${proxyTextRenderCount} - Text: "${randomText}"`);

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = proxyStoreManager.subscribe((state) => {
      setRandomText(state.randomText);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="component-card proxy-text-component">
      <h4 className="component-card__title">
        💬 Text Component (Proxy)
      </h4>
      <div className="component-card__row">
        <span className="component-card__label">Text:</span>
        <span className="component-card__value component-card__text-value">
          {randomText || 'None'}
        </span>
      </div>
      <div className="component-card__row">
        <span className="component-card__label component-card__label--small">
          Renders:
        </span>
        <span className="component-card__value component-card__value--small render-count">
          {proxyTextRenderCount}
        </span>
      </div>
    </div>
  );
};

export default ProxyTextComponent; 