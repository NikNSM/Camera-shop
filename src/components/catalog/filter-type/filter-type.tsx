import { SetURLSearchParams } from 'react-router-dom';
import { NameSpaceSearchParams } from '../../../const';
import { CategoryProduct, TypeProduct } from '../../../type/type';
import { NameSpaceElementsFilters, SetListFiltersElements, SetActiveFocusFilterElement } from '../use -keydown-filters/use-keydown-filters';
import { useEffect } from 'react';

type PropsFilterType = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setActiveFocusFilterElement: SetActiveFocusFilterElement;
  setListFiltersElements: SetListFiltersElements;
}

export default function FilterType({ searchParams, setSearchParams, setActiveFocusFilterElement, setListFiltersElements }: PropsFilterType): JSX.Element {
  const getNameFilterType = (type: TypeProduct) => {
    switch (type) {
      case TypeProduct.COLLECTION:
        return 'collection';
      case TypeProduct.DIGITAL:
        return 'digital';
      case TypeProduct.FILM:
        return 'film';
      case TypeProduct.INSTANTLY:
        return 'snapshot';
    }
  };

  const isDisabled = (type: TypeProduct) => {
    if (type === TypeProduct.FILM || type === TypeProduct.INSTANTLY) {
      return searchParams.get(NameSpaceSearchParams.FILTER_CATEGORY) === CategoryProduct.VIDEO;
    }
    return false;
  };

  useEffect(() => {
    if (searchParams.get(NameSpaceSearchParams.FILTER_CATEGORY) === CategoryProduct.VIDEO) {
      const typeSearchParams = searchParams.getAll(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
      searchParams.delete(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
      const newTypeSearchParams = typeSearchParams.filter((parameter) => parameter !== TypeProduct.FILM && parameter !== TypeProduct.INSTANTLY);
      newTypeSearchParams.forEach((perameter) => searchParams.append(NameSpaceSearchParams.FILTER_TYPE_CAMERA, perameter));
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title&#45;&#45;h5">Тип камеры</legend>
      {Object.values(TypeProduct).map((type) => (
        <div key={type} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              ref={(element) => {
                if(type === TypeProduct.COLLECTION){
                  setListFiltersElements(NameSpaceElementsFilters.TYPE_COLLECTION, element);
                }
              }}
              type="checkbox"
              name={getNameFilterType(type)}
              checked={searchParams.getAll(NameSpaceSearchParams.FILTER_TYPE_CAMERA).includes(type)}
              disabled={isDisabled(type)}
              data-type={type}
              onFocus={() => {
                if(type === TypeProduct.COLLECTION){
                  setActiveFocusFilterElement(NameSpaceElementsFilters.TYPE_COLLECTION);
                }
              }}
              onBlur={() => {
                if(type === TypeProduct.COLLECTION){
                  setActiveFocusFilterElement();
                }
              }}
              onChange={() => {
                const typeSearchParams = searchParams.getAll(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
                searchParams.delete(NameSpaceSearchParams.FILTER_TYPE_CAMERA);

                if (typeSearchParams.includes(type)) {
                  const newTypeSearchParams = typeSearchParams.filter((parameter) => parameter !== type);
                  newTypeSearchParams.forEach((perameter) => searchParams.append(NameSpaceSearchParams.FILTER_TYPE_CAMERA, perameter));
                } else {
                  typeSearchParams.push(type);
                  typeSearchParams.forEach((perameter) => searchParams.append(NameSpaceSearchParams.FILTER_TYPE_CAMERA, perameter));
                }
                setSearchParams(searchParams);
              }}
            />
            <span className="custom-checkbox__icon" ></span>
            <span className="custom-checkbox__label" >{type}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
