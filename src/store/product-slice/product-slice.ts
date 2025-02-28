import { createSlice } from '@reduxjs/toolkit';
import { ProductCard } from '../../type/type';

type ProductState = {
  loadingListProduct: boolean;
  productList: ProductCard[];
};

const initialState: ProductState = {
  loadingListProduct: false,
  productList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const productReducer = productSlice.reducer;
