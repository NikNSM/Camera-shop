import { LocalStorageCameraShop } from '../type/type';
const KEY_BASKET_LOCAL_STORAGE = 'local-storage-camera-shop';

export const getBasketLocalStorage = () => {
  const basketData = localStorage.getItem(KEY_BASKET_LOCAL_STORAGE);
  if (basketData === null) {
    return basketData;
  }
  return JSON.parse(basketData) as LocalStorageCameraShop;
};

export const setBasketLocalStorage = (value: LocalStorageCameraShop | null) => {
  if (value === null) {
    return;
  }
  localStorage.setItem(KEY_BASKET_LOCAL_STORAGE, JSON.stringify(value));
};

export const removeBasketLocalStorge = () => localStorage.removeItem(KEY_BASKET_LOCAL_STORAGE);

