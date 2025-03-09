import { MutableRefObject, useEffect, useRef } from 'react';


export function useHandleTab(isFocusOneElement = false, ...elements: (MutableRefObject<HTMLInputElement | null> | MutableRefObject<HTMLButtonElement | null>)[]) {
  const indexFocusElement = useRef<number>(0);
  const isOneFocusElement = useRef<boolean>(isFocusOneElement);
  const focusElements = elements;

  const handleTab = (evt: KeyboardEvent) => {
    if (evt.shiftKey && evt.key === 'Tab') {
      evt.preventDefault();
      if (indexFocusElement.current === 0) {
        indexFocusElement.current = elements.length - 1;
      } else {
        indexFocusElement.current--;
      }
      focusElements[indexFocusElement.current].current?.focus();
      return;
    }

    if (evt.key === 'Tab') {
      evt.preventDefault();
      if (indexFocusElement.current === elements.length - 1) {
        indexFocusElement.current = 0;
      } else {
        indexFocusElement.current++;
      }

      focusElements[indexFocusElement.current].current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleTab);

    if(isOneFocusElement.current){
      focusElements[0].current?.focus();
      isOneFocusElement.current = false;
    }

    return(() => {
      document.removeEventListener('keydown', handleTab);
    });
  });

  return indexFocusElement;
}
