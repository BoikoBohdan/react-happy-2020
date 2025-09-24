type Listener<T> = (state: T) => void;

// Generic Proxy wrapper that can wrap any store type and detect changes
export class ProxyWrapper<T extends object> {
  private listeners: Set<Listener<T>>;
  private _target: T;
  public proxy: T;

  constructor(target: T) {
    this.listeners = new Set();
    this._target = target;

    // Create proxy that wraps any object and detects changes
    this.proxy = new Proxy(this._target, {
      set: (target, property, value) => {
        console.log('set', target, property, value);
        // Update the target object
        (target as any)[property] = value;
        
        // Emit changes to listeners
        this.emit();
        
        return true;
      },
      
      get: (target, property) => {
        console.log('get', target, property);
        const value = (target as any)[property];
        
        // If it's a function, bind it to the target so 'this' works correctly
        if (typeof value === 'function') {
          return value.bind(target);
        }
        
        return value;
      }
    });
  }

  // Subscribe to state changes
  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Emit changes to all listeners
  private emit(): void {
    this.listeners.forEach(listener => listener(this.proxy));
  }

  // Get current state (returns a copy to prevent direct mutation)
  getState(): T {
    return { ...this.proxy };
  }

  // Get number of subscribers
  getSubscriberCount(): number {
    return this.listeners.size;
  }
}

// Helper function to create a proxied store from any object
export function createProxiedStore<T extends object>(store: T): {
  store: T;
  subscribe: (listener: Listener<T>) => () => void;
  getState: () => T;
  getSubscriberCount: () => number;
} {
  const wrapper = new ProxyWrapper(store);
  
  return {
    store: wrapper.proxy,
    subscribe: wrapper.subscribe.bind(wrapper),
    getState: wrapper.getState.bind(wrapper),
    getSubscriberCount: wrapper.getSubscriberCount.bind(wrapper)
  };
} 