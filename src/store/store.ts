import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createApi } from '../api/api';
import { productReducer } from './product-slice/product-slice';
import { reviewsReducer } from './reviews-slice/reviews-slice';
import { NameSpaceState } from '../const';
import { redirect } from './middleware-redirect/redirect';

const api = createApi();

export const reducer = combineReducers(
  {
    [NameSpaceState.PRODUCT]: productReducer,
    [NameSpaceState.REVIEWS]: reviewsReducer
  }
);

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
