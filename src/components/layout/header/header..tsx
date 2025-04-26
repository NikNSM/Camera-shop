import { Link, useNavigate } from 'react-router-dom';
import { AddresesRoute } from '../../../const';
import { useAppSelector } from '../../../utils';
import { getStateCameraList } from '../../../store/product-slice/product-selectors';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../../type/type';

export default function Header(): JSX.Element {
  const MIN_LENGTH_SEARCH_NAME = 3;
  const navigate = useNavigate();
  const cameraList = useAppSelector(getStateCameraList);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [foundCamerasName, setFoundCamersName] = useState<ProductCard[]>([]);
  const classListSearch = valueSearch.length >= 1 ? 'form-search list-opened' : 'form-search';

  const findCamerasName = (productList: ProductCard[], searchName: string) => {
    if (searchName.length >= MIN_LENGTH_SEARCH_NAME) {
      const regExp = new RegExp(searchName, 'i');
      const newFoundCamerasName = productList.filter((camera) => regExp.test(camera.name));
      setFoundCamersName(newFoundCamerasName);
    }
  };

  const resetSearch = () => {
    setValueSearch('');
    setFoundCamersName([]);
  };

  const handleSearchCameraClick = (id: number) => {
    resetSearch();
    navigate(`${AddresesRoute.CAMERA}${id}`);
  };

  useEffect(() => {
    findCamerasName(cameraList, valueSearch);
  }, [valueSearch, cameraList]);

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
        <div className={classListSearch}>
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input
                className="form-search__input"
                type="text" autoComplete="off"
                placeholder="Поиск по сайту"
                onInput={(evt) => {
                  setValueSearch(evt.currentTarget.value);
                }}

                value={valueSearch}
              />
            </label>
            {valueSearch.length >= MIN_LENGTH_SEARCH_NAME && foundCamerasName.length !== 0 ?
              <ul className="form-search__select-list">
                {foundCamerasName.map((camera) => (
                  <li
                    key={camera.name}
                    className="form-search__select-item"
                    tabIndex={0}
                    onClick={() => {
                      handleSearchCameraClick(camera.id);
                    }}
                  >
                    {camera.name}
                  </li>))}
              </ul> : ''}
          </form>
          <button
            className="form-search__reset"
            type="reset"
            onClick={() => {
              resetSearch();
            }}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
      </div>
    </header >
  );
}
