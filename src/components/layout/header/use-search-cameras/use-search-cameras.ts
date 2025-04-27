import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../../../type/type';
import { AddresesRoute } from '../../../../const';

export enum NameSpaceElementsFocus {
  INPUT_SEARCH = 'inputSearch',
  RESET_BUTTON = 'resetButton',
  CAMERAS_SEARCH_LIST = 'camerasSearchList',
}

type ListElements = {
  [NameSpaceElementsFocus.INPUT_SEARCH]: null | HTMLInputElement;
  [NameSpaceElementsFocus.RESET_BUTTON]: null | HTMLButtonElement;
  [NameSpaceElementsFocus.CAMERAS_SEARCH_LIST]: HTMLElement[] | null[];
};

type SetActiveFocusElement = (name: NameSpaceElementsFocus | null, index?: number | null, cameraId?: number | null) => void;
type ResetSearch = () => void;
type RedirectToCamerPage = (id: number) => void;

export function useSearchCameras(cameraList: ProductCard[]): [
  ProductCard[],
  string,
  React.MutableRefObject<ListElements>,
  SetActiveFocusElement,
  ResetSearch,
  RedirectToCamerPage,
  React.Dispatch<React.SetStateAction<string>>
] {
  const navigate = useNavigate();
  const MIN_LENGTH_SEARCH_NAME = 3;
  const [valueSearch, setValueSearch] = useState<string>('');
  const [foundCamerasName, setFoundCamersName] = useState<ProductCard[]>([]);

  const activeFocusElement = useRef<{
    activeNameElement: NameSpaceElementsFocus | null;
    indexElement: null | number;
    idElement: null | number;
  }>({
    activeNameElement: null,
    indexElement: null,
    idElement: null,
  });

  const listElements = useRef<ListElements>({
    [NameSpaceElementsFocus.INPUT_SEARCH]: null,
    [NameSpaceElementsFocus.RESET_BUTTON]: null,
    [NameSpaceElementsFocus.CAMERAS_SEARCH_LIST]: [],
  });

  const findCamerasName = (productList: ProductCard[], searchName: string) => {
    if (searchName.length >= MIN_LENGTH_SEARCH_NAME) {
      const regExp = new RegExp(searchName, 'i');
      const newFoundCamerasName = productList.filter((camera) => regExp.test(camera.name));
      setFoundCamersName(newFoundCamerasName);
    }
  };

  const resetSearch: ResetSearch = () => {
    setValueSearch('');
    setFoundCamersName([]);
  };

  const setActiveFocusElement: SetActiveFocusElement = (
    name: NameSpaceElementsFocus | null,
    index: number | null = null,
    cameraId: number | null = null
  ) => {
    activeFocusElement.current.activeNameElement = name;
    activeFocusElement.current.indexElement = index;
    activeFocusElement.current.idElement = cameraId;
  };

  const redirectToCamerPage: RedirectToCamerPage = (id: number) => {
    resetSearch();
    navigate(`${AddresesRoute.CAMERA}${id}`);
    setActiveFocusElement(null);
  };

  const handleKeaydownEnter = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.RESET_BUTTON) {
        resetSearch();
        return;
      }
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.CAMERAS_SEARCH_LIST && activeFocusElement.current.idElement !== null) {
        redirectToCamerPage(activeFocusElement.current.idElement);
      }
    }
  };

  const handleKeaydownArrow = (evt: KeyboardEvent) => {
    if (evt.key === 'ArrowRight') {
      const selectionStart = listElements.current[NameSpaceElementsFocus.INPUT_SEARCH]?.selectionStart;
      const selectionEnd = listElements.current[NameSpaceElementsFocus.INPUT_SEARCH]?.selectionEnd;
      const value = listElements.current[NameSpaceElementsFocus.INPUT_SEARCH]?.value;
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.INPUT_SEARCH && value?.length === selectionStart && value?.length === selectionEnd) {
        evt.preventDefault();
        listElements.current[NameSpaceElementsFocus.RESET_BUTTON]?.focus();
        return;
      }
      return;
    }
    if (evt.key === 'ArrowLeft') {
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.RESET_BUTTON) {
        evt.preventDefault();
        listElements.current[NameSpaceElementsFocus.INPUT_SEARCH]?.focus();
        return;
      }
      return;
    }
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.INPUT_SEARCH || activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.RESET_BUTTON) {
        listElements.current[NameSpaceElementsFocus.CAMERAS_SEARCH_LIST][0]?.focus();
        return;
      }
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.CAMERAS_SEARCH_LIST && activeFocusElement.current.indexElement !== null) {
        listElements.current[NameSpaceElementsFocus.CAMERAS_SEARCH_LIST][activeFocusElement.current.indexElement + 1]?.focus();
        return;
      }
    }
    if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.CAMERAS_SEARCH_LIST && activeFocusElement.current.indexElement === 0) {
        activeFocusElement.current.indexElement = null;
        listElements.current[NameSpaceElementsFocus.INPUT_SEARCH]?.focus();
        return;
      }
      if (activeFocusElement.current.activeNameElement === NameSpaceElementsFocus.CAMERAS_SEARCH_LIST && activeFocusElement.current.indexElement) {
        listElements.current[NameSpaceElementsFocus.CAMERAS_SEARCH_LIST][activeFocusElement.current.indexElement - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    findCamerasName(cameraList, valueSearch);
  }, [valueSearch, cameraList]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeaydownEnter);
    document.addEventListener('keydown', handleKeaydownArrow);
    return () => {
      document.removeEventListener('keydown', handleKeaydownEnter);
      document.removeEventListener('keydown', handleKeaydownArrow);
    };
  }, []);

  return [
    foundCamerasName,
    valueSearch,
    listElements,
    setActiveFocusElement,
    resetSearch,
    redirectToCamerPage,
    setValueSearch,
  ];
}
