import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils';
import CardProduct from './card-product/card-product';
import { getCameraList } from '../../../store/product-slice/api-product';
import { getStateCameraList } from '../../../store/product-slice/product-selectors';
import { ProductCard } from '../../../type/type';
import { DirectionSort, NameSpaceSearchParams, TypeSort } from '../../../const';
import { setMaxPrice, setMinPrice } from '../../../store/product-slice/product-slice';

type PropsListProduct = {
  setActiveCamera: React.Dispatch<React.SetStateAction<ProductCard | null>>;
  searchParams: URLSearchParams;
  setSearchParamsModalWindow: (cameraId: number | null) => void;
}

export default function ListProduct({ setActiveCamera, searchParams, setSearchParamsModalWindow }: PropsListProduct): JSX.Element {
  const dispatch = useAppDispatch();
  const cameraList = useAppSelector(getStateCameraList);
  const typeActiveSort = searchParams.get(NameSpaceSearchParams.TYPE_SORT);
  const directionSort = searchParams.get(NameSpaceSearchParams.DIRECTION_SORT);

  const filterCameraList = (productList: ProductCard[]) => {
    let cameraListFilters = searchParams.has(NameSpaceSearchParams.FILTER_CATEGORY) ?
      productList.filter((product) => product.category === searchParams.get(NameSpaceSearchParams.FILTER_CATEGORY)) :
      productList;

    const levelFilters = searchParams.getAll(NameSpaceSearchParams.FILTER_LEVEL);
    const typeFilters = searchParams.getAll(NameSpaceSearchParams.FILTER_TYPE_CAMERA);
    const minPriceFilter = searchParams.get(NameSpaceSearchParams.FILTER_MIN_PRICE);
    const maxPriceFilter = searchParams.get(NameSpaceSearchParams.FILTER_MAX_PRICE);

    cameraListFilters = levelFilters.length === 0 ?
      cameraListFilters :
      levelFilters.reduce((acc: ProductCard[], parameter) => acc.concat(cameraListFilters.filter((product) => product.level === parameter)), []);

    cameraListFilters = typeFilters.length === 0 ?
      cameraListFilters :
      typeFilters.reduce((acc: ProductCard[], parameter) => acc.concat(cameraListFilters.filter((product) => product.type === parameter)), []);

    const priceArray = cameraListFilters.map((camera) => camera.price);
    if (priceArray.length === 0) {
      dispatch(setMinPrice(0));
      dispatch(setMaxPrice(0));
    } else {
      dispatch(setMinPrice(Math.min(...priceArray)));
      dispatch(setMaxPrice(Math.max(...priceArray)));
    }

    cameraListFilters = minPriceFilter ?
      cameraListFilters.filter((camera) => camera.price >= Number(minPriceFilter)) :
      cameraListFilters;

    cameraListFilters = maxPriceFilter ?
      cameraListFilters.filter((camera) => camera.price <= Number(maxPriceFilter)) :
      cameraListFilters;

    return cameraListFilters;
  };

  const sortListProduct = (productList: ProductCard[]) => {
    if (typeActiveSort === TypeSort.PRICE) {
      return [...productList].sort((a, b) => {
        if (directionSort === DirectionSort.UP) {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
    }
    return [...productList].sort((a, b) => {
      if (directionSort === DirectionSort.UP) {
        return a.reviewCount - b.reviewCount;
      }
      return b.reviewCount - a.reviewCount;
    });
  };

  useEffect(() => {
    if (cameraList.length !== 0) {
      return;
    }
    dispatch(getCameraList());
  }, [dispatch, cameraList]);

  useEffect(() => {
    if (searchParams.has(NameSpaceSearchParams.MODAL_WINDOW)) {
      if (cameraList.length !== 0) {
        const cameraId = Number(searchParams.get(NameSpaceSearchParams.MODAL_WINDOW));
        const activeCamera = cameraList.find((camera) => camera.id === cameraId);
        if (activeCamera) {
          setActiveCamera(activeCamera);
        } else {
          setActiveCamera(null);
        }
      }
    }
  }, [cameraList, searchParams, setActiveCamera]);

  return (
    <div className="cards catalog__cards">
      {sortListProduct(filterCameraList(cameraList)).map((camera) => <CardProduct key={`camera-key-${camera.id}`} setSearchParamsModalWindow={setSearchParamsModalWindow} camera={camera} />)}
    </div>
  );
}
