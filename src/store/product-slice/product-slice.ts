import { createSlice } from '@reduxjs/toolkit';
import { ProductCard } from '../../type/type';
import { getCameraList } from './api-product';
type ProductState = {
  loadingCameraList: boolean;
  cameraList: ProductCard[];
};

const initialState: ProductState = {
  loadingCameraList: false,
  cameraList: [],
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
      });
  },
});

export const productReducer = productSlice.reducer;
