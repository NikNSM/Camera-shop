import { createSlice } from '@reduxjs/toolkit';
import { ProductCard, PromoProduct, ResultPlacingOrder } from '../../type/type';
import { getCameraList, getPromoList, postOrder } from './api-product';

type ProductState = {
  loadingCameraList: boolean;
  loadingPromoList: boolean;
  loadingPostOrder: boolean;
  resultPlacingOrder: ResultPlacingOrder;
  cameraList: ProductCard[];
  promoList: PromoProduct[];
};

const initialState: ProductState = {
  loadingCameraList: false,
  loadingPromoList: false,
  loadingPostOrder: false,
  resultPlacingOrder: ResultPlacingOrder.UNKNOW,
  cameraList: [],
  promoList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPlacingOrderUnknow: (state) => {
      state.resultPlacingOrder = ResultPlacingOrder.UNKNOW;
    }
  },
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
      })
      .addCase(postOrder.pending, (state) => {
        state.loadingPostOrder = true;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.resultPlacingOrder = ResultPlacingOrder.SUCCESSFULY;
        state.loadingPostOrder = false;
      })
      .addCase(postOrder.rejected, (state) => {
        state.resultPlacingOrder = ResultPlacingOrder.ERROR;
        state.loadingPostOrder = false;
      });
  },
});

export const productReducer = productSlice.reducer;
export const {setPlacingOrderUnknow} = productSlice.actions;
