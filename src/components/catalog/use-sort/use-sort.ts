import { SetURLSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TypeSort, DirectionSort, NameSpaceSearchParams } from '../../../const';
import { ProductCard } from '../../../type/type';

type UseSortReturn = [
  (typeSort: TypeSort) => void,
  (directionSort: DirectionSort) => void,
  (productList: ProductCard[]) => ProductCard[]
]

export function useSort(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams): UseSortReturn {
  const typeSortSearchParams = searchParams.get(NameSpaceSearchParams.TYPE_SORT);
  const directionSortSearchParams = searchParams.get(NameSpaceSearchParams.DIRECTION_SORT);

  const setActiveTypeSort = (typeSort: TypeSort) => {
    searchParams.set(NameSpaceSearchParams.TYPE_SORT, typeSort);
    setSearchParams(searchParams);
  };

  const setActiveDirectionSort = (directionSort: DirectionSort) => {
    searchParams.set(NameSpaceSearchParams.DIRECTION_SORT, directionSort);
    setSearchParams(searchParams);
  };

  const setSearchParamsTypeSortDefault = (): void => {
    const valuesTypeSort = Object.values(TypeSort);
    if (!typeSortSearchParams || !valuesTypeSort.includes(typeSortSearchParams as TypeSort)) {
      setActiveTypeSort(TypeSort.PRICE);
    }
  };

  const setSearchParamsDirectionSortDefault = (): void => {
    const valuesDirectionSort = Object.values(DirectionSort);
    if (!directionSortSearchParams || !valuesDirectionSort.includes(directionSortSearchParams as DirectionSort)) {
      setActiveDirectionSort(DirectionSort.UP);
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
    setSearchParamsTypeSortDefault();
    setSearchParamsDirectionSortDefault();
  }, []);

  return [setActiveTypeSort, setActiveDirectionSort, sortListProduct];
}
