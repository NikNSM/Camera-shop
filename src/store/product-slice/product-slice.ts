import { createSlice } from '@reduxjs/toolkit';
import { ProductCard, PromoProduct, ResultPlacingOrder } from '../../type/type';
import {
  getCamera,
  getCameraList,
  getPromoList,
} from './api-product';
import { NameSpaceState } from '../../const';

type ProductState = {
  loadingCameraList: boolean;
  loadingPromoList: boolean;
  loadingPostOrder: boolean;
  loadingCamera: boolean;
  resultPlacingOrder: ResultPlacingOrder;
  cameraList: ProductCard[];
  promoList: PromoProduct[];
  camera: ProductCard | null;
};

const initialState: ProductState = {
  loadingCameraList: false,
  loadingPromoList: false,
  loadingPostOrder: false,
  loadingCamera: false,
  resultPlacingOrder: ResultPlacingOrder.UNKNOW,
  cameraList: [],
  promoList: [],
  camera: null,
};

const productSlice = createSlice({
  name: NameSpaceState.PRODUCT,
  initialState,
  reducers: {
    setPlacingOrderUnknow: (state) => {
      state.resultPlacingOrder = ResultPlacingOrder.UNKNOW;
    },
    clearCamera: (state) => {
      state.camera = null;
    },
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
      .addCase(getCamera.pending, (state) => {
        state.loadingCamera = true;
      })
      .addCase(getCamera.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.loadingCamera = false;
      });
  },
});

export const productReducer = productSlice.reducer;
export const { setPlacingOrderUnknow, clearCamera } = productSlice.actions;
