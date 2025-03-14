import { MutableRefObject, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../utils';
import { OrderContactMe, ResultPlacingOrder } from '../../../../type/type';
import { postOrder } from '../../../../store/product-slice/api-product';
import { getResultPlacingOrder } from '../../../../store/product-slice/product-selectors';

type PropsFormTel = {
  inputTel: MutableRefObject<HTMLInputElement | null>;
  orderButton: MutableRefObject<HTMLButtonElement | null>;
  inedxFocusElement: MutableRefObject<number>;
  cameraId: number;
}

enum IsValidUserPhone {
  UNKNOW = 'unknow',
  ISVALID = 'is-valid',
  ISINVALID = 'is-invalid'
}

export default function FormTel({ inputTel, orderButton, inedxFocusElement, cameraId }: PropsFormTel): JSX.Element {
  const dispatch = useAppDispatch();
  const resultPlacingOrder = useAppSelector(getResultPlacingOrder);
  const defaultValue = '+7(9';
  const [numberPhone, setNumberPhone] = useState<string>('');
  const [numberPhoneIsValid, setNumberPhoneIsValid] = useState<IsValidUserPhone>(IsValidUserPhone.UNKNOW);
  const regExpTel = /^(\+79)\d{9}$/;
  const regExpTelReplace = /-|\(|\)/g;

  const checkValidateNumberPhoneUser = (value: string) => {
    if (regExpTel.test(value)) {
      setNumberPhoneIsValid(IsValidUserPhone.ISVALID);
    } else if (numberPhoneIsValid !== IsValidUserPhone.ISINVALID) {
      setNumberPhoneIsValid(IsValidUserPhone.ISINVALID);
    }
  };

  useEffect(() => {
    if (resultPlacingOrder !== ResultPlacingOrder.SUCCESSFULY) {
      return;
    }
    if (inputTel.current === null) {
      return;
    }
    inputTel.current.value = defaultValue;
    setNumberPhoneIsValid(IsValidUserPhone.UNKNOW);
  }, [resultPlacingOrder, inputTel]);

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
              const value = evt.currentTarget.value.replace(regExpTelReplace, '');
              checkValidateNumberPhoneUser(value);
              setNumberPhone(value);
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
          onClick={() => {
            const orderInformation: OrderContactMe = {
              camerasIds: [cameraId],
              coupon: null,
              tel: numberPhone
            };
            dispatch(postOrder(orderInformation));
          }}
          type="button"
          ref={orderButton}
          disabled={numberPhoneIsValid !== IsValidUserPhone.ISVALID}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Заказать
        </button>
        {resultPlacingOrder === ResultPlacingOrder.SUCCESSFULY &&
          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: '18px',
              color: '#65cd54'
            }}
          >
            Заказ успешно создан. Мы с вами свяжимся!
          </ p>}
        {resultPlacingOrder === ResultPlacingOrder.ERROR &&
          <p
            style={{
              fontSize: '16px',
              fontWeight:'bold',
              lineHeight: '18px',
              color: '#ed6041'
            }}
          >Произошла ошибка. Попробуйте снова.
          </ p>}
      </div>
    </>
  );
}
