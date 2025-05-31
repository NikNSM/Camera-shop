import { useAppSelector, getCurrenceRub, useAppDispatch } from '../../../utils';
import { getStatePromoList } from '../../../store/product-slice/product-selectors';
import { getDiscount, getAmountBasket, getArgumentCoupon, getDataOrder } from '../utils-basket';
import { StateProductsBasket } from '../../../type/type';
import { useEffect, useRef, useState } from 'react';
import { StatusVerificationCoupon } from '../../../const';
import { getStateCouponBasket, getStatePercentDiscountCoupon, getStateStatusVerificationCoupon } from '../../../store/basket-slice/basket-selectors';
import { checkCoupon, creatOrder } from '../../../store/basket-slice/api-basket';
import { changeStatusVerification } from '../../../store/basket-slice/basket-slice';

type PropsBasketSummary = {
  camerasListBasket: StateProductsBasket[];
}

export default function BasketSummary({ camerasListBasket }: PropsBasketSummary): JSX.Element {
  const dispatch = useAppDispatch();

  const promoCameras = useAppSelector(getStatePromoList);
  const statusVerificationCoupon = useAppSelector(getStateStatusVerificationCoupon);
  const coupon = useAppSelector(getStateCouponBasket);
  const percentCoupon = useAppSelector(getStatePercentDiscountCoupon);

  const [couponValue, setValueCoupon] = useState<string>(coupon !== null ? coupon : '');

  const amountProducts: number = getAmountBasket(camerasListBasket);
  const dicount = getDiscount(camerasListBasket, promoCameras, percentCoupon);
  const totalAmount = amountProducts - dicount;

  const inputCoupon = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (coupon !== null) {
      dispatch(changeStatusVerification(StatusVerificationCoupon.IS_VALID));
    } else {
      dispatch(changeStatusVerification(StatusVerificationCoupon.UNKNOW));
    }
  }, []);
  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#" onSubmit={(evt) => {
            evt.preventDefault();
            dispatch(checkCoupon(getArgumentCoupon(couponValue)));
          }}
          >
            <div className={`custom-input ${statusVerificationCoupon !== StatusVerificationCoupon.BEING_CHECKED && statusVerificationCoupon !== StatusVerificationCoupon.UNKNOW ? statusVerificationCoupon : ''}`}>
              <label><span className="custom-input__label">Промокод</span>
                <input
                  ref={inputCoupon}
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  defaultValue={couponValue}
                  onChange={(evt) => {
                    const newValue = evt.currentTarget.value.replace(/\s+/g, '');
                    if (inputCoupon.current !== null) {
                      inputCoupon.current.value = newValue;
                      setValueCoupon(newValue);
                      if (statusVerificationCoupon === StatusVerificationCoupon.IS_INVALID || statusVerificationCoupon === StatusVerificationCoupon.IS_VALID) {
                        dispatch(changeStatusVerification(StatusVerificationCoupon.UNKNOW));
                      }
                    }
                  }}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit" disabled={couponValue.length === 0}>Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{getCurrenceRub(amountProducts)} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">{getCurrenceRub(dicount)} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{getCurrenceRub(totalAmount)} ₽</span></p>
        <button
          className="btn btn--purple"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(
              creatOrder(
                getDataOrder(camerasListBasket, coupon)
              )
            );
          }}
        >Оформить заказ
        </button>
      </div>
    </div>
  );
}
