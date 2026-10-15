import { useEffect } from "react";

const useKeyboardShortcuts = (handlers, deps) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
      for (const [key, handler] of Object.entries(handlers)) {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          handler(event);
          break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, deps);
};

export default useKeyboardShortcuts;
