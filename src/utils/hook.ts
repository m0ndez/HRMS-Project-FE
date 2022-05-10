import { useEffect, useRef } from "react";

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const exportedObj = {
  usePrevious,
};

export default exportedObj;
