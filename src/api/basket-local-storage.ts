import { DataBasket } from '../type/type';
const KEY_BASKET_LOCAL_STORAGE = 'basket';

export const getBasketLocalStorage = () => {
  const basketData = localStorage.getItem(KEY_BASKET_LOCAL_STORAGE);
  if (basketData === null) {
    return [];
  }
  return JSON.parse(basketData) as DataBasket[];
};

export const setBasketLocalStorage = (value: DataBasket[] | null) => {
  if (value === null) {
    return;
  }
  localStorage.setItem(KEY_BASKET_LOCAL_STORAGE, JSON.stringify(value));
};

export const removeBasketLocalStorge = () => localStorage.removeItem(KEY_BASKET_LOCAL_STORAGE);

