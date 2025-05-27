import { useNavigate } from 'react-router-dom';
import { AddresesRoute, NameSpaceModalWindowProduct, TypeSort, DirectionSort, NameSpaceSearchParams } from '../../../const';
import { addProductBasket, deleteProductBasket } from '../../../store/basket-slice/basket-slice';
import { ProductCard, SetInformationModalWindow } from '../../../type/type';
import { getDataBasket, useAppDispatch } from '../../../utils';
import InformationCamera from '../information-camera/information-camera';
import { MutableRefObject } from 'react';

type PropsModalButtons = {
  name: string;
  camera: ProductCard | null;
  setActiveModalWindow: SetInformationModalWindow;
  orderButton: MutableRefObject<HTMLButtonElement | null>;
}

export default function ModalWindowContent({ name, camera, setActiveModalWindow, orderButton }: PropsModalButtons) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  switch (name) {
    case NameSpaceModalWindowProduct.ADD:
      return (
        <>
          <p className="title title--h4">Добавить товар в корзину</p>
          {camera !== null ? <InformationCamera camera={camera} /> : ''}
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={orderButton}
              onClick={() => {
                dispatch(addProductBasket(getDataBasket(camera?.id as number)));
                setActiveModalWindow(NameSpaceModalWindowProduct.SUCCESSFULLY);
              }}

            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
        </>
      );
    case NameSpaceModalWindowProduct.SUCCESSFULLY:
      return (
        <>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <a
              className="btn btn--transparent modal__btn"
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                setActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW);
              }}
            >
              Продолжить покупки
            </a>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              ref={orderButton}
              onClick={() => {
                navigate(AddresesRoute.BASKET);
              }}
            >
              Перейти в корзину
            </button>
          </div>
        </>
      );
    case NameSpaceModalWindowProduct.DELETE:
      return (
        <>
          <p className="title title--h4">Удалить этот товар?</p>
          {camera !== null ? <InformationCamera camera={camera} /> : ''}
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width" type="button"
              ref={orderButton}
              onClick={() => {
                if (camera !== null) {
                  dispatch(deleteProductBasket(camera.id));
                  setActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW);
                }
              }}
            >
              Удалить
            </button>
            <a
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={(evt) => {
                evt.preventDefault();
                setActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW);
              }}
            >
              Продолжить покупки
            </a>
          </div>
        </>
      );
    case NameSpaceModalWindowProduct.THANKS:
      return (
        <>
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={orderButton}
              onClick={() => {
                navigate(`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`);
              }}
            >
              Вернуться к покупкам
            </button>
          </div>
        </>
      );
  }
}
