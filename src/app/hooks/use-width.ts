import React from "../deps/react.ts";

export function useWidth(el: React.RefObject<HTMLElement>) {
  const observer = React.useRef<ResizeObserver>();
  const [rect, setContentRect] = React.useState<DOMRectReadOnly | undefined>(
    el.current?.getBoundingClientRect(),
  );
  function updateBoundingClient() {
    return () => {
      setContentRect(el.current?.getBoundingClientRect());
    };
  }
  React.useEffect(() => updateBoundingClient(), [el.current]);
  React.useEffect(() => {
    observer.current = new ResizeObserver((observers) => {
      observers.forEach(updateBoundingClient());
    });
    observer.current.observe(el.current ?? document.body);
    return () => {
      observer.current?.disconnect();
    };
  }, []);
  return React.useMemo(() => rect?.width, [rect]);
}
