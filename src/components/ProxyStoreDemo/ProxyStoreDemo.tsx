import React from 'react';
import { proxyStore } from '../../stores/proxyStore';
import { ProxyCountComponent, ProxyTextComponent } from '../GranularComponents';
import './ProxyStoreDemo.css';

const ProxyStoreDemo: React.FC = () => {

  const handleIncrement = () => {
    console.log('🔮 [PROXY] ACTION: Increment triggered');
    proxyStore.increment();
  };

  const handleSetRandom = () => {
    console.log('🔮 [PROXY] ACTION: Random text generation triggered');
    proxyStore.setRandomText();
  };

  const handleDirectAssignment = () => {
    const newValue = Math.floor(Math.random() * 100);
    console.log(`🔮 [PROXY] ACTION: Direct assignment triggered - Setting count to ${newValue}`);
    proxyStore.count = newValue;
  };

  return (
    <div style={{
      flex: 1,
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRight: '2px solid #e2e8f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '1rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#1e40af',
          margin: '0 0 0.5rem 0'
        }}>
          🔮 Proxy Store
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '1.1rem',
          margin: 0
        }}>
          JavaScript Proxy-based state management
        </p>
      </div>

      {/* Granular Components */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          color: '#1f2937',
          fontSize: '1.25rem'
        }}>
          Component Granularity
        </h3>
        <ProxyCountComponent />
        <ProxyTextComponent />
      </div>

      {/* Actions */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          color: '#1f2937',
          fontSize: '1.25rem'
        }}>
          Actions
        </h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <button
            onClick={handleIncrement}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            📈 Increment via Method
          </button>
          
          <button
            onClick={handleDirectAssignment}
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
          >
            🎯 Direct Assignment
          </button>
          
          <button
            onClick={handleSetRandom}
            style={{
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            🎲 Generate Random Text
          </button>
        </div>
      </div>

      {/* Pros & Cons */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        flex: 1
      }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          color: '#1f2937',
          fontSize: '1.25rem'
        }}>
          How it Works & Trade-offs
        </h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ 
            color: '#059669', 
            margin: '0 0 0.5rem 0',
            fontSize: '1.1rem'
          }}>
            ✅ Pros:
          </h4>
          <ul style={{ 
            color: '#374151', 
            paddingLeft: '1.25rem',
            margin: 0,
            lineHeight: 1.6
          }}>
            <li>Automatic change detection via JavaScript Proxy</li>
            <li>Works with both method calls and direct property assignment</li>
            <li>Simple API - just modify the store object directly</li>
            <li>No boilerplate code needed</li>
            <li>Singleton pattern ensures global state consistency</li>
          </ul>
        </div>

        <div>
          <h4 style={{ 
            color: '#dc2626', 
            margin: '0 0 0.5rem 0',
            fontSize: '1.1rem'
          }}>
            ❌ Cons:
          </h4>
          <ul style={{ 
            color: '#374151', 
            paddingLeft: '1.25rem',
            margin: 0,
            lineHeight: 1.6
          }}>
            <li><strong>React 18 Issues:</strong> Not compatible with concurrent mode</li>
            <li><strong>Performance:</strong> Creates new functions on every access</li>
            <li><strong>Batching:</strong> No automatic update batching</li>
            <li><strong>Debugging:</strong> Harder to track state changes</li>
            <li><strong>Memory:</strong> Proxy overhead and function wrapping</li>
            <li><strong>Dependencies:</strong> Breaks React's dependency arrays</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProxyStoreDemo; 