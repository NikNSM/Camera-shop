import { SetURLSearchParams } from 'react-router-dom';
import { ProductCard } from '../../../type/type';
import { useState } from 'react';
import { NameSpaceSearchParams } from '../../../const';

export function useFilters (searchParams: URLSearchParams, setSearchParams: SetURLSearchParams): [number, number, (productList: ProductCard[]) => ProductCard[], () => void]{
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const levelFilters = searchParams.getAll(NameSpaceSearchParams.FILTER_LEVEL);
  const typeFilters = searchParams.getAll(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
  const minPriceFilter = searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE);
  const maxPriceFilter = searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE);

  const filterCameraList = (productList: ProductCard[]) => {
    let cameraListFilters = searchParams.has(NameSpaceSearchParams.FILTER_CATEGORY) ?
      productList.filter((product) => product.category === searchParams.get(NameSpaceSearchParams.FILTER_CATEGORY)) :
      productList;

    cameraListFilters = levelFilters.length === 0 ?
      cameraListFilters :
      levelFilters.reduce((acc: ProductCard[], parameter) => acc.concat(cameraListFilters.filter((product) => product.level === parameter)), []);

    cameraListFilters = typeFilters.length === 0 ?
      cameraListFilters :
      typeFilters.reduce((acc: ProductCard[], parameter) => acc.concat(cameraListFilters.filter((product) => product.type === parameter)), []);

    const priceArray = cameraListFilters.map((camera) => camera.price);
    if(priceArray.length === 0){
      setMinPrice(0);
      setMaxPrice(0);
    } else{
      setMinPrice(Math.min(...priceArray));
      setMaxPrice(Math.max(...priceArray));
    }

    cameraListFilters = minPriceFilter ?
      cameraListFilters.filter((camera) => camera.price >= Number(minPriceFilter)) :
      cameraListFilters;

    cameraListFilters = maxPriceFilter ?
      cameraListFilters.filter((camera) => camera.price <= Number(maxPriceFilter)) :
      cameraListFilters;

    return cameraListFilters;
  };

  const resetFilters = () => {
    searchParams.delete(NameSpaceSearchParams.FILTER_CATEGORY);
    searchParams.delete(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
    searchParams.delete(NameSpaceSearchParams.FILTER_LEVEL);
    searchParams.delete(NameSpaceSearchParams.FILTER_MIN_PRICE);
    searchParams.delete(NameSpaceSearchParams.FILTER_MAX_PRICE);
    setSearchParams(searchParams);
  };

  return [minPrice, maxPrice, filterCameraList, resetFilters];
}
