import { DataLocalStorage, DataBasket } from '../type/type';
import { convertBasketDataType } from '../utils';
const KEY_BASKET_LOCAL_STORAGE = 'basket';

export const getBasketLocalStorage = () => {
  const basketData = localStorage.getItem(KEY_BASKET_LOCAL_STORAGE);
  if(basketData === null){
    return basketData;
  }
  return convertBasketDataType(JSON.parse(basketData) as DataLocalStorage);
};

export const setBasketLocalStorage = (value: DataBasket | null) => {
  if(value === null){
    return;
  }
  localStorage.setItem(KEY_BASKET_LOCAL_STORAGE, JSON.stringify(Object.fromEntries(value)));
};

export const removeBasketLocalStorge = () => localStorage.removeItem(KEY_BASKET_LOCAL_STORAGE);

