import { useLocation, useNavigate } from 'react-router-dom';
import { AddresesRoute, NameSpaceModalWindowProduct, TypeSort, DirectionSort, NameSpaceSearchParams } from '../../../const';
import { addProductBasket, deleteProductBasket } from '../../../store/basket-slice/basket-slice';
import { ProductCard } from '../../../type/type';
import { getDataBasket, getPayloadActiveModalWindow, useAppDispatch } from '../../../utils';
import InformationCamera from '../information-camera/information-camera';
import { MutableRefObject } from 'react';
import { clearActiveModalWinow, setActiveModalWindow } from '../../../store/modal-window-slice/modal-window-slice';

type PropsModalButtons = {
  name: string;
  camera: ProductCard | null;
  elementsFocus: MutableRefObject<(HTMLAnchorElement | HTMLElement | null)[]>;
}

export default function ModalWindowContent({ name, camera, elementsFocus }: PropsModalButtons) {
  const { pathname } = useLocation();
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
              ref={(element) => {
                elementsFocus.current[1] = element;
              }}
              onClick={() => {
                dispatch(addProductBasket(getDataBasket(camera?.id as number)));
                dispatch(
                  setActiveModalWindow(
                    getPayloadActiveModalWindow(NameSpaceModalWindowProduct.SUCCESSFULLY)
                  )
                );
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
              ref={(element) => {
                elementsFocus.current[1] = element;
              }}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(
                  setActiveModalWindow(
                    getPayloadActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW)
                  )
                );
                if (pathname !== AddresesRoute.CATALOG) {
                  navigate(`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`);
                }
              }}
            >
              Продолжить покупки
            </a>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              ref={(element) => {
                elementsFocus.current[2] = element;
              }}
              onClick={() => {
                dispatch(
                  setActiveModalWindow(
                    getPayloadActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW)
                  )
                );
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
              ref={(element) => {
                elementsFocus.current[1] = element;
              }}
              onClick={() => {
                if (camera !== null) {
                  dispatch(deleteProductBasket(camera.id));
                  dispatch(
                    setActiveModalWindow(
                      getPayloadActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW)
                    )
                  );
                }
              }}
            >
              Удалить
            </button>
            <a
              className="btn btn--transparent modal__btn modal__btn--half-width"
              href='#'
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(
                  setActiveModalWindow(
                    getPayloadActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW)
                  )
                );
                navigate(`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`);
              }}
              ref={(element) => {
                elementsFocus.current[2] = element;
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
              ref={(element) => {
                elementsFocus.current[1] = element;
              }}
              onClick={() => {
                dispatch(
                  clearActiveModalWinow()
                );
              }}
            >
              Вернуться к покупкам
            </button>
          </div>
        </>
      );
    case NameSpaceModalWindowProduct.ERROR:
      return (
        <>
          <p className="title title--h4">Произошло ошибка, может попробовать<br />снова или вернуться к выбору товара</p>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width" type="button"
              ref={(element) => {
                elementsFocus.current[1] = element;
              }}
              onClick={() => {
                dispatch(
                  clearActiveModalWinow()
                );
              }}
            >
              Продолжить
            </button>
            <a
              className="btn btn--transparent modal__btn modal__btn--half-width"
              href='#'
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(
                  setActiveModalWindow(
                    getPayloadActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW)
                  )
                );
                navigate(`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`);
              }}
              ref={(element) => {
                elementsFocus.current[2] = element;
              }}
            >
              Вернуться к покупкам
            </a>
          </div>
        </>
      );
  }
}
