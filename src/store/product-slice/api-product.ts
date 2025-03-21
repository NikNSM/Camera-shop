import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderContactMe, ProductCard, PromoProduct } from '../../type/type';
import { AxiosInstance } from 'axios';
import { AddresesRoute, ApiRoute } from '../../const';
import { setPlacingOrderUnknow } from './product-slice';
import { TypeAppDispatch } from '../../type/type-redux';
import { actionRedirect } from '../middleware-redirect/action-redirect';
import { getReviewsCamera } from '../reviews-slice/api-reviews';

export const resetResultPlacingOrder = createAsyncThunk(
  'product/resetResultPlacingOrder', (_arg, { dispatch }) => {
    setTimeout(() => {
      dispatch(setPlacingOrderUnknow());
    }, 3000);
  }
);

export const getCameraList = createAsyncThunk<
  ProductCard[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('product/getCameraList', async (__arg, { extra: api }) => {
  const { data } = await api.get<ProductCard[]>(ApiRoute.CAMERAS_LIST);
  return data;
});

export const getPromoList = createAsyncThunk<
  PromoProduct[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('product/getPromoList', async (_arg, { extra: api }) => {
  const { data } = await api.get<PromoProduct[]>(ApiRoute.PROMO);
  return data;
});

export const postOrder = createAsyncThunk<
  void,
  OrderContactMe,
  {
    extra: AxiosInstance;
    dispatch: TypeAppDispatch;
  }
>('product/postOrder', async (arg, { extra: api, dispatch }) => {
  try {
    await api.post(ApiRoute.ORDERS, arg);
    dispatch(resetResultPlacingOrder());
  } catch (error) {
    dispatch(resetResultPlacingOrder());
    throw new Error();
  }
});

export const getCamera = createAsyncThunk<
  ProductCard,
  string,
  {
    extra: AxiosInstance;
    dispatch: TypeAppDispatch;
  }
>('product/getCamera', async (arg, { extra: api, dispatch }) => {
  try {
    const { data } = await api.get<ProductCard>(`${ApiRoute.CAMERAS_LIST}/${arg}`);
    dispatch(getReviewsCamera(arg));
    return data;
  } catch (error) {
    dispatch(actionRedirect(AddresesRoute.PAGE_404));
    throw new Error();
  }

});
