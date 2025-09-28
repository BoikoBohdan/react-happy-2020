import React, { useState } from 'react';
import './FeatureSelector.css';

export interface Feature {
  id: string;
  title: string;
  emoji: string;
  description: string;
  component: React.ComponentType<any>;
  props?: any;
}

interface FeatureSelectorProps {
  features: Feature[];
  defaultFeature?: string;
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({ 
  features, 
  defaultFeature 
}) => {
  const [currentFeature, setCurrentFeature] = useState(
    defaultFeature || features[0]?.id
  );

  const activeFeature = features.find(f => f.id === currentFeature);

  if (!activeFeature) {
    return <div>Feature not found</div>;
  }

  const ActiveComponent = activeFeature.component;

  return (
    <div className="feature-selector">
      {/* Header */}
      <div className="feature-selector__header">
        <h1 className="feature-selector__title">
          🚀 React Demo Hub
        </h1>
        <p className="feature-selector__subtitle">
          Explore different React patterns and performance demonstrations
        </p>
        
        {/* Feature Tags */}
        <div className="feature-selector__nav">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setCurrentFeature(feature.id)}
              className={`feature-selector__tag ${
                currentFeature === feature.id ? 'feature-selector__tag--active' : ''
              }`}
              data-feature={feature.id}
            >
              <span className="feature-selector__tag-emoji">{feature.emoji}</span>
              <span className="feature-selector__tag-text">{feature.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Feature */}
      <div className="feature-selector__content">
        <ActiveComponent {...(activeFeature.props || {})} />
      </div>
    </div>
  );
};

export default FeatureSelector; 