import { SetURLSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TypeSort, DirectionSort, NameSpaceSearchParams } from '../../../const';
import { ProductCard } from '../../../type/type';

type UseSortReturn = [
  (name: NameSpaceSearchParams, value: string) => void,
  (productList: ProductCard[]) => ProductCard[]
]

export function useSort(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams): UseSortReturn {
  const typeSortSearchParams = searchParams.get(NameSpaceSearchParams.TYPE_SORT);
  const directionSortSearchParams = searchParams.get(NameSpaceSearchParams.DIRECTION_SORT);
  const referenceSortDirection = Object.values(DirectionSort);
  const referenceSortType = Object.values(TypeSort);

  const setActiveSort = (name: NameSpaceSearchParams, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const setSearchParamsSortDefault = (name: NameSpaceSearchParams, referenceSort: string[],defaultValue: string): void => {
    const sortValues = searchParams.getAll(name);
    const newSorts: string[] = [];
    sortValues.forEach((value) => {
      if (referenceSort.includes(value)) {
        newSorts.push(value);
      }
    });
    searchParams.delete(name);
    if (newSorts.length > 0) {
      searchParams.set(name, newSorts[0]);
      setSearchParams(searchParams);
      return;
    }
    setActiveSort(name, defaultValue);
  };

  const sortListProduct = (productList: ProductCard[]) => {
    if (typeSortSearchParams === TypeSort.PRICE) {
      return [...productList].sort((a, b) => {
        if (directionSortSearchParams === DirectionSort.UP) {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
    }
    return [...productList].sort((a, b) => {
      if (directionSortSearchParams === DirectionSort.UP) {
        return a.reviewCount - b.reviewCount;
      }
      return b.reviewCount - a.reviewCount;
    });
  };

  useEffect(() => {
    setSearchParamsSortDefault(NameSpaceSearchParams.DIRECTION_SORT, referenceSortDirection, DirectionSort.UP);
    setSearchParamsSortDefault(NameSpaceSearchParams.TYPE_SORT, referenceSortType, TypeSort.PRICE);
  }, []);

  return [setActiveSort, sortListProduct];
}
