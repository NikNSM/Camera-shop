import { Link } from 'react-router-dom';
import { ProductCard } from '../../../../type/type';
import { AddresesRoute, NameSpaceModalWindowProduct, NameSpaceSearchParams, NameTabs } from '../../../../const';
import StarsRating from '../../../stars-rating/stars-rating';
import { getCurrenceRub, getPayloadActiveModalWindow, useAppDispatch, useAppSelector } from '../../../../utils';
import { getStateProductsBasket } from '../../../../store/basket-slice/basket-selectors';
import { setActiveModalWindow } from '../../../../store/modal-window-slice/modal-window-slice';

type PropsCardProduct = {
  camera: ProductCard;
}

export default function CardProduct({ camera }: PropsCardProduct): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasInBasket = useAppSelector(getStateProductsBasket);
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`} />
          <img src={camera.previewImg} srcSet={camera.previewImg2x} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <StarsRating rating={camera.rating} />
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{getCurrenceRub(camera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {camerasInBasket.some((item) => item.cameraId === camera.id) ?
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AddresesRoute.BASKET}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link> :
          <button
            className="btn btn--purple product-card__btn" type="button"
            onClick={() => {
              dispatch(
                setActiveModalWindow(
                  getPayloadActiveModalWindow(NameSpaceModalWindowProduct.ADD, camera)
                )
              );
            }}
          >
            Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AddresesRoute.CAMERA}${camera.id}?${NameSpaceSearchParams.TAB_PAGE_CAMERA}=${NameTabs.CHARACTERISTIC}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
