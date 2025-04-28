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
import { NameSpaceSearchParams, NameTitleLoader } from '../../const';
import { Helmet } from 'react-helmet-async';
import { useSort } from './use-sort/use-sort';
import { useFilters } from './use-filters/use-filters';
import { useKeydownFilters } from './use -keydown-filters/use-keydown-filters';

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

  const [setActiveSort, sortListProduct] = useSort(searchParams, setSearchParams);
  const [minPrice, maxPrice, filterCameraList, resetFilters] = useFilters(searchParams, setSearchParams);
  const [setActiveFocusFilterElement, setListFiltersElements] = useKeydownFilters(loadingCameraList);

  useEffect(() => {
    const keysSearch = [...searchParams.keys()];
    const keysReference = Object.values(NameSpaceSearchParams);
    keysSearch.forEach((key) => {
      if(!keysReference.includes(key as NameSpaceSearchParams) || key === NameSpaceSearchParams.TAB_PAGE_CAMERA){
        searchParams.delete(key);
        setSearchParams(searchParams);
      }
    });
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
                    onReset={resetFilters}
                  >
                    <h2 className="visually-hidden">Фильтр</h2>
                    <FilterPrice searchParams={searchParams} setSearchParams={setSearchParams} minPrice={minPrice} maxPrice={maxPrice} setActiveFocusFilterElement={setActiveFocusFilterElement} setListFiltersElements={setListFiltersElements}/>
                    <FilterCategory searchParams={searchParams} setSearchParams={setSearchParams} setActiveFocusFilterElement={setActiveFocusFilterElement} setListFiltersElements={setListFiltersElements}/>
                    <FilterType searchParams={searchParams} setSearchParams={setSearchParams} setActiveFocusFilterElement={setActiveFocusFilterElement} setListFiltersElements={setListFiltersElements}/>
                    <FilterLevel searchParams={searchParams} setSearchParams={setSearchParams} />
                    <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                    </button>
                  </form>
                </div>
                <div className="catalog__content">
                  <Sort searchParams={searchParams} setActiveSort={setActiveSort} />
                  <ListProduct setActiveCamera={setActiveCamera} setSearchParamsModalWindow={setSearchParamsModalWindow} searchParams={searchParams} filtersCameraList={filterCameraList} sortListProduct={sortListProduct}/>
                </div>
              </div>
              {activeCamera !== null && <ModalWindow camera={activeCamera} setCamera={setActiveCamera} setSearchParamsModalWindow={setSearchParamsModalWindow} />}
            </div>}
        </section>
      </div>
    </main>
  );
}
