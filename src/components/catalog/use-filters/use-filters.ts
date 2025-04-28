import { SetURLSearchParams } from 'react-router-dom';
import { CategoryProduct, LevelProduct, ProductCard, TypeProduct } from '../../../type/type';
import { useEffect, useState } from 'react';
import { NameSpaceSearchParams } from '../../../const';

export function useFilters(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams): [number, number, (productList: ProductCard[]) => ProductCard[], () => void] {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const levelFilters = searchParams.getAll(NameSpaceSearchParams.FILTER_LEVEL);
  const typeFilters = searchParams.getAll(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
  const minPriceFilter = searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE);
  const maxPriceFilter = searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE);

  const referenceLevel = Object.values(LevelProduct);
  const referenceType = Object.values(TypeProduct);
  const referenceCategory = Object.values(CategoryProduct);

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
    if (priceArray.length === 0) {
      setMinPrice(0);
      setMaxPrice(0);
    } else {
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

  const setSearchParamsDefault = (referenceFilter: string[], filters: string[], name: NameSpaceSearchParams) => {
    const newFilters: string[] = [];
    filters.forEach((value) => {
      if (referenceFilter.includes(value)) {
        newFilters.push(value);
      }
    });
    searchParams.delete(name);
    [...new Set(newFilters)].forEach((value) => {
      searchParams.append(name, value);
    });
    setSearchParams(searchParams);
  };

  const searchParamsCategoryDefault = () => {
    const categoryFilters = searchParams.getAll(NameSpaceSearchParams.FILTER_CATEGORY);
    const newFilters: string[] = [];
    categoryFilters.forEach((value) => {
      if (referenceCategory.includes(value as CategoryProduct)) {
        newFilters.push(value);
      }
    });
    searchParams.delete(NameSpaceSearchParams.FILTER_CATEGORY);
    if(newFilters.length > 0){
      searchParams.set(NameSpaceSearchParams.FILTER_CATEGORY, newFilters[0]);
      setSearchParams(searchParams);
    }
  };

  const searchParamsPriceDefault = (name: NameSpaceSearchParams) => {
    const minPriceFilters = searchParams.getAll(name);
    const newFilters: string[] = [];
    minPriceFilters.forEach((value) => {
      if (!isNaN(Number(value))) {
        newFilters.push(value);
      }
    });
    searchParams.delete(name);
    if(newFilters.length > 0){
      searchParams.set(name, newFilters[0]);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    setSearchParamsDefault(referenceLevel, levelFilters, NameSpaceSearchParams.FILTER_LEVEL);
    setSearchParamsDefault(referenceType, typeFilters, NameSpaceSearchParams.FILTER_TYPE_CAMERA);
    searchParamsPriceDefault(NameSpaceSearchParams.FILTER_MIN_PRICE);
    searchParamsPriceDefault(NameSpaceSearchParams.FILTER_MAX_PRICE);
    searchParamsCategoryDefault();
    const maxSearchPrice = Number(searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE));
    const minSearchPrice = Number(searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE));
    if(maxSearchPrice < minSearchPrice){
      searchParams.set(NameSpaceSearchParams.FILTER_MAX_PRICE, minSearchPrice.toString());
      searchParams.set(NameSpaceSearchParams.FILTER_MIN_PRICE, maxSearchPrice.toString());
      setSearchParams(searchParams);
    }
  }, []);

  return [minPrice, maxPrice, filterCameraList, resetFilters];
}
