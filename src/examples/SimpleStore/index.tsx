import {proxyStore} from "../../stores/proxyStore";
import {useProxySelector} from "../../hooks/useSelector";

export const SimpleStore = () => {
  const count = useProxySelector((state) => state.count);
  console.log(count, '???')
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => proxyStore.increment()}>Increment</button>
    </div>
  );
};
