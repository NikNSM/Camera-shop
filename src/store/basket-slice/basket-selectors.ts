import { NameSpaceState } from '../../const';
import { TypeState } from '../../type/type-redux';

export const getProductsBasket = (state: Pick<TypeState, NameSpaceState.BASKET>) =>
  state[NameSpaceState.BASKET].product;
