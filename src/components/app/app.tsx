import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddresesRoute } from '../../const';
import Layout from '../layout/layout';
import Catalog from '../catalog/catalog';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AddresesRoute.CATALOG} element={<Layout />}>
          <Route index element={<Catalog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
