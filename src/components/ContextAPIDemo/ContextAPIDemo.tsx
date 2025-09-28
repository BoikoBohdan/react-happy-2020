import React, { useContext } from 'react';
import { ContextAPI } from '../../stores/contextAPIStore';
import { ContextCountComponent, ContextTextComponent } from '../GranularComponents';

const ContextAPIDemo: React.FC = () => {
  const { increment, createRandomText } = useContext(ContextAPI);

  const handleIncrement = () => {
    console.log('⚛️ [CONTEXT] ACTION: Increment triggered');
    increment();
  };

  const handleSetRandom = () => {
    console.log('⚛️ [CONTEXT] ACTION: Random text generation triggered');
    createRandomText();
  };

  const handleDirectAssignment = () => {
    console.log('⚛️ [CONTEXT] ACTION: Direct assignment attempted (not possible)');
    // Note: We can't do direct assignment with Context API
    // This demonstrates the limitation
    alert('❌ Cannot do direct assignment with Context API!\nYou must use the provided setter functions.');
  };

  return (
    <div style={{
      flex: 1,
      padding: '2rem',
      backgroundColor: '#fefcfb',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem',
        borderBottom: '2px solid #f59e0b',
        paddingBottom: '1rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#d97706',
          margin: '0 0 0.5rem 0'
        }}>
          ⚛️ Context API Store
        </h2>
        <p style={{
          color: '#78716c',
          fontSize: '1.1rem',
          margin: 0
        }}>
          React's built-in state management solution
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
        <ContextCountComponent />
        <ContextTextComponent />
      </div>

      {/* Actions */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        border: '1px solid #fed7aa'
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
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
          >
            📈 Increment via Function
          </button>
          
          <button
            onClick={handleDirectAssignment}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              opacity: 0.7
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
          >
            🚫 Direct Assignment (Not Possible)
          </button>
          
                     <button
             onClick={handleSetRandom}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
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
        flex: 1,
        border: '1px solid #fed7aa'
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
            <li><strong>React Native:</strong> Built into React, no external dependencies</li>
            <li><strong>React 18 Compatible:</strong> Fully supports concurrent mode</li>
            <li><strong>Predictable:</strong> Follows React's unidirectional data flow</li>
            <li><strong>DevTools:</strong> Full React DevTools support</li>
            <li><strong>Type Safe:</strong> Excellent TypeScript integration</li>
            <li><strong>Batching:</strong> Automatic update batching in React 18</li>
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
            <li><strong>Boilerplate:</strong> Requires provider setup and context creation</li>
            <li><strong>Re-renders:</strong> All consumers re-render on any state change</li>
            <li><strong>No Direct Access:</strong> Must use setter functions, no direct assignment</li>
            <li><strong>Provider Hell:</strong> Multiple contexts can create nested providers</li>
            <li><strong>Performance:</strong> Can cause unnecessary re-renders in large apps</li>
            <li><strong>Complexity:</strong> More complex setup for simple state management</li>
          </ul>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #fbbf24'
        }}>
          <h4 style={{ 
            color: '#d97706', 
            margin: '0 0 0.5rem 0',
            fontSize: '1rem'
          }}>
            💡 Key Difference:
          </h4>
          <p style={{ 
            color: '#92400e', 
            margin: 0,
            fontSize: '0.9rem',
            lineHeight: 1.5
          }}>
            Context API requires explicit setter functions and follows React's patterns, 
            while Proxy Store allows direct property modification but has React compatibility issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContextAPIDemo; 