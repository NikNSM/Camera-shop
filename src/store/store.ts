import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../api/api';
import { productReducer } from './product-slice/product-slice';

const api = createApi();

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
