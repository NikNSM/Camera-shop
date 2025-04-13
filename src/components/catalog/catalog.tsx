import Banner from './banner/banner';
import Sort from './sort/sort';
import FilterType from './filter-type/filter-type';
import FilterLevel from './filter-level/filter-level';
import FilterCategory from './filter-category/filter-category';
import FilterPrice from './filter-price/filter-price';
import ListProduct from './list-product/list-product';
import ModalWindow from './modal-window/modal-window';
import LoaderGetData from '../loader/loader-get-data/loader-get-data';
import { ProductCard } from '../../type/type';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../utils';
import { getStateLoadingCameraList } from '../../store/product-slice/product-selectors';
import { DirectionSort, NameSpaceSearchParams, NameTitleLoader, TypeSort } from '../../const';
import { Helmet } from 'react-helmet-async';

export default function Catalog(): JSX.Element {
  const [activeCamera, setActiveCamera] = useState<null | ProductCard>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const loadingCameraList = useAppSelector(getStateLoadingCameraList);
  const setSearchParamsModalWindow = (cameraId: number | null) => {
    if (cameraId) {
      searchParams.set(NameSpaceSearchParams.MODAL_WINDOW, cameraId.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete(NameSpaceSearchParams.MODAL_WINDOW);
      setSearchParams(searchParams);
    }
  };

  const setActiveTypeSort = (typeSort: TypeSort) => {
    searchParams.set(NameSpaceSearchParams.TYPE_SORT, typeSort);
    setSearchParams(searchParams);
  };

  const setDirectionSort = (directionSort: DirectionSort) => {
    searchParams.set(NameSpaceSearchParams.DIRECTION_SORT, directionSort);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.has(NameSpaceSearchParams.TYPE_SORT) && !searchParams.has(NameSpaceSearchParams.DIRECTION_SORT)) {
      setActiveTypeSort(TypeSort.PRICE);
      setDirectionSort(DirectionSort.UP);
    }
  }, []);


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
                <div className="catalog-filter">
                  <form
                    action="#"
                    onReset={() => {
                      searchParams.delete(NameSpaceSearchParams.FILTER_CATEGORY);
                      searchParams.delete(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
                      searchParams.delete(NameSpaceSearchParams.FILTER_LEVEL);
                      searchParams.delete(NameSpaceSearchParams.FILTER_MIN_PRICE);
                      searchParams.delete(NameSpaceSearchParams.FILTER_MAX_PRICE);
                      setSearchParams(searchParams);
                    }}
                  >
                    <h2 className="visually-hidden">Фильтр</h2>
                    <FilterPrice />
                    <FilterCategory searchParams={searchParams} setSearchParams={setSearchParams} />
                    <FilterType searchParams={searchParams} setSearchParams={setSearchParams} />
                    <FilterLevel searchParams={searchParams} setSearchParams={setSearchParams} />
                    <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                    </button>
                  </form>
                </div>
                <div className="catalog__content">
                  <Sort searchParams={searchParams} setActiveTypeSort={setActiveTypeSort} setActiveDirectionSort={setDirectionSort} />
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
