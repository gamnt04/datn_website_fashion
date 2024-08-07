import { useEffect, useRef } from "react";

function useClickOutside(handler: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      // Chỉ xử lý khi sự kiện là MouseEvent hoặc TouchEvent
      if (
        ref.current &&
        !(event.target instanceof Node && ref.current.contains(event.target))
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener as EventListener);
    document.addEventListener("touchstart", listener as EventListener);

    return () => {
      document.removeEventListener("mousedown", listener as EventListener);
      document.removeEventListener("touchstart", listener as EventListener);
    };
  }, [handler]);

  return ref;
}

export default useClickOutside;
