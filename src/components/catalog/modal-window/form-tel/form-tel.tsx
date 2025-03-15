import { MutableRefObject, useEffect } from 'react';
import { useAppSelector } from '../../../../utils';
import { ResultPlacingOrder, IsValidUserPhone } from '../../../../type/type';
import { getResultPlacingOrder } from '../../../../store/product-slice/product-selectors';
import { useSendOrder } from '../use-send-order/use-send-order';
import MessagePlacingOrder from './message-placing-order/message-placing-order';

type PropsFormTel = {
  inputTel: MutableRefObject<HTMLInputElement | null>;
  orderButton: MutableRefObject<HTMLButtonElement | null>;
  inedxFocusElement: MutableRefObject<number>;
  cameraId: number;
}

export default function FormTel({ inputTel, orderButton, inedxFocusElement, cameraId }: PropsFormTel): JSX.Element {
  const resultPlacingOrder = useAppSelector(getResultPlacingOrder);
  const defaultValue = '+7(9';
  const [validateNumberPhoneUser, sendOrder, setNumberPhoneIsValid, numberPhoneIsValid] = useSendOrder(cameraId);

  useEffect(() => {
    if (resultPlacingOrder !== ResultPlacingOrder.SUCCESSFULY) {
      return;
    }
    if (inputTel.current === null) {
      return;
    }
    inputTel.current.value = defaultValue;
    setNumberPhoneIsValid(IsValidUserPhone.UNKNOW);
  }, [resultPlacingOrder, inputTel, setNumberPhoneIsValid]);

  return (
    <>
      <div className={`custom-input form-review__item ${numberPhoneIsValid === IsValidUserPhone.UNKNOW ? '' : numberPhoneIsValid}`}>
        <label>
          <span className="custom-input__label">Телефон
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake"></use>
            </svg>
          </span>
          <input type="tel" name="user-tel" placeholder="Введите ваш номер" required defaultValue={defaultValue} ref={inputTel}
            onInput={(evt) => {
              if (evt.currentTarget.value.length === 0) {
                evt.currentTarget.value = defaultValue;
              }
              validateNumberPhoneUser(evt.currentTarget.value);
            }}
            onFocus={() => {
              inedxFocusElement.current = 0;
            }}
          />
        </label>
        <p className="custom-input__error">Нужно указать номер</p>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width"
          onClick = {sendOrder}
          type="button"
          ref={orderButton}
          disabled={numberPhoneIsValid !== IsValidUserPhone.ISVALID}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Заказать
        </button>
      </div>
      <MessagePlacingOrder resultPlacingOrder={resultPlacingOrder}/>
    </>
  );
}
