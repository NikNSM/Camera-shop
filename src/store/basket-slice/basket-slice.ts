import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataBasket } from '../../type/type';
import { NameSpaceState } from '../../const';

type StateBasket = {
  product: DataBasket[];
};

const initialState: StateBasket = {
  product: []
};

const basketSlice = createSlice({
  name: NameSpaceState.BASKET,
  initialState,
  reducers: {
    initializeStateBasket: (state, action: PayloadAction<DataBasket[]>) => {
      state.product = action.payload;
    },
    setQuantityProduct: (state, action: PayloadAction<DataBasket>) => {
      const indexElement = state.product.findIndex((item) => item.cameraId === action.payload.cameraId);
      state.product[indexElement].quantity = action.payload.quantity;
    },
    addProductBasket: (state, action: PayloadAction<DataBasket>) => {
      const indexElement = state.product.findIndex((item) => item.cameraId === action.payload.cameraId);
      if (indexElement !== -1) {
        state.product[indexElement].quantity++;
        return;
      }
      state.product.unshift(action.payload);
    },
    reduceProductBasket: (state, action: PayloadAction<number>) => {
      const indexElement = state.product.findIndex((item) => item.cameraId === action.payload);
      state.product[indexElement].quantity--;
    },
    deleteProductBasket: (state, action: PayloadAction<number>) => {
      const indexElement = state.product.findIndex((item) => item.cameraId === action.payload);
      state.product.splice(indexElement, 1);
    }
  }
});

export const basketReducer = basketSlice.reducer;
export const { addProductBasket, initializeStateBasket, reduceProductBasket, deleteProductBasket, setQuantityProduct} = basketSlice.actions;
