import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceState } from '../../const';
import { ReviewCard } from '../../type/type';
import { getReviewsCamera } from './api-reviews';

type StateReviews = {
  loadingReviews: boolean;
  listReviews: ReviewCard[];
}

const initialState: StateReviews = {
  listReviews: [],
  loadingReviews: false,
};

const reviewsSlice = createSlice({
  name: NameSpaceState.REVIEWS,
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.listReviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsCamera.pending, (state) => {
        state.loadingReviews = true;
      })
      .addCase(getReviewsCamera.fulfilled, (state, action) => {
        state.listReviews = action.payload;
        state.loadingReviews = false;
      });
  }
});

export const reviewsReducer = reviewsSlice.reducer;
export const {clearReviews} = reviewsSlice.actions;
