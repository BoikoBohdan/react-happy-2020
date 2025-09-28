import { createContext, useState } from "react";
import { RANDOM_TEXTS } from "../constants";

interface ContextAPIStore { 
  count: number;
  increment: () => void;
  randomText: string;
  createRandomText: () => void;
}

export const ContextAPI = createContext<ContextAPIStore>({
  count: 0,
  increment: () => {},
  randomText: "",
  createRandomText: () => {},
});

const ContextAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const [randomText, setRandomText] = useState("");

  const increment = () => {
    setCount(count + 1);
  };

  const createRandomText = () => {
    setRandomText(RANDOM_TEXTS[Math.floor(Math.random() * RANDOM_TEXTS.length)]);
  };

  return (
    <ContextAPI.Provider value={{ count, increment, randomText, createRandomText }}>
      {children}
    </ContextAPI.Provider>
  );
};

export { ContextAPIProvider };