import { NameSpaceState } from '../../const';
import { TypeState } from '../../type/type-redux';

export const getStateCameraList = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].cameraList;

export const getStateLoadingCameraList = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].loadingCameraList;

export const getStatePromoList = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].promoList;

export const getStateLoadingPromoList = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].loadingPromoList;

export const getStateLoadingPostOrder = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].loadingPostOrder;

export const getResultPlacingOrder = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].resultPlacingOrder;

export const getStateCamera = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].camera;

export const getStateLoadingCamera = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].loadingCamera;

export const getStateLoadingRelatedCameras = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].loadingRelatedCameras;

export const getStateRelatedCameras = (state: Pick<TypeState, NameSpaceState.PRODUCT>) =>
  state[NameSpaceState.PRODUCT].relatedProducts;
