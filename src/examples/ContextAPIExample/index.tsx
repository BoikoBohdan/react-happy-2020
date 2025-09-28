import { useContext } from "react";
import { ContextAPI } from "../../stores/contextAPIStore";

const TextComponent = () => {
	const { randomText, createRandomText } = useContext(ContextAPI);
	return <div>Your Text: {randomText} <button onClick={createRandomText}>Create Random Text</button></div>
}

const CountComponent = () => {
	const { count, increment } = useContext(ContextAPI);
	return <div>Count: {count} <button onClick={increment}>Increment</button></div>
}

export const ContextAPIExample = () => {
  return <div>
    <TextComponent />
    <CountComponent />
  </div>;
};