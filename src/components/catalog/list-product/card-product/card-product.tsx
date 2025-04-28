import { Link } from 'react-router-dom';
import { ProductCard } from '../../../../type/type';
import { AddresesRoute, NameSpaceSearchParams, NameTabs } from '../../../../const';
import StarsRating from '../../../stars-rating/stars-rating';

type PropsCardProduct = {
  camera: ProductCard;
  setSearchParamsModalWindow: (cameraId: number | null) => void;
}

export default function CardProduct({ camera, setSearchParamsModalWindow }: PropsCardProduct): JSX.Element {
  const price = new Intl.NumberFormat('ru-RU').format(camera.price);

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
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => setSearchParamsModalWindow(camera.id)}>Купить
        </button>
        <Link className="btn btn--transparent" to={`${AddresesRoute.CAMERA}${camera.id}?${NameSpaceSearchParams.TAB_PAGE_CAMERA}=${NameTabs.CHARACTERISTIC}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
