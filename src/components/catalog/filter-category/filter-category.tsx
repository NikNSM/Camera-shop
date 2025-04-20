import { SetURLSearchParams } from 'react-router-dom';
import { NameSpaceSearchParams } from '../../../const';
import { CategoryProduct } from '../../../type/type';

type PropsFilterCategory = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}
export default function FilterCategory({ searchParams, setSearchParams }: PropsFilterCategory): JSX.Element {
  const getValueFilterCategory = (category: CategoryProduct) => {
    switch (category) {
      case CategoryProduct.FOTO:
        return 'photocamera';
      case CategoryProduct.VIDEO:
        return 'videocamera';
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title&#45;&#45;h5">Категория</legend>
      {Object.values(CategoryProduct).map((category) => (
        <div key={category} className="custom-radio catalog-filter__item">
          <label>
            <input
              type="radio"
              name="category"
              value={getValueFilterCategory(category)}
              checked={searchParams.get(NameSpaceSearchParams.FILTER_CATEGORY) === category}
              data-category={category}
              onChange={() => {
                searchParams.set(NameSpaceSearchParams.FILTER_CATEGORY, category);
                setSearchParams(searchParams);
              }}
            />
            <span className="custom-radio__icon"></span>
            <span className="custom-radio__label">{category}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
