import { useState } from 'react';
import { addProductBasket, reduceProductBasket, setQuantityProduct } from '../../../store/basket-slice/basket-slice';
import { StateProductsBasket } from '../../../type/type';
import { getConversionTypeCamera, getCurrenceRub, getDataBasket, getPayloadActiveModalWindow, useAppDispatch } from '../../../utils';
import { NameSpaceModalWindowProduct } from '../../../const';
import { setActiveModalWindow } from '../../../store/modal-window-slice/modal-window-slice';

type PropsCardProductBasket = {
  camera: StateProductsBasket;
}
export default function CardProductBasket({ camera }: PropsCardProductBasket): JSX.Element {
  const MAX_PRODUCT = 9;
  const MIN_PRODUCT = 1;
  const [quantityCamera, setQuantityCamera] = useState<string>(camera.quantity.toString());
  const dispatch = useAppDispatch();
  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`} />
          <img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{`${getConversionTypeCamera(camera.type, camera.category)} ${camera.category}`} </li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{getCurrenceRub(camera.price)} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара"
          onClick={() => {
            const newQuantity = Number(quantityCamera) - 1;
            dispatch(reduceProductBasket(camera.id));
            setQuantityCamera(newQuantity.toString());
          }}
          disabled={camera.quantity === MIN_PRODUCT}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          value={quantityCamera}
          min="1"
          max="99"
          aria-label="количество товара"
          onInput={(evt) => {
            setQuantityCamera(evt.currentTarget.value);
          }}
          onBlur={(evt) => {
            let newQuantity = Number(evt.currentTarget.value);
            if (newQuantity > MAX_PRODUCT) {
              newQuantity = MAX_PRODUCT;
            }
            if (newQuantity < MIN_PRODUCT) {
              newQuantity = MIN_PRODUCT;
            }
            dispatch(setQuantityProduct(getDataBasket(camera.id, newQuantity)));
            setQuantityCamera(newQuantity.toString());
          }}
        />
        <button
          className="btn-icon btn-icon--next" aria-label="увеличить количество товара"
          onClick={() => {
            const newQuantity = Number(quantityCamera) + 1;
            dispatch(addProductBasket(getDataBasket(camera.id)));
            setQuantityCamera(newQuantity.toString());
          }}
          disabled={camera.quantity === MAX_PRODUCT}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getCurrenceRub(camera.price * camera.quantity)} ₽</div>
      <button
        className="cross-btn" type="button"
        aria-label="Удалить товар"
        onClick={() => {
          dispatch(
            setActiveModalWindow(
              getPayloadActiveModalWindow(NameSpaceModalWindowProduct.DELETE, camera)
            )
          );
        }}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
