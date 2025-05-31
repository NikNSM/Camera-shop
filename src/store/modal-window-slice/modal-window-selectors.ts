import { TypeState } from '../../type/type-redux';
import { NameSpaceState } from '../../const';

export const getStateActiveModalWindow = (state: Pick<TypeState, NameSpaceState.MODAL_WINDOW>) =>
  state[NameSpaceState.MODAL_WINDOW].activeModalWindow;

export const getStateAciveCameraModalWindow = (state: Pick<TypeState, NameSpaceState.MODAL_WINDOW>) =>
  state[NameSpaceState.MODAL_WINDOW].camera;

