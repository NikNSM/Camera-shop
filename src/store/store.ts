import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../api/api';
import { productReducer } from './product-slice/product-slice';
import { reviewsReducer } from './reviews-slice/reviews-slice';
import { NameSpaceState } from '../const';

const api = createApi();

export const store = configureStore({
  reducer: {
    [NameSpaceState.PRODUCT]: productReducer,
    [NameSpaceState.REVIEWS]: reviewsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
