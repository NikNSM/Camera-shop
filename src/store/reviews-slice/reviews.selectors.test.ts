import { NameSpaceState } from '../../const';
import { getStateListReviews, getStateLoadingReviews } from './reviews-selectors';

describe('Reviews selectors', () => {
  const state = {
    [NameSpaceState.REVIEWS]: {
      listReviews: [{
        id: '12343dd',
        createAt: '22.02.2020',
        cameraId: 1,
        userName: 'Q1q1',
        advantage: 'Достоинства',
        disadvantage: 'Недостатки',
        review: 'Как то так',
        rating: 2,
      }],
      loadingReviews: false,
    }
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
