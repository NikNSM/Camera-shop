import { Link } from 'react-router-dom';
import CardProductBasket from './card-product-basket/card-product-basket';
import { AddresesRoute, NameSpaceSearchParams, TypeSort, DirectionSort, StatusVerificationCoupon, NameTitleLoader, NameSpaceModalWindowProduct } from '../../const';
import { useAppSelector } from '../../utils';
import { getStateOrderProcessing, getStateProductsBasket, getStateStatusVerificationCoupon } from '../../store/basket-slice/basket-selectors';
import { getStateCameraList, getStateLoadingCameraList, getStateLoadingPromoList } from '../../store/product-slice/product-selectors';
import { ProductCard, StateProductsBasket } from '../../type/type';
import ModalWindow from '../modal-window/modal-window';
import BasketSummary from './basket-summary/basket-summary';
import Preloader from '../loader/preloader/preloader';
import LoaderGetData from '../loader/loader-get-data/loader-get-data';
import { getStateActiveModalWindow } from '../../store/modal-window-slice/modal-window-selectors';

export default function Basket(): JSX.Element {
  const camerasInBasket = useAppSelector(getStateProductsBasket);
  const camerasList = useAppSelector(getStateCameraList);
  const statusVerificationCoupon = useAppSelector(getStateStatusVerificationCoupon);
  const loadingPromoList = useAppSelector(getStateLoadingPromoList);
  const loadingCamerasList = useAppSelector(getStateLoadingCameraList);
  const orderProcessing = useAppSelector(getStateOrderProcessing);
  const activeModalWindow = useAppSelector(getStateActiveModalWindow);

  const camerasListBasket: StateProductsBasket[] = camerasInBasket.reduce((acc: StateProductsBasket[], item) => {
    const newCamera = camerasList.find((camera) => camera.id === item.cameraId) as ProductCard;
    return acc.concat({
      ...newCamera,
      quantity: item.quantity
    });
  }, []);

  return (
    <main>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="index.html">Главная
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`}>Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
              </li>
            </ul>
          </div>
        </div>
        {
          loadingCamerasList || loadingPromoList ? <LoaderGetData title={NameTitleLoader.BASKET} /> :
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  {camerasListBasket.map((camera) => <CardProductBasket key={camera.id} camera={camera} />)}
                </ul>
                < BasketSummary camerasListBasket={camerasListBasket} />
              </div>
            </section>
        }
      </div>
      {activeModalWindow !== NameSpaceModalWindowProduct.UNKNOW && <ModalWindow />}
      {statusVerificationCoupon === StatusVerificationCoupon.BEING_CHECKED && <Preloader />}
      {orderProcessing && <Preloader />}
    </main>
  );
}
