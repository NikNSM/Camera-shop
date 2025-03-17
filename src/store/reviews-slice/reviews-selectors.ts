import { NameSpaceState } from '../../const';
import { TypeState } from '../../type/type-redux';

export const getStateListReviews = (state: TypeState) =>
  state[NameSpaceState.REVIEWS].listReviews;

export const getStateLoadingReviews = (state: TypeState) =>
  state[NameSpaceState.REVIEWS].loadingReviews;
