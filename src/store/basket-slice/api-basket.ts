import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';
import { ArgumentCoupon } from '../../type/type';

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
