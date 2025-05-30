import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import { reducer, store } from '../../store';
import { addProductBasket, deleteProductBasket, reduceProductBasket, setQuantityProduct } from '../../basket-slice/basket-slice';
import { setBasketLocalStorage } from '../../../api/basket-local-storage';
import { getDataLocalStorage } from '../../../utils';
import { checkCoupon } from '../../basket-slice/api-basket';
type Reducer = ReturnType<typeof reducer>;

export const changeBasketLocalStorage: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (
    action.type === addProductBasket.type ||
    action.type === deleteProductBasket.type ||
    action.type === reduceProductBasket.type ||
    action.type === setQuantityProduct.type ||
    action.type === checkCoupon.fulfilled.type
  ) {
    const result = next(action);
    const coupon = store.getState().basket.coupon;
    const cameras = store.getState().basket.products;
    const percentDicountCoupon = store.getState().basket.percentDicountCoupon;
    setBasketLocalStorage(getDataLocalStorage(cameras, coupon, percentDicountCoupon));
    return result;
  }
  return next(action);
};
