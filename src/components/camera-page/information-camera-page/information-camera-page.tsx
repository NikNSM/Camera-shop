import { ProductCard } from '../../../type/type';
import CameraTabs from './camera-tab/camera-tabs';
import StarsRating from '../../stars-rating/stars-rating';
import { getCurrenceRub, getPayloadActiveModalWindow, useAppDispatch } from '../../../utils';
import { setActiveModalWindow } from '../../../store/modal-window-slice/modal-window-slice';
import { NameSpaceModalWindowProduct } from '../../../const';
type PropsInformationCameraPage = {
  camera: ProductCard;
}

export default function InformationCameraPage({ camera }: PropsInformationCameraPage): JSX.Element {
  const dispatch = useAppDispatch();
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
              <StarsRating rating={camera.rating} />
              <p className="visually-hidden">Рейтинг: {camera.rating}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{getCurrenceRub(camera.price)} ₽</p>
            <button
              className="btn btn--purple"
              type="button"
              onClick={() => {
                dispatch(
                  setActiveModalWindow(
                    getPayloadActiveModalWindow(NameSpaceModalWindowProduct.ADD, camera)
                  )
                );
              }}
            >
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
