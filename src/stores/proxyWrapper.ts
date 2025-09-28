type Listener<T> = (state: T) => void;

// Generic Proxy wrapper that can wrap any store type and detect changes
export class ProxyWrapper<T extends object> {
  private listeners: Set<Listener<T>>;
  private _target: T;
  public proxy: T;

  constructor(target: T) {
    this.listeners = new Set();
    this._target = target;
    this.proxy = new Proxy(this._target, {
      set: (target, property, value) => {
        (target as any)[property] = value;
        this.emit();
        return true;
      },

      get: (target, property) => {
        const value = (target as any)[property];
        if (typeof value === "function") {
          return (...args: any[]) => {
            const result = value.apply(target, args);
            this.emit();
            return result;
          };
        }
        return value;
      },
    });
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener(this.proxy));
  }

  getState(): T {
    return {...this.proxy};
  }

  getSubscriberCount(): number {
    return this.listeners.size;
  }
}

// Helper function to create a proxied store from any object
export function createProxiedStore<T extends object>(
  store: T
): {
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
    getSubscriberCount: wrapper.getSubscriberCount.bind(wrapper),
  };
}
