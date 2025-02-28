import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCard } from '../../type/type';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';
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
