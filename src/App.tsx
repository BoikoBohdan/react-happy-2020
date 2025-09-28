import React from 'react';
import FeatureSelector, { Feature } from './components/FeatureSelector';
import StoreComparison from './components/StoreComparison';
import { SierpinskiTriangleExample } from './examples/SierpinskiTriangleExample';

const features: Feature[] = [
  {
    id: 'store-comparison',
    title: 'Store Comparison',
    emoji: '🏪',
    description: 'Comparing Proxy-based vs Context API state management approaches',
    component: StoreComparison,
  },
  {
    id: 'sierpinski-triangle',
    title: 'React 17 Performance',
    emoji: '🔺',
    description: 'Demonstrates React 17 synchronous rendering performance issues',
    component: SierpinskiTriangleExample,
  },
];

function App() {
  return (
    <FeatureSelector 
      features={features} 
      defaultFeature="store-comparison"
    />
  );
}

export default App;
