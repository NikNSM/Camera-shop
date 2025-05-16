import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createApi } from '../../../api/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { TypeState } from '../../../type/type-redux';
import { Action } from '@reduxjs/toolkit';
import { camera, extractActionsType, promo, TypeAppThunkAppDispatch } from '../../../mocks/mocks';
import { OrderContactMe, ResultPlacingOrder } from '../../../type/type';
import { getCamera, getCameraList, getPromoList, postOrder } from '../api-product';
import { ApiRoute } from '../../../const';
import { getReviewsCamera } from '../../reviews-slice/api-reviews';
import { redirectToRoute } from '../../middleware/redirect/action-redirect';

describe('Api product', () => {
  const axios = createApi();
  const initialStateProduct = {
    loadingCameraList: false,
    loadingPromoList: false,
    loadingPostOrder: false,
    loadingCamera: false,
    resultPlacingOrder: ResultPlacingOrder.UNKNOW,
    cameraList: [],
    promoList: [],
    camera: null
  };
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TypeState, Action<string>, TypeAppThunkAppDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ product: initialStateProduct });
  });

  describe('getCameraList', () => {

    it('should dispatch "getCameraList.pending" and "getCameraList.fulfilled" with thunk action "getCameraList"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.CAMERAS_LIST).reply(200);

      await store.dispatch(getCameraList());
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getCameraList.pending.type,
        getCameraList.fulfilled.type
      ]);
    });

    it('should dispatch "getCameraList" and "getCameraList.rejected" with thunk action "getCameraList"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.CAMERAS_LIST).reply(400);

      await store.dispatch(getCameraList());
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getCameraList.pending.type,
        getCameraList.rejected.type
      ]);
    });

    it('should return data with dispatch "getCameraList.fulfilled" when server responce 200', async () => {
      const mockCamerasList = [camera, camera];
      mockAxiosAdapter.onGet(ApiRoute.CAMERAS_LIST).reply(200, mockCamerasList);

      await store.dispatch(getCameraList());

      const emittedActions = store.getActions();
      const getCameraListFulfilled = emittedActions.at(1) as ReturnType<typeof getCameraList.fulfilled>;

      expect(getCameraListFulfilled.payload).toEqual(mockCamerasList);
    });
  });

  describe('getPromoList', () => {

    it('should dispatch "getPromoList.pending" and "getPromoList.fulfilled" with thunk action "getPromoList"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.PROMO).reply(200);

      await store.dispatch(getPromoList());
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getPromoList.pending.type,
        getPromoList.fulfilled.type
      ]);
    });

    it('should dispatch "getPromoList.pending" and "getPromoList.rejected" with thunk action "getPromoList"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.PROMO).reply(400);

      await store.dispatch(getPromoList());
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getPromoList.pending.type,
        getPromoList.rejected.type
      ]);
    });

    it('should return data with dispatch "getPromoList.fulfilled" when server responce 200', async () => {
      const mockPromoList = [promo, promo];
      mockAxiosAdapter.onGet(ApiRoute.PROMO).reply(200, mockPromoList);

      await store.dispatch(getPromoList());

      const emittedActions = store.getActions();
      const getPromoFulfilled = emittedActions.at(1) as ReturnType<typeof getPromoList.fulfilled>;

      expect(getPromoFulfilled.payload).toEqual(mockPromoList);
    });
  });

  describe('postOrder', () => {
    it('should dispatch "postOrder.pending" and "postOrder.fulfilled" with thunk action "postOrder" when responce 200', async () => {
      const mockOrder: OrderContactMe = {
        camerasIds: [1],
        coupon: null,
        tel: '+79990900708',
      };
      mockAxiosAdapter.onPost(ApiRoute.ORDERS).reply(200);

      await store.dispatch(postOrder(mockOrder));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        postOrder.pending.type,
        postOrder.fulfilled.type,
      ]);
    });

    it('should dispatch "postOrder.pending" and "postOrder.rejected" with thunk action "postOrder" when responce 400', async () => {
      const mockOrder: OrderContactMe = {
        camerasIds: [1],
        coupon: null,
        tel: '+79990900708',
      };
      mockAxiosAdapter.onPost(ApiRoute.ORDERS).reply(400);

      await store.dispatch(postOrder(mockOrder));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        postOrder.pending.type,
        postOrder.rejected.type,
      ]);
    });
  });

  describe('getCamera', () => {
    it('should dispatch "getCamera.pending", "getReviewsCamera.pending" and "getCamera.fulfilled" with thunk action "getCamera" when responce 200', async () => {
      const mockIdCamera = '1';
      const addresesRequestToServer = `${ApiRoute.CAMERAS_LIST}/${mockIdCamera}`;
      mockAxiosAdapter.onGet(addresesRequestToServer).reply(200);

      await store.dispatch(getCamera(mockIdCamera));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getCamera.pending.type,
        getReviewsCamera.pending.type,
        getCamera.fulfilled.type
      ]);
    });

    it('should dispatch "getCamera.pending", "actionRedirect" and "getCamera.rejected" wuth thunk action "getCamera" when responce 400', async () => {
      const mockIdCamera = '1';
      const addresesRequestToServer = `${ApiRoute.CAMERAS_LIST}/${mockIdCamera}`;
      mockAxiosAdapter.onGet(addresesRequestToServer).reply(400);

      await store.dispatch(getCamera(mockIdCamera));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getCamera.pending.type,
        redirectToRoute.type,
        getCamera.rejected.type,
      ]);
    });

    it('should return data with dispatch "getCamera.fulfilled" when server responce 200', async () => {
      const mockIdCamera = '1';
      const mockCamera = camera;
      const addresesRequestToServer = `${ApiRoute.CAMERAS_LIST}/${mockIdCamera}`;
      mockAxiosAdapter.onGet(addresesRequestToServer).reply(200, mockCamera);

      await store.dispatch(getCamera(mockIdCamera));
      const emittedActions = store.getActions();
      const getCameraFulfilled = emittedActions.at(2) as ReturnType<typeof getCamera.fulfilled>;

      expect(getCameraFulfilled.payload).toEqual(mockCamera);
    });
  });
});
