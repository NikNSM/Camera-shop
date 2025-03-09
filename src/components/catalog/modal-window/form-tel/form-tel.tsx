import { MutableRefObject } from 'react';

type PropsFormTel = {
  inputTel: MutableRefObject<HTMLInputElement | null>;
  orderButton: MutableRefObject<HTMLButtonElement | null>;
  inedxFocusElement: MutableRefObject<number>;
}
export default function FormTel({ inputTel, orderButton, inedxFocusElement }: PropsFormTel): JSX.Element {
  return (
    <>
      <div className="custom-input form-review__item">
        <label>
          <span className="custom-input__label">Телефон
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake"></use>
            </svg>
          </span>
          <input type="tel" name="user-tel" placeholder="Введите ваш номер" required ref={inputTel}
            onFocus={() => {
              inedxFocusElement.current = 0;
            }}
          />
        </label>
        <p className="custom-input__error">Нужно указать номер</p>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" ref={orderButton}>
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Заказать
        </button>
      </div>
    </>
  );
}
