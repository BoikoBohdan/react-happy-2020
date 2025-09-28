import React, { useContext } from 'react';
import { ContextAPI } from '../../stores/contextAPIStore';
import './ComponentStyles.css';

// Render counter outside component
let contextTextRenderCount = 0;

const ContextTextComponent: React.FC = () => {
  const { randomText } = useContext(ContextAPI);

  // Increment render count on every render
  contextTextRenderCount += 1;

  // Log re-render to console
  console.log(`[CONTEXT] [TEXT COMPONENT] Re-render #${contextTextRenderCount} - Text: "${randomText}"`);

  return (
    <div className="component-card context-text-component">
      <h4 className="component-card__title">
        💬 Text Component (Context)
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
        <span className="component-card__value component-card__value--small render-count render-count--context">
          {contextTextRenderCount}
        </span>
      </div>
    </div>
  );
};

export default ContextTextComponent; 