import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaceModalWindowProduct, NameSpaceState } from '../../const';
import { ProductCard, PayloadActiveModalWindow } from '../../type/type';

type StateModalWindowSlice = {
  activeModalWindow: NameSpaceModalWindowProduct;
  camera: ProductCard | null;
};

const initialState: StateModalWindowSlice = {
  activeModalWindow: NameSpaceModalWindowProduct.UNKNOW,
  camera: null
};

const modalWindowSlice = createSlice({
  name: NameSpaceState.MODAL_WINDOW,
  initialState,
  reducers: {
    setActiveModalWindow: (state, action: PayloadAction<PayloadActiveModalWindow>) => {
      state.activeModalWindow = action.payload.name;
      state.camera = action.payload.camera;
    },
    clearActiveModalWinow: (state) => {
      state.activeModalWindow = NameSpaceModalWindowProduct.UNKNOW;
      state.camera = null;
    }
  }
});

export const modalWindowReducer = modalWindowSlice.reducer;
export const { setActiveModalWindow, clearActiveModalWinow } = modalWindowSlice.actions;
