import { createSlice } from '@reduxjs/toolkit';
import { ProductCard, PromoProduct } from '../../type/type';
import { getCameraList, getPromoList } from './api-product';

type ProductState = {
  loadingCameraList: boolean;
  loadingPromoList: boolean;
  cameraList: ProductCard[];
  promoList: PromoProduct[];
};

const initialState: ProductState = {
  loadingCameraList: false,
  loadingPromoList: false,
  cameraList: [],
  promoList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCameraList.pending, (state) => {
        state.loadingCameraList = true;
      })
      .addCase(getCameraList.fulfilled, (state, action) => {
        state.cameraList = action.payload;
        state.loadingCameraList = false;
      })
      .addCase(getPromoList.pending, (state) => {
        state.loadingPromoList = true;
      })
      .addCase(getPromoList.fulfilled, (state, action) => {
        state.promoList = action.payload;
        state.loadingPromoList = false;
      });
  },
});

export const productReducer = productSlice.reducer;
