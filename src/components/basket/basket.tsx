import { Link } from 'react-router-dom';
import CardProductBasket from './card-product-basket/card-product-basket';
import { AddresesRoute, NameSpaceSearchParams, TypeSort, DirectionSort } from '../../const';
export default function Basket(): JSX.Element {
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
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              <CardProductBasket />
            </ul>
            <div className="basket__summary">
              <div className="basket__promo">
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                <button className="btn btn--purple" type="submit">Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
