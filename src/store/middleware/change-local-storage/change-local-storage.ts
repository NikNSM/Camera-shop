import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import { reducer, store } from '../../store';
import { addProductBasket, deleteProductBasket, reduceProductBasket, setQuantityProduct } from '../../basket-slice/basket-slice';
import { setBasketLocalStorage } from '../../../api/basket-local-storage';

type Reducer = ReturnType<typeof reducer>;

export const changeBasketLocalStorage: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (
    action.type === addProductBasket.type ||
    action.type === deleteProductBasket.type ||
    action.type === reduceProductBasket.type ||
    action.type === setQuantityProduct.type
  ) {
    const result = next(action);
    const productBasket = store.getState().basket.product;
    setBasketLocalStorage(productBasket);
    return result;
  }
  return next(action);
};
