import { SetURLSearchParams } from 'react-router-dom';
import { NameSpaceSearchParams } from '../../../const';
import { CategoryProduct } from '../../../type/type';
import { SetActiveFocusFilterElement, NameSpaceElementsFilters, SetListFiltersElements } from '../use -keydown-filters/use-keydown-filters';
type PropsFilterCategory = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setActiveFocusFilterElement: SetActiveFocusFilterElement;
  setListFiltersElements: SetListFiltersElements;
}
export default function FilterCategory({ searchParams, setSearchParams, setActiveFocusFilterElement, setListFiltersElements }: PropsFilterCategory): JSX.Element {
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
              ref={(element) => {
                if(category === CategoryProduct.VIDEO){
                  setListFiltersElements(NameSpaceElementsFilters.CATEGORY_VIDEO, element);
                  return;
                }
                setListFiltersElements(NameSpaceElementsFilters.CATEGORY_FOTO, element);
              }}
              type="radio"
              name="category"
              value={getValueFilterCategory(category)}
              checked={searchParams.get(NameSpaceSearchParams.FILTER_CATEGORY) === category}
              data-category={category}
              onChange={() => {
                searchParams.set(NameSpaceSearchParams.FILTER_CATEGORY, category);
                setSearchParams(searchParams);
              }}
              onFocus={() => {
                if(category === CategoryProduct.VIDEO){
                  setActiveFocusFilterElement(NameSpaceElementsFilters.CATEGORY_VIDEO);
                  return;
                }
                setActiveFocusFilterElement(NameSpaceElementsFilters.CATEGORY_FOTO);
              }}
              onBlur={() => {
                setActiveFocusFilterElement();
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
