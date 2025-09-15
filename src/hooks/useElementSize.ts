import { useEffect, useState, useRef } from "react";

interface SizeType {
  width: number;
  height: number;
}

const useElementSize = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<SizeType>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);

  return { ref, size };
};

export default useElementSize;
