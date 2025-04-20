import { SetURLSearchParams } from 'react-router-dom';
import { NameSpaceSearchParams } from '../../../const';
import { CategoryProduct, TypeProduct } from '../../../type/type';
import { useEffect } from 'react';

type PropsFilterType = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export default function FilterType({ searchParams, setSearchParams }: PropsFilterType): JSX.Element {
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
              type="checkbox"
              name={getNameFilterType(type)}
              checked={searchParams.getAll(NameSpaceSearchParams.FILTER_TYPE_CAMERA).includes(type)}
              disabled={isDisabled(type)}
              data-type={type}
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
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{type}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
