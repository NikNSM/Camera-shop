import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddresesRoute } from '../../const';
import Layout from '../layout/layout';
import Catalog from '../catalog/catalog';
import CameraPage from '../camera-page/camera-page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AddresesRoute.CATALOG} element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path={`${AddresesRoute.CAMERA}:id`} element={<CameraPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
