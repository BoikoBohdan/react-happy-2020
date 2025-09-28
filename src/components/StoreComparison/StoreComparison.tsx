import React from 'react';
import { ContextAPIProvider } from '../../stores/contextAPIStore';
import ProxyStoreDemo from '../ProxyStoreDemo';
import ContextAPIDemo from '../ContextAPIDemo';
import './StoreComparison.css';

const StoreComparison: React.FC = () => {
  // Log initial message to console
  React.useEffect(() => {
    console.clear();
    console.log('🏪 STORE COMPARISON DEMO');
    console.log('═══════════════════════════════════════');
    console.log('📋 Watch the console to see re-render patterns:');
    console.log('   [PROXY] = Proxy Store components');
    console.log('   [CONTEXT] = Context API components');
    console.log('   [COUNT COMPONENT] = Component that only cares about count');
    console.log('   [TEXT COMPONENT] = Component that only cares about text');
    console.log('');
    console.log('🎯 Expected behavior:');
    console.log('   - PROXY: Both components re-render on ANY change (poor granularity)');
    console.log('   - CONTEXT: Both components re-render on ANY change (poor granularity by default)');
    console.log('');
    console.log('🚀 Try clicking the buttons to see the differences!');
    console.log('═══════════════════════════════════════');
  }, []);

  return (
    <div className="store-comparison">
      {/* Side by side comparison */}
      <div className="store-comparison__content">
        {/* Proxy Store Demo */}
        <ProxyStoreDemo />

        {/* Context API Demo - wrapped in provider */}
        <ContextAPIProvider>
          <ContextAPIDemo />
        </ContextAPIProvider>
      </div>

      {/* Footer */}
      <div className="store-comparison__footer">
        <p>
          💡 Try interacting with both stores to see the differences in behavior
          and performance
        </p>
      </div>
    </div>
  );
};

export default StoreComparison; 