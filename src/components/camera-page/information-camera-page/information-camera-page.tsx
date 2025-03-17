import { ProductCard } from '../../../type/type';
import CameraTabs from './camera-tab/camera-tabs';

type PropsInformationCameraPage = {
  camera: ProductCard;
}

export default function InformationCameraPage({ camera }: PropsInformationCameraPage): JSX.Element {
  const price = new Intl.NumberFormat('ru-RU').format(camera.price);
  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`../${camera.previewImgWebp}, ../${camera.previewImgWebp2x}`} />
              <img src={`../${camera.previewImg}`} srcSet={`../${camera.previewImg2x}`} width="560" height="480" alt="Ретрокамера Das Auge IV" />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{camera.name}</h1>
            <div className="rate product__rate">
              {Array.from({ length: 5 }, (_, index) => (
                <svg key={`stars-${index + 1}`} width="17" height="16" aria-hidden="true">
                  {camera.rating >= index + 1 ? <use xlinkHref="#icon-full-star"></use> : <use xlinkHref="#icon-star"></use>}
                </svg>))}
              <p className="visually-hidden">Рейтинг: {camera.rating}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
            <button className="btn btn--purple" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
            <CameraTabs camera={camera} />
          </div>
        </div>
      </section>
    </div>
  );
}
