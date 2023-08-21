import { useState } from "react";
import useInterval from "@/common/customHook/useInterval";

interface propsType {
  text: string;
}

export const TextSplitAni = ({ text }: propsType) => {
  const [splitText, setSplitText] = useState("");
  const [count, setCount] = useState(0);

  const SplitText = () => {
    if (text.length > count) {
      setSplitText((pre) => pre + text.split("")[count]);
      setCount((pre) => pre + 1);
    }
  };

  useInterval(() => {
    SplitText();
  }, 100);

  return <>{splitText}</>;
};
