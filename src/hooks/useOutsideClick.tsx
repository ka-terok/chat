import { useCallback, useEffect } from "react";
import { useRef } from "react";

export const useOutsideClick = (callback: () => void, exseption?: any) => {
  const ref = useRef<any>(null);

  const onKeypress = useCallback(
    (e: KeyboardEvent) => e.keyCode === 27 && callback(),
    [callback]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exseption && exseption?.current?.contains(event.target)) {
        return;
      }

      if (!ref?.current?.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKeypress);
    };
  }, [ref, onKeypress, callback, exseption]);

  return ref;
};
