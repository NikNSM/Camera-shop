import { clearReviews, reviewsReducer } from './reviews-slice';
import { getReviewsCamera } from './api-reviews';
describe(
  'Reviews slice', () => {
    it('Should return initial state with empty action', () => {
      const emptyAction = {
        type: ''
      };

      const expectedState = {
        listReviews: [
          {
            id: '12343dd',
            createAt: '22.02.2020',
            cameraId: 1,
            userName: 'Q1q1',
            advantage: 'Достоинства',
            disadvantage: 'Недостатки',
            review: 'Как то так',
            rating: 2,
          }
        ],
        loadingReviews: false,
      };

      const result = reviewsReducer(expectedState, emptyAction);
      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undenfined', () => {
      const emptyAction = {
        type: ''
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
        listReviews: [
          {
            id: '12343dd',
            createAt: '22.02.2020',
            cameraId: 1,
            userName: 'Q1q1',
            advantage: 'Достоинства',
            disadvantage: 'Недостатки',
            review: 'Как то так',
            rating: 2,
          }
        ],
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

    it('should set "loadinReviews" to "false" and "listReviews" to array Reviews camera with action "getReviewsCamera.fuldilled"',
      () => {
        const listReviews = [
          {
            id: '12343dd',
            createAt: '22.02.2020',
            cameraId: 1,
            userName: 'Q1q1',
            advantage: 'Достоинства',
            disadvantage: 'Недостатки',
            review: 'Как то так',
            rating: 2,
          }
        ];

        const expectedState = {
          listReviews,
          loadingReviews: false,
        };

        const initialState = {
          listReviews: [],
          loadingReviews: true,
        };

        const result = reviewsReducer(initialState, getReviewsCamera.fulfilled(listReviews, '', ''));

        expect(result).toEqual(expectedState);

      });

  }
);
