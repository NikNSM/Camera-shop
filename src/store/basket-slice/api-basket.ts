import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { AddresesRoute, ApiRoute, NameSpaceModalWindowProduct } from '../../const';
import { ArgumentCoupon, Order } from '../../type/type';
import { TypeAppDispatch } from '../../type/type-redux';
import { setActiveModalWindow } from '../modal-window-slice/modal-window-slice';
import { getPayloadActiveModalWindow } from '../../utils';
import { redirectToRoute } from '../middleware/redirect/action-redirect';
import { NameSpaceSearchParams, TypeSort, DirectionSort } from '../../const';
import { removeBasketLocalStorge } from '../../api/basket-local-storage';

export const checkCoupon = createAsyncThunk<
  {
    coupon: string;
    percentDiscountCoupon: number;
  },
  ArgumentCoupon,
  {
    extra: AxiosInstance;
    rejectValue: number;
  }
>(
  'basket/checkCoupon', async (arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<number>(ApiRoute.COUPONS, arg);
      return {
        coupon: arg.coupon,
        percentDiscountCoupon: data
      };
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.status);
    }
  }
);

export const creatOrder = createAsyncThunk<
  void,
  Order,
  {
    extra: AxiosInstance;
    dispatch: TypeAppDispatch;
  }
>(
  'basket/creatOrder', async (arg, { extra: api, dispatch }) => {
    try {
      await api.post(ApiRoute.ORDERS, arg);
      dispatch(redirectToRoute(`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`));
      dispatch(
        setActiveModalWindow(
          getPayloadActiveModalWindow(NameSpaceModalWindowProduct.THANKS)
        )
      );
      removeBasketLocalStorge();
    } catch (error) {
      dispatch(
        setActiveModalWindow(
          getPayloadActiveModalWindow(NameSpaceModalWindowProduct.ERROR)
        )
      );
      throw new Error;
    }
  }
);
