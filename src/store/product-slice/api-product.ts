import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCard, PromoProduct } from '../../type/type';
import { AxiosInstance } from 'axios';
import { AddresesRoute, ApiRoute } from '../../const';
import { TypeAppDispatch } from '../../type/type-redux';
import { redirectToRoute } from '../middleware/redirect/action-redirect';
import { getReviewsCamera } from '../reviews-slice/api-reviews';

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
    dispatch(redirectToRoute(AddresesRoute.PAGE_404));
    throw new Error();
  }
});

export const getRelatedCameras = createAsyncThunk<
  ProductCard[],
  string,
  {
    extra: AxiosInstance;
  }
>('product/getRelatedCameras', async (arg, { extra: api }) => {
  const { data } = await api.get<ProductCard[]>(`${ApiRoute.CAMERAS_LIST}/${arg}${ApiRoute.SIMILAR}`);
  return data;
});
