import { NameSpaceState } from '../../const';
import { TypeState } from '../../type/type-redux';

export const getStateProductsBasket = (state: Pick<TypeState, NameSpaceState.BASKET>) =>
  state[NameSpaceState.BASKET].products;

export const getStateCouponBasket = (state: Pick<TypeState, NameSpaceState.BASKET>) =>
  state[NameSpaceState.BASKET].coupon;

export const getStateStatusVerificationCoupon = (state: Pick<TypeState, NameSpaceState.BASKET>) =>
  state[NameSpaceState.BASKET].statusVerificationCoupon;

export const getStatePercentDiscountCoupon = (state: Pick<TypeState, NameSpaceState.BASKET>) =>
  state[NameSpaceState.BASKET].percentDicountCoupon;
