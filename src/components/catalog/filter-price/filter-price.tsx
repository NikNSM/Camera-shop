import { SetURLSearchParams } from 'react-router-dom';
import { NameSpaceSearchParams } from '../../../const';
import { useEffect, useState } from 'react';

type PropsFilterPrice = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  minPrice: number;
  maxPrice: number;
}

export default function FilterPrice({ searchParams, setSearchParams, minPrice, maxPrice }: PropsFilterPrice): JSX.Element {
  const [valueMinPrice, setValueMinPrice] = useState<string>(searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE) !== null ?
    searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE) as string :
    '');

  const [valueMaxPrice, setValueMaxPrice] = useState<string>(searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE) !== null ?
    searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE) as string :
    '');

  useEffect(() => {
    setValueMaxPrice(searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE) !== null ?
      searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE) as string : '');
    setValueMinPrice(searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE) !== null ?
      searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE) as string : '');
  }, [searchParams]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={`${minPrice}`}
              onInput={(evt) => {
                evt.preventDefault();
                setValueMinPrice(evt.currentTarget.value);
              }}
              onBlur={() => {
                if (valueMinPrice.length === 0) {
                  searchParams.delete(NameSpaceSearchParams.FILTER_MIN_PRICE);
                  setSearchParams(searchParams);
                  return;
                }
                let newValueMinPrice = Number(valueMinPrice) > minPrice ? Number(valueMinPrice) : minPrice;
                newValueMinPrice = newValueMinPrice < maxPrice ? newValueMinPrice : maxPrice;

                if (valueMaxPrice.length !== 0 && Number(valueMinPrice) > Number(valueMaxPrice)) {
                  searchParams.set(NameSpaceSearchParams.FILTER_MAX_PRICE, newValueMinPrice.toString());
                }
                searchParams.set(NameSpaceSearchParams.FILTER_MIN_PRICE, newValueMinPrice.toString());
                setSearchParams(searchParams);
              }}
              value={valueMinPrice}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`${maxPrice}`}
              onInput={(evt) => {
                evt.preventDefault();
                setValueMaxPrice(evt.currentTarget.value);
              }}
              onBlur={() => {
                if (valueMaxPrice.length === 0) {
                  searchParams.delete(NameSpaceSearchParams.FILTER_MAX_PRICE);
                  setSearchParams(searchParams);
                  return;
                }
                let newValueMaxPrice = Number(valueMaxPrice) > minPrice ? Number(valueMaxPrice) : minPrice;
                newValueMaxPrice = newValueMaxPrice < maxPrice ? newValueMaxPrice : maxPrice;

                if (valueMaxPrice.length !== 0 && Number(valueMaxPrice) < Number(valueMinPrice)) {
                  searchParams.set(NameSpaceSearchParams.FILTER_MIN_PRICE, newValueMaxPrice.toString());
                }
                searchParams.set(NameSpaceSearchParams.FILTER_MAX_PRICE, newValueMaxPrice.toString());
                setSearchParams(searchParams);
              }}
              value={valueMaxPrice}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
