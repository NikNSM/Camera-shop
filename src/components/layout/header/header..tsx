import { Link} from 'react-router-dom';
import { AddresesRoute, DirectionSort, NameSpaceSearchParams, TypeSort } from '../../../const';
import { useAppSelector } from '../../../utils';
import { getStateCameraList } from '../../../store/product-slice/product-selectors';
import { useSearchCameras, NameSpaceElementsFocus } from './use-search-cameras/use-search-cameras';

export default function Header(): JSX.Element {
  const cameraList = useAppSelector(getStateCameraList);
  const [foundCamerasName, valueSearch, listElements, setActiveFocusElement, resetSearch, redirectToCamerPage, setValueSearch] = useSearchCameras(cameraList);
  const classListSearch = valueSearch.length >= 1 ? 'form-search list-opened' : 'form-search';

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`} aria-label="Переход на главную" data-testid="link-header-logo">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo" data-testid="link-header-use"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={`${AddresesRoute.CATALOG}?${NameSpaceSearchParams.TYPE_SORT}=${TypeSort.PRICE}&${NameSpaceSearchParams.DIRECTION_SORT}=${DirectionSort.UP}`}>Каталог</Link>
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
                ref={(el) => {
                  listElements.current[NameSpaceElementsFocus.INPUT_SEARCH] = el;
                }}
                className="form-search__input"
                type="text" autoComplete="off"
                placeholder="Поиск по сайту"
                onInput={(evt) => {
                  setValueSearch(evt.currentTarget.value);
                }}
                onFocus={() => {
                  setActiveFocusElement(NameSpaceElementsFocus.INPUT_SEARCH);
                }}
                onBlur={() => {
                  setActiveFocusElement(null);
                }}
                value={valueSearch}
              />
            </label>
            {foundCamerasName.length !== 0 ?
              <ul className="form-search__select-list">
                {foundCamerasName.map((camera, index) => (
                  <li
                    ref={(el) => {
                      listElements.current[NameSpaceElementsFocus.CAMERAS_SEARCH_LIST][index] = el;
                    }}
                    key={camera.name}
                    className="form-search__select-item"
                    tabIndex={0}
                    onClick={() => {
                      redirectToCamerPage(camera.id);
                    }}
                    onFocus={() => {
                      setActiveFocusElement(NameSpaceElementsFocus.CAMERAS_SEARCH_LIST, index, camera.id);
                    }}
                    onBlur={() => {
                      setActiveFocusElement(null);
                    }}
                  >
                    {camera.name}
                  </li>))}
              </ul> : ''}
          </form>
          <button
            ref={(el) => {
              listElements.current[NameSpaceElementsFocus.RESET_BUTTON] = el;
            }}
            className="form-search__reset"
            type="reset"
            onClick={() => {
              resetSearch();
            }}
            onFocus={() => {
              setActiveFocusElement(NameSpaceElementsFocus.RESET_BUTTON);
            }}
            onBlur={() => {
              setActiveFocusElement(null);
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
