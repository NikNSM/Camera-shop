import { ProductCard } from '../../../../type/type';

type PropsCardProduct = {
  camera: ProductCard;
  setActiveCamera: React.Dispatch<React.SetStateAction<ProductCard | null>>;
}

export default function CardProduct({ camera, setActiveCamera }: PropsCardProduct): JSX.Element {
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
          {Array.from({ length: 5 }, (_, index) => (
            <svg key={`stars-${index + 1}`} width="17" height="16" aria-hidden="true">
              {camera.rating >= index + 1 ? <use xlinkHref="#icon-full-star"></use> : <use xlinkHref="#icon-star"></use>}
            </svg>))}
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => setActiveCamera(camera)}>Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее
        </a>
      </div>
    </div>
  );
}
