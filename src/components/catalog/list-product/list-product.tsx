import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils';
import CardProduct from './card-product/card-product';
import { getCameraList } from '../../../store/product-slice/api-product';
import { getStateCameraList, getStateLoadingCameraList } from '../../../store/product-slice/product-selectors';
import { ProductCard } from '../../../type/type';

type PropsListProduct = {
  setActiveCamera: React.Dispatch<React.SetStateAction<ProductCard | null>>;
}
export default function ListProduct({setActiveCamera}: PropsListProduct): JSX.Element {
  const dispatch = useAppDispatch();
  const loadingCameraList = useAppSelector(getStateLoadingCameraList);
  const cameraList = useAppSelector(getStateCameraList);

  useEffect(() => {
    dispatch(getCameraList());
  }, [dispatch]);

  return (
    <div className="cards catalog__cards">
      {loadingCameraList ? 'Загрузка имеющихся камер...' : cameraList.map((camera) => <CardProduct key={`camera-key-${camera.id}`} setActiveCamera={setActiveCamera} camera={camera} />)}
    </div>
  );
}
