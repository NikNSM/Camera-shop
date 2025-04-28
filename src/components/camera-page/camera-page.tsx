import LoaderGetData from '../loader/loader-get-data/loader-get-data';
import { Link, useParams } from 'react-router-dom';
import InformationCameraPage from './information-camera-page/information-camera-page';
import ReviewsComponent from './reviews-component/reviews-component';
import { useAppDispatch, useAppSelector } from '../../utils';
import { getStateCamera, getStateLoadingCamera } from '../../store/product-slice/product-selectors';
import { useEffect } from 'react';
import { getCamera } from '../../store/product-slice/api-product';
import { clearCamera } from '../../store/product-slice/product-slice';
import { AddresesRoute, DirectionSort, NameSpaceSearchParams, NameTitleLoader, TypeSort } from '../../const';
import { clearReviews } from '../../store/reviews-slice/reviews-slice';
import { Helmet } from 'react-helmet-async';

export default function CameraPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getStateCamera);
  const loadingCamera = useAppSelector(getStateLoadingCamera);

  useEffect(() => {
    if (id) {
      dispatch(getCamera(id));
      window.scrollTo(0, 0);
      return () => {
        dispatch(clearCamera());
        dispatch(clearReviews());
      };
    }
  }, [dispatch, id]);

  return (
    <>
      <main>
        {!camera || loadingCamera ? <LoaderGetData title={NameTitleLoader.CAMERA} /> :

          <div className="page-content">
            <Helmet>
              <title>{`${camera.name}`}</title>
            </Helmet>
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
                    <span className="breadcrumbs__link breadcrumbs__link--active">
                      {camera.name}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <InformationCameraPage camera={camera}/>
            <ReviewsComponent />
          </div>}
      </main>
      {!camera || loadingCamera ? '' :
        <a className="up-btn" href="#header" onClick={(evt) => {
          evt.preventDefault();
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }}
        >
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>}
    </>
  );
}
