import React, { useContext } from 'react';
import { ContextAPI } from '../../stores/contextAPIStore';
import './ComponentStyles.css';

// Render counter outside component
let contextCountRenderCount = 0;

const ContextCountComponent: React.FC = () => {
  const { count } = useContext(ContextAPI);

  // Increment render count on every render
  contextCountRenderCount += 1;

  // Log re-render to console
  console.log(`[CONTEXT] [COUNT COMPONENT] Re-render #${contextCountRenderCount} - Count: ${count}`);

  return (
    <div className="component-card context-count-component">
      <h4 className="component-card__title">
        📊 Count Component (Context)
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
        <span className="component-card__value component-card__value--small render-count render-count--context">
          {contextCountRenderCount}
        </span>
      </div>
    </div>
  );
};

export default ContextCountComponent; 