import Banner from './banner/banner';
import Aside from './aside/aside';
import ListProduct from './list-product/list-product';
import ModalWindow from './modal-window/modal-window';
import { ProductCard } from '../../type/type';
import { useState } from 'react';

export default function Catalog(): JSX.Element {
  const [activeCamera, setActiveCamera] = useState<null | ProductCard>(null);

  return (
    <main>
      <Banner />
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="index.html">
                  Главная
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <Aside />
              <div className="catalog__content">
                <ListProduct setActiveCamera={setActiveCamera}/>
              </div>
            </div>
            {activeCamera !== null && <ModalWindow camera={activeCamera} setCamera={setActiveCamera}/>}
          </div>
        </section>
      </div>
    </main>
  );
}
