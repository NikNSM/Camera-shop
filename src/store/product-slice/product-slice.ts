import { createSlice } from '@reduxjs/toolkit';
import { ProductCard, PromoProduct, ResultPlacingOrder } from '../../type/type';
import {
  getCamera,
  getCameraList,
  getPromoList,
  getRelatedCameras,
} from './api-product';
import { NameSpaceState } from '../../const';

type ProductState = {
  loadingCameraList: boolean;
  loadingPromoList: boolean;
  loadingPostOrder: boolean;
  loadingCamera: boolean;
  loadingRelatedCameras: boolean;
  resultPlacingOrder: ResultPlacingOrder;
  cameraList: ProductCard[];
  promoList: PromoProduct[];
  camera: ProductCard | null;
  relatedProducts: ProductCard[];
};

const initialState: ProductState = {
  loadingCameraList: false,
  loadingPromoList: false,
  loadingPostOrder: false,
  loadingCamera: false,
  loadingRelatedCameras: false,
  resultPlacingOrder: ResultPlacingOrder.UNKNOW,
  cameraList: [],
  promoList: [],
  camera: null,
  relatedProducts: [],
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
      state.relatedProducts = [];
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
      })
      .addCase(getRelatedCameras.pending, (state) => {
        state.loadingRelatedCameras = true;
      })
      .addCase(getRelatedCameras.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
        state.loadingRelatedCameras = false;
      })
      .addCase(getRelatedCameras.rejected, (state) => {
        state.loadingRelatedCameras = false;
      });
  },
});

export const productReducer = productSlice.reducer;
export const { setPlacingOrderUnknow, clearCamera } = productSlice.actions;
