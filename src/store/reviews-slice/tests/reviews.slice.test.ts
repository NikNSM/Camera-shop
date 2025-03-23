import { clearReviews, reviewsReducer } from '../reviews-slice';
import { getReviewsCamera } from '../api-reviews';
import { review } from '../../../mocks/mocks';
describe('Reviews slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };

    const expectedState = {
      listReviews: [review],
      loadingReviews: false,
    };

    const result = reviewsReducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undenfined', () => {
    const emptyAction = {
      type: '',
    };

    const expectedState = {
      listReviews: [],
      loadingReviews: false,
    };

    const result = reviewsReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should clear reviews with action "clearReviews"', () => {
    const initialState = {
      listReviews: [review],
      loadingReviews: false,
    };

    const expectedState = {
      listReviews: [],
      loadingReviews: false,
    };

    const result = reviewsReducer(initialState, clearReviews);

    expect(result).toEqual(expectedState);
  });

  it('should set "loadingReviews" to "true" with action "getReviewsCamera.pending"', () => {
    const expectedState = {
      listReviews: [],
      loadingReviews: true,
    };

    const result = reviewsReducer(undefined, getReviewsCamera.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "loadinReviews" to "false" and "listReviews" to array Reviews camera with action "getReviewsCamera.fuldilled"', () => {
    const listReviews = [review];

    const expectedState = {
      listReviews,
      loadingReviews: false,
    };

    const initialState = {
      listReviews: [],
      loadingReviews: true,
    };

    const result = reviewsReducer(
      initialState,
      getReviewsCamera.fulfilled(listReviews, '', '')
    );

    expect(result).toEqual(expectedState);
  });
});
