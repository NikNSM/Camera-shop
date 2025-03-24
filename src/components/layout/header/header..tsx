import { Link } from 'react-router-dom';
import { AddresesRoute } from '../../../const';

export default function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AddresesRoute.CATALOG} aria-label="Переход на главную" data-testid="link-header-logo">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo" data-testid="link-header-use"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AddresesRoute.CATALOG}>Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
      </div>
    </header >
  );
}
