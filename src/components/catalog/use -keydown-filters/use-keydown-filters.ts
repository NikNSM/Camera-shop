import { useEffect, useRef } from 'react';

export enum NameSpaceElementsFilters {
  MIN_PRICE = 'minPrice',
  MAX_PRICE = 'maxPrice',
  CATEGORY_VIDEO = 'categoryVideo',
  CATEGORY_FOTO = 'categoryFoto',
  TYPE_COLLECTION = 'typeCollection',
}

export type SetActiveFocusFilterElement = (name?: NameSpaceElementsFilters | null) => void
export type SetListFiltersElements = (name: NameSpaceElementsFilters, el: HTMLInputElement | null) => void

export function useKeydownFilters(loadingCamera: boolean): [
  SetActiveFocusFilterElement,
  SetListFiltersElements
] {
  const listFiltersElements = useRef<{
    [NameSpaceElementsFilters.MIN_PRICE]: null | HTMLInputElement;
    [NameSpaceElementsFilters.MAX_PRICE]: null | HTMLInputElement;
    [NameSpaceElementsFilters.CATEGORY_VIDEO]: null | HTMLInputElement;
    [NameSpaceElementsFilters.CATEGORY_FOTO]: null | HTMLInputElement;
    [NameSpaceElementsFilters.TYPE_COLLECTION]: null | HTMLInputElement;
  }>({
    [NameSpaceElementsFilters.MIN_PRICE]: null,
    [NameSpaceElementsFilters.MAX_PRICE]: null,
    [NameSpaceElementsFilters.CATEGORY_FOTO]: null,
    [NameSpaceElementsFilters.CATEGORY_VIDEO]: null,
    [NameSpaceElementsFilters.TYPE_COLLECTION]: null,
  });

  const activeFocusFilterElement = useRef<NameSpaceElementsFilters | null>(null);

  const setActiveFocusFilterElement: SetActiveFocusFilterElement = (name: NameSpaceElementsFilters | null = null) => {
    activeFocusFilterElement.current = name;
  };

  const setListFiltersElements: SetListFiltersElements = (name: NameSpaceElementsFilters, el: HTMLInputElement | null) => {
    listFiltersElements.current[name] = el;
  };

  const handleKeydownTab = (evt: KeyboardEvent) => {
    if (evt.shiftKey && evt.key === 'Tab') {
      if(activeFocusFilterElement.current === NameSpaceElementsFilters.CATEGORY_FOTO){
        evt.preventDefault();
        listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_VIDEO]?.focus();
      }
      if(activeFocusFilterElement.current === NameSpaceElementsFilters.TYPE_COLLECTION){
        evt.preventDefault();
        if(listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_FOTO]?.checked){
          listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_VIDEO]?.focus();
          return;
        }
        listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_FOTO]?.focus();
      }
      return;
    }

    if (evt.key === 'Tab') {
      if(activeFocusFilterElement.current === NameSpaceElementsFilters.CATEGORY_VIDEO){
        evt.preventDefault();
        listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_FOTO]?.focus();
      }
      if(activeFocusFilterElement.current === NameSpaceElementsFilters.MAX_PRICE){
        evt.preventDefault();
        if(listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_VIDEO]?.checked){
          listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_FOTO]?.focus();
          return;
        }
        listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_VIDEO]?.focus();
      }
    }
  };

  const handleKeaydownEnter = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter' && activeFocusFilterElement.current === NameSpaceElementsFilters.MIN_PRICE) {
      evt.preventDefault();
      listFiltersElements.current[NameSpaceElementsFilters.MAX_PRICE]?.focus();
      return;
    }
    if (evt.key === 'Enter' && activeFocusFilterElement.current === NameSpaceElementsFilters.MAX_PRICE) {
      evt.preventDefault();
      listFiltersElements.current[NameSpaceElementsFilters.CATEGORY_VIDEO]?.focus();
    }
  };

  const handleKeydownSpace = (evt: KeyboardEvent) => {
    if (evt.code === 'Space') {
      if(activeFocusFilterElement.current === NameSpaceElementsFilters.CATEGORY_VIDEO){
        setTimeout(() => {
          listFiltersElements.current[NameSpaceElementsFilters.TYPE_COLLECTION]?.focus();
        }, 200);
      }
      if(activeFocusFilterElement.current === NameSpaceElementsFilters.CATEGORY_FOTO){
        setTimeout(() => {
          listFiltersElements.current[NameSpaceElementsFilters.TYPE_COLLECTION]?.focus();
        }, 200);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeaydownEnter);
    document.addEventListener('keydown', handleKeydownSpace);
    document.addEventListener('keydown', handleKeydownTab);
    return () => {
      document.removeEventListener('keydown', handleKeaydownEnter);
      document.removeEventListener('keydown', handleKeydownSpace);
      document.removeEventListener('keydown', handleKeydownTab);
    };
  }, [loadingCamera]);
  return [setActiveFocusFilterElement, setListFiltersElements];
}
