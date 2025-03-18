import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddresesRoute } from '../../const';
import Layout from '../layout/layout';
import Catalog from '../catalog/catalog';
import CameraPage from '../camera-page/camera-page';
import Page404 from '../page-404/page-404';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AddresesRoute.CATALOG} element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path={`${AddresesRoute.CAMERA}:id`} element={<CameraPage />} />
          <Route path='*' element={<Page404 />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
