import React, { useState, useEffect } from 'react';
import { proxyStore, proxyStoreManager } from '../../stores/proxyStore';
import './ComponentStyles.css';

// Render counter outside component
let proxyCountRenderCount = 0;

const ProxyCountComponent: React.FC = () => {
  const [count, setCount] = useState(proxyStore.count);

  // Increment render count on every render
  proxyCountRenderCount += 1;

  // Log re-render to console
  console.log(`[PROXY] [COUNT COMPONENT] Re-render #${proxyCountRenderCount} - Count: ${count}`);

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = proxyStoreManager.subscribe((state) => {
      setCount(state.count);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="component-card proxy-count-component">
      <h4 className="component-card__title">
        📊 Count Component (Proxy)
      </h4>
      <div className="component-card__row">
        <span className="component-card__label">Count:</span>
        <span className="component-card__value component-card__value--large">
          {count}
        </span>
      </div>
      <div className="component-card__row">
        <span className="component-card__label component-card__label--small">
          Renders:
        </span>
        <span className="component-card__value component-card__value--small render-count">
          {proxyCountRenderCount}
        </span>
      </div>
    </div>
  );
};

export default ProxyCountComponent; 