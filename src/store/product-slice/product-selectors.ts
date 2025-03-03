import { NameSpaceState } from '../../const';
import { TypeState } from '../../type/type-redux';

export const getStateCameraList = (state: TypeState) =>
  state[NameSpaceState.PRODUCT].cameraList;

export const getStateLoadingCameraList = (state: TypeState) =>
  state[NameSpaceState.PRODUCT].loadingCameraList;

export const getStatePromoList = (state: TypeState) =>
  state[NameSpaceState.PRODUCT].promoList;

export const getStateLoadingPromoList = (state: TypeState) =>
  state[NameSpaceState.PRODUCT].loadingPromoList;
