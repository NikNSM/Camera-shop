import { MutableRefObject, useEffect } from 'react';
import { useAppSelector } from '../../../../utils';
import { ResultPlacingOrder, IsValidUserPhone } from '../../../../type/type';
import { getResultPlacingOrder, getStateLoadingPostOrder } from '../../../../store/product-slice/product-selectors';
import { useSendOrder } from '../use-send-order/use-send-order';
import LoaderButtonModalWindow from '../../../loader/loader-upload-data/loader-upload-data';

type PropsFormTel = {
  inputTel: MutableRefObject<HTMLInputElement | null>;
  orderButton: MutableRefObject<HTMLButtonElement | null>;
  inedxFocusElement: MutableRefObject<number>;
  closeModalWindow: () => void;
  cameraId: number;
}

export default function FormTel({ inputTel, orderButton, inedxFocusElement, closeModalWindow, cameraId }: PropsFormTel): JSX.Element {
  const resultPlacingOrder = useAppSelector(getResultPlacingOrder);
  const loadingPostOrder = useAppSelector(getStateLoadingPostOrder);
  const defaultValue = '+7(9';
  const [validateNumberPhoneUser, sendOrder, numberPhoneIsValid] = useSendOrder(cameraId);
  const classFormTel = () => {
    if (numberPhoneIsValid === IsValidUserPhone.ISVALID && resultPlacingOrder !== ResultPlacingOrder.ERROR) {
      return IsValidUserPhone.ISVALID;
    } else if (numberPhoneIsValid === IsValidUserPhone.ISINVALID || resultPlacingOrder === ResultPlacingOrder.ERROR) {
      return IsValidUserPhone.ISINVALID;
    }
    return '';
  };

  useEffect(() => {
    if (resultPlacingOrder === ResultPlacingOrder.SUCCESSFULY) {
      closeModalWindow();
    }
  }, [resultPlacingOrder, closeModalWindow]);

  return (
    <>
      <div className={`custom-input form-review__item ${classFormTel()}`}>
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
        {numberPhoneIsValid === IsValidUserPhone.ISINVALID && <p className="custom-input__error">Нужно указать номер</p>}
        {resultPlacingOrder === ResultPlacingOrder.ERROR && <p className="custom-input__error">Ошибка! Попробуйте снова</p>}
      </div>
      <div className="modal__buttons">
        {loadingPostOrder ? <LoaderButtonModalWindow /> :
          <button className="btn btn--purple modal__btn modal__btn--fit-width"
            onClick={sendOrder}
            type="button"
            ref={orderButton}
            disabled={numberPhoneIsValid !== IsValidUserPhone.ISVALID}
          >

            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Заказать
          </button>}
      </div>
    </>
  );
}
