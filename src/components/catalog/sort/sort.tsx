import { DirectionSort, NameSpaceSearchParams, TypeSort } from '../../../const';

type PropsSort = {
  searchParams: URLSearchParams;
  setActiveSort: (name: NameSpaceSearchParams, value: string) => void;
}

export default function Sort({ searchParams, setActiveSort }: PropsSort): JSX.Element {
  const typeActiveSort = searchParams.get(NameSpaceSearchParams.TYPE_SORT);
  const directionSort = searchParams.get(NameSpaceSearchParams.DIRECTION_SORT);
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title&#45;&#45;h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={typeActiveSort === TypeSort.PRICE}
                onChange={() => {
                  setActiveSort(NameSpaceSearchParams.TYPE_SORT, TypeSort.PRICE);
                }}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={typeActiveSort === TypeSort.POPULARITY}
                onChange={() => {
                  setActiveSort(NameSpaceSearchParams.TYPE_SORT, TypeSort.POPULARITY);
                }}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order" >
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;up">
              <input type="radio"
                id="up" name="sort-icon"
                aria-label="По возрастанию"
                checked={directionSort === DirectionSort.UP}
                onChange={() => {
                  setActiveSort(NameSpaceSearchParams.DIRECTION_SORT, DirectionSort.UP);
                }}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
              <input type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={directionSort === DirectionSort.DOWN}
                onChange={() => {
                  setActiveSort(NameSpaceSearchParams.DIRECTION_SORT, DirectionSort.DOWN);
                }}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
