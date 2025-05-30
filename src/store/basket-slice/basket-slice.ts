import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataBasket, LocalStorageCameraShop } from '../../type/type';
import { NameSpaceState, StatusVerificationCoupon } from '../../const';
import { checkCoupon } from './api-basket';

type StateBasket = {
  products: DataBasket[];
  coupon: string | null;
  percentDicountCoupon: number | null;
  statusVerificationCoupon: StatusVerificationCoupon;
}

const initialState: StateBasket = {
  products: [],
  coupon: null,
  percentDicountCoupon: null,
  statusVerificationCoupon: StatusVerificationCoupon.UNKNOW
};

const basketSlice = createSlice({
  name: NameSpaceState.BASKET,
  initialState,
  reducers: {
    initializeStateBasket: (state, action: PayloadAction<LocalStorageCameraShop | null>) => {
      if (action.payload === null) {
        return;
      }
      state.products = action.payload.cameras;
      state.coupon = action.payload.coupon;
      state.percentDicountCoupon = action.payload.percentDiscountCoupon;
      if (action.payload.coupon !== null) {
        state.statusVerificationCoupon = StatusVerificationCoupon.IS_VALID;
      }
    },
    setQuantityProduct: (state, action: PayloadAction<DataBasket>) => {
      const indexElement = state.products.findIndex((item) => item.cameraId === action.payload.cameraId);
      state.products[indexElement].quantity = action.payload.quantity;
    },
    addProductBasket: (state, action: PayloadAction<DataBasket>) => {
      const indexElement = state.products.findIndex((item) => item.cameraId === action.payload.cameraId);
      if (indexElement !== -1) {
        state.products[indexElement].quantity++;
        return;
      }
      state.products.unshift(action.payload);
    },
    reduceProductBasket: (state, action: PayloadAction<number>) => {
      const indexElement = state.products.findIndex((item) => item.cameraId === action.payload);
      state.products[indexElement].quantity--;
    },
    deleteProductBasket: (state, action: PayloadAction<number>) => {
      const indexElement = state.products.findIndex((item) => item.cameraId === action.payload);
      state.products.splice(indexElement, 1);
    },
    changeStatusVerification: (state, action: PayloadAction<StatusVerificationCoupon>) => {
      state.statusVerificationCoupon = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCoupon.pending, (state) => {
        state.statusVerificationCoupon = StatusVerificationCoupon.BEING_CHECKED;
      })
      .addCase(checkCoupon.fulfilled, (state, action) => {
        state.statusVerificationCoupon = StatusVerificationCoupon.IS_VALID;
        state.coupon = action.payload.coupon;
        state.percentDicountCoupon = action.payload.percentDiscountCoupon;
      })
      .addCase(checkCoupon.rejected, (state, action) => {
        if (action.payload === 400) {
          state.statusVerificationCoupon = StatusVerificationCoupon.IS_INVALID;
        }
      });
  }
});

export const basketReducer = basketSlice.reducer;
export const { addProductBasket, initializeStateBasket, reduceProductBasket, deleteProductBasket, setQuantityProduct, changeStatusVerification } = basketSlice.actions;
