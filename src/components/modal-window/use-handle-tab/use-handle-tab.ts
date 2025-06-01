import { MutableRefObject, useEffect, useRef } from 'react';


export function useHandleTab(elements: MutableRefObject<(HTMLElement | HTMLAnchorElement | null)[]>) {
  const indexFocusElement = useRef<number>(1);

  const handleTab = (evt: KeyboardEvent) => {
    if (evt.shiftKey && evt.key === 'Tab') {
      evt.preventDefault();
      if (indexFocusElement.current === 0) {
        indexFocusElement.current = elements.current.length - 1;
      } else {
        indexFocusElement.current--;
      }
      elements.current[indexFocusElement.current]?.focus();
      return;
    }

    if (evt.key === 'Tab') {
      evt.preventDefault();
      if (indexFocusElement.current === elements.current.length - 1) {
        indexFocusElement.current = 0;
      } else {
        indexFocusElement.current++;
      }

      elements.current[indexFocusElement.current]?.focus();
    }
  };

  useEffect(() => {
    elements.current[indexFocusElement.current]?.focus();
    document.addEventListener('keydown', handleTab);
    return (() => {
      document.removeEventListener('keydown', handleTab);
    });
  });
}
