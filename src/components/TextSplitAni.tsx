import { useState } from "react";
import useInterval from "../common/customHook/useInterval";

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
    } /* else {
      setSplitText("");
      setCount(0);
    }; */
  };

  useInterval(() => {
    SplitText();
  }, 300);

  return <>{splitText}</>;
};
