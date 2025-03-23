import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { TypeState } from '../../../type/type-redux';
import { Action } from '@reduxjs/toolkit';
import { createApi } from '../../../api/api';
import {
  extractActionsType,
  review,
  TypeAppThunkAppDispatch,
} from '../../../mocks/mocks';
import { ApiRoute } from '../../../const';
import { getReviewsCamera } from '../api-reviews';

describe('Api Reviews', () => {
  const axios = createApi();
  const initialReviews = {
    listReviews: [],
    loadingReviews: false,
  };

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    TypeState,
    Action<string>,
    TypeAppThunkAppDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ reviews: initialReviews });
  });

  describe('getReviewsCamera', () => {
    it('should dispatch "getReviewsCamera.pending" and "getReviewsCamera.fulfilled" with action "getReviewsCamera" when responce 200', async () => {
      const mockIdCamera = '1';
      const addresesRequestToServer = `${ApiRoute.CAMERAS_LIST}/${mockIdCamera}${ApiRoute.REVIEWS}`;
      mockAxiosAdapter.onGet(addresesRequestToServer).reply(200);

      await store.dispatch(getReviewsCamera(mockIdCamera));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getReviewsCamera.pending.type,
        getReviewsCamera.fulfilled.type,
      ]);
    });

    it('should dispatch "getReviewsCamera.pending" and "getReviewsCamera.rejected" with action "getReviewsCamera" when responce 400', async () => {
      const mockIdCamera = '1';
      const addresesRequestToServer = `${ApiRoute.CAMERAS_LIST}/${mockIdCamera}${ApiRoute.REVIEWS}`;
      mockAxiosAdapter.onGet(addresesRequestToServer).reply(400);

      await store.dispatch(getReviewsCamera(mockIdCamera));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getReviewsCamera.pending.type,
        getReviewsCamera.rejected.type,
      ]);
    });

    it('should return data with action "getReviewsCamera" when responce 200', async () => {
      const mockIdCamera = '1';
      const mockReviewsCamera = [review, review];
      const addresesRequestToServer = `${ApiRoute.CAMERAS_LIST}/${mockIdCamera}${ApiRoute.REVIEWS}`;
      mockAxiosAdapter
        .onGet(addresesRequestToServer)
        .reply(200, mockReviewsCamera);

      await store.dispatch(getReviewsCamera(mockIdCamera));
      const emittedActions = store.getActions();
      const getCameraFulfilled = emittedActions.at(1) as ReturnType<
        typeof getReviewsCamera.fulfilled
      >;

      expect(getCameraFulfilled.payload).toEqual(mockReviewsCamera);
    });
  });
});
