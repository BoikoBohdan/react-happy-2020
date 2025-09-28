import {proxyStore} from "../../stores/proxyStore";
import {useProxySelector} from "../../hooks/useSelector";

let simpleStoreRenderCount = 0;
let readTextRenderCount = 0;

/**
 * This is working because the proxyStore is a proxy object.
 * It is a proxy wrapper around the countStore.
 * So when you call proxyStore.increment(), it is calling the increment function on the countStore.
 * So the countStore is being updated.
 */
const Counter = () => {
  const count = useProxySelector((state) => state.count);
  simpleStoreRenderCount++;
  console.log('simpleStore render', simpleStoreRenderCount);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => proxyStore.increment()}>Increment</button>
    </div>
  );
};

/**
 * This is not working because the proxyStore is not a proxy object.
 * It is a proxy wrapper around the countStore.
 * So when you call proxyStore.increment(), it is not calling the increment function on the countStore.
 * It is calling the increment function on the proxy wrapper.
 * So the countStore is not being updated.
 */
const NotWorking = () => {
  return (
    <div>
      <h1>Count: {proxyStore.count}</h1>
      <button onClick={() => proxyStore.increment()}>Increment</button>
    </div>
  );
};

const ReadText = () => {
  const randomText = useProxySelector((state) => state.randomText);
  readTextRenderCount++;
  console.log('readText render', readTextRenderCount);
  return (
    <div>
      <h1>Random Text: {randomText}</h1>
      <button onClick={() => proxyStore.setRandomText()}>
        Set Random Text
      </button>
    </div>
  );
};

export const SimpleStoreExample = () => {
  console.log('parent render');

  return (
    <div>
      <Counter />
      {/* <NotWorking /> */}
      <ReadText />
    </div>
  );
};
