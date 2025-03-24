import { Link } from 'react-router-dom';
import { AddresesRoute } from '../../../const';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to={AddresesRoute.CATALOG} aria-label="Переход на главную" data-testid="link-footer-logo">
            <svg width="100" height="36" aria-hidden="true" >
              <use xlinkHref="#icon-logo-mono" data-testid="link-footer-logo-img"></use>
            </svg>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <a className="link" href="#" aria-label="Переход на страницу вконтатке" data-testid="link-footer-vk">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk" data-testid="link-footer-vk-img"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="#" aria-label="Переход на страницу pinterest" data-testid="link-footer-pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest" data-testid="link-footer-pinterest-img"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="#" aria-label="Переход на страницу reddit" data-testid="link-footer-reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit" data-testid="link-footer-reddit-img"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={AddresesRoute.CATALOG}>Каталог
                </Link>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Гарантии
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Доставка
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">О компании
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">Курсы операторов
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Блог
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Сообщество
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">FAQ
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Задать вопрос
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
