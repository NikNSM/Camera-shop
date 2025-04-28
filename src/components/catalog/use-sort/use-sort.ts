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

  const setSearchParamsSortDefault = (name: NameSpaceSearchParams, value: string | null, referenceSort: string[], defaultValue: string): void => {
    if (!value || !referenceSort.includes(value)) {
      setActiveSort(name, defaultValue);
    }
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
    setSearchParamsSortDefault(NameSpaceSearchParams.TYPE_SORT, typeSortSearchParams, referenceSortType, TypeSort.PRICE);
    setSearchParamsSortDefault(NameSpaceSearchParams.DIRECTION_SORT, directionSortSearchParams, referenceSortDirection, DirectionSort.UP);
  }, []);

  return [setActiveSort, sortListProduct];
}
