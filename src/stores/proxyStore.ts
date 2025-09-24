import { createProxiedStore } from './proxyWrapper';

interface StoreState {
  count: number;
}

interface StoreActions {
  increment: () => void;
  setCount: (count: number) => void;
}

// Create a store object with state and actions
const createCountStore = (initialCount: number = 0) => {
  const store = {
    count: initialCount,
    
    increment() {
      this.count = this.count + 1;
    },
    
    setCount(count: number) {
      this.count = count;
    }
  };
  
  return store;
};

// Singleton instance
let proxiedStoreInstance: ReturnType<typeof createProxiedStore<ReturnType<typeof createCountStore>>> | null = null;

// Get or create singleton instance
export const getProxyStore = () => {
  if (!proxiedStoreInstance) {
    const countStore = createCountStore();
    proxiedStoreInstance = createProxiedStore(countStore);
  }
  return proxiedStoreInstance;
};

// Export singleton instances
const singletonStore = getProxyStore();
export const proxyStore = singletonStore.store;
export const proxyStoreManager = {
  subscribe: singletonStore.subscribe,
  getState: singletonStore.getState,
  getSubscriberCount: singletonStore.getSubscriberCount
};
export type { StoreState, StoreActions }; 