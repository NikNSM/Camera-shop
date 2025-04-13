import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils';
import CardProduct from './card-product/card-product';
import { getCameraList } from '../../../store/product-slice/api-product';
import { getStateCameraList } from '../../../store/product-slice/product-selectors';
import { ProductCard } from '../../../type/type';
import { DirectionSort, NameSpaceSearchParams, TypeSort } from '../../../const';

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

  const sortListProduct = () => {
    if (typeActiveSort === TypeSort.PRICE) {
      return [...cameraList].sort((a, b) => {
        if (directionSort === DirectionSort.UP) {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
    }
    return [...cameraList].sort((a, b) => {
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
      {sortListProduct().map((camera) => <CardProduct key={`camera-key-${camera.id}`} setSearchParamsModalWindow={setSearchParamsModalWindow} camera={camera} />)}
    </div>
  );
}
