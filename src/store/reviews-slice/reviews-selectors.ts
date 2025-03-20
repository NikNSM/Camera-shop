import { NameSpaceState } from '../../const';
import { TypeState } from '../../type/type-redux';

export const getStateListReviews = (state: Pick<TypeState, NameSpaceState.REVIEWS>) =>
  state[NameSpaceState.REVIEWS].listReviews;

export const getStateLoadingReviews = (state: Pick<TypeState, NameSpaceState.REVIEWS>) =>
  state[NameSpaceState.REVIEWS].loadingReviews;
