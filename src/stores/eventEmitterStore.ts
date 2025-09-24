type Listener = () => void;

interface StoreState {
  count: number;
}

class EventEmitterStore {
  private state: StoreState;
  private listeners: Set<Listener>;

  constructor(initialState: StoreState = { count: 0 }) {
    this.state = { ...initialState };
    this.listeners = new Set();
  }

  // Get current state
  getState(): StoreState {
    return { ...this.state };
  }

  // Subscribe to state changes
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Emit changes to all listeners
  private emit(): void {
    this.listeners.forEach(listener => listener());
  }

  // Increment count
  increment(): void {
    this.state = {
      ...this.state,
      count: this.state.count + 1
    };
    this.emit();
  }

  // Set count (for testing purposes)
  setCount(count: number): void {
    this.state = {
      ...this.state,
      count
    };
    this.emit();
  }

  // Get number of subscribers
  getSubscriberCount(): number {
    return this.listeners.size;
  }
}

// Singleton instance
let storeInstance: EventEmitterStore | null = null;

// Get or create singleton instance
export const getEventEmitterStore = (): EventEmitterStore => {
  if (!storeInstance) {
    storeInstance = new EventEmitterStore();
  }
  return storeInstance;
};

// Export singleton instance
export const eventEmitterStore = getEventEmitterStore();
export type { StoreState }; 