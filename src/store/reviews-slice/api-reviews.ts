import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewCard } from '../../type/type';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';

export const getReviewsCamera = createAsyncThunk<
  ReviewCard[],
  number,
  {
    extra: AxiosInstance;
  }
>(
  'reviews/getReviewsCamera', async (id, {extra: api}) => {
    const { data } = await api.get<ReviewCard[]>(`${ApiRoute.CAMERAS_LIST}/${id}${ApiRoute.REVIEWS}`);
    return data;
  }
);
