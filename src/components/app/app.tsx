import { Routes, Route } from 'react-router-dom';
import { AddresesRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRoute from '../history-route/history-route';
import browserHistory from '../../browser-history/browser-history';
import Layout from '../layout/layout';
import Catalog from '../catalog/catalog';
import CameraPage from '../camera-page/camera-page';
import Page404 from '../page-404/page-404';
import Basket from '../basket/basket';
import { initializeStateBasket } from '../../store/basket-slice/basket-slice';
import { getBasketLocalStorage } from '../../api/basket-local-storage';
import { useEffect } from 'react';
import { useAppDispatch } from '../../utils';
import { getCameraList, getPromoList } from '../../store/product-slice/api-product';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const basketLocalStorage = getBasketLocalStorage();
    dispatch(getCameraList());
    dispatch(getPromoList());
    if (basketLocalStorage) {
      dispatch(initializeStateBasket(basketLocalStorage));
    }
  }, [dispatch]);

  return (
    <HelmetProvider>
      <HistoryRoute history={browserHistory}>
        <Routes>
          <Route path={AddresesRoute.CATALOG} element={<Layout />}>
            <Route index element={<Catalog />} />
            <Route path={AddresesRoute.BASKET} element={<Basket />} />
            <Route path={`${AddresesRoute.CAMERA}:id`} element={<CameraPage />} />
            <Route path='*' element={<Page404 />} />
          </Route>
        </Routes>
      </HistoryRoute>
    </HelmetProvider>
  );
}
