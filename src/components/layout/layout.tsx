import Footer from './footer/footer';
import Header from './header/header.';
import { Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
