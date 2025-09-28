import {useReducer, useEffect, useRef} from "react";
import {proxyStoreManager} from "../stores/proxyStore";

export const useProxySelector = (selector: (state: any) => any) => {
  const [_, forceReRender] = useReducer((x) => x + 1, 0);
  const prevDataRef = useRef(null);

  useEffect(() => {
    const unsubscribe = proxyStoreManager.subscribe((newState) => {
      const newData = selector(newState);
      /**
       * If the new data is different from the previous data, force a re-render.
       */
      if (newData !== prevDataRef.current) {
        prevDataRef.current = newData;
        forceReRender();
      }
    });
    return () => unsubscribe();
  }, [selector]);

  const data = selector(proxyStoreManager.getState());

  return data;
};
