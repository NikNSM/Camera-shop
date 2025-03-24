import Banner from './banner/banner';
import Aside from './aside/aside';
import ListProduct from './list-product/list-product';
import ModalWindow from './modal-window/modal-window';
import LoaderGetData from '../loader/loader-get-data/loader-get-data';
import { ProductCard } from '../../type/type';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../utils';
import { getStateLoadingCameraList } from '../../store/product-slice/product-selectors';
import { NameTitleLoader } from '../../const';
import { Helmet } from 'react-helmet-async';

export default function Catalog(): JSX.Element {
  const [activeCamera, setActiveCamera] = useState<null | ProductCard>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const loadingCameraList = useAppSelector(getStateLoadingCameraList);
  const setSearchParamsModalWindow = (cameraId: number | null) => {
    const camera = cameraId && cameraId.toString();
    if (camera) {
      setSearchParams({ camera });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Helmet>
        <title>Каталог камер!</title>
      </Helmet>
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
          {loadingCameraList ?
            <LoaderGetData title={NameTitleLoader.CAMERA_LIST} /> :
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <Aside />
                <div className="catalog__content">
                  <ListProduct setActiveCamera={setActiveCamera} setSearchParamsModalWindow={setSearchParamsModalWindow} searchParams={searchParams} />
                </div>
              </div>
              {activeCamera !== null && <ModalWindow camera={activeCamera} setCamera={setActiveCamera} setSearchParamsModalWindow={setSearchParamsModalWindow} />}
            </div>}
        </section>
      </div>
    </main>
  );
}
