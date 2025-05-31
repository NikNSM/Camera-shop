import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createApi } from '../api/api';
import { productReducer } from './product-slice/product-slice';
import { reviewsReducer } from './reviews-slice/reviews-slice';
import { NameSpaceState } from '../const';
import { redirect } from './middleware/redirect/redirect';
import { changeBasketLocalStorage } from './middleware/change-local-storage/change-local-storage';
import { basketReducer } from './basket-slice/basket-slice';
import { modalWindowReducer } from './modal-window-slice/modal-window-slice';
const api = createApi();

export const reducer = combineReducers(
  {
    [NameSpaceState.PRODUCT]: productReducer,
    [NameSpaceState.REVIEWS]: reviewsReducer,
    [NameSpaceState.BASKET]: basketReducer,
    [NameSpaceState.MODAL_WINDOW]: modalWindowReducer,
  }
);

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect)
      .concat(changeBasketLocalStorage),
});
