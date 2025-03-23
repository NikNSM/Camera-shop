import { NameSpaceState } from '../../../const';
import { review } from '../../../mocks/mocks';
import {
  getStateListReviews,
  getStateLoadingReviews,
} from '../reviews-selectors';

describe('Reviews selectors', () => {
  const state = {
    [NameSpaceState.REVIEWS]: {
      listReviews: [review],
      loadingReviews: false,
    },
  };

  it('should return list reviews from state', () => {
    const { listReviews } = state[NameSpaceState.REVIEWS];
    const result = getStateListReviews(state);
    expect(result).toEqual(listReviews);
  });

  it('should returm loading list reviews from state', () => {
    const { loadingReviews } = state[NameSpaceState.REVIEWS];
    const result = getStateLoadingReviews(state);
    expect(result).toBe(loadingReviews);
  });
});
