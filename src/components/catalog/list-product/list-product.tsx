import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils';
import CardProduct from './card-product/card-product';
import { getCameraList } from '../../../store/product-slice/api-product';
import { getStateCameraList } from '../../../store/product-slice/product-selectors';
import { ProductCard } from '../../../type/type';

type PropsListProduct = {
  setActiveCamera: React.Dispatch<React.SetStateAction<ProductCard | null>>;
  searchParams: URLSearchParams;
  setSearchParamsModalWindow: (cameraId: number | null) => void;
}

export default function ListProduct({setActiveCamera, searchParams, setSearchParamsModalWindow}: PropsListProduct): JSX.Element {
  const dispatch = useAppDispatch();
  const cameraList = useAppSelector(getStateCameraList);

  useEffect(() => {
    if(cameraList.length !== 0){
      return;
    }
    dispatch(getCameraList());
  }, [dispatch, cameraList]);

  useEffect(() => {
    if(searchParams.has('camera')){
      if(cameraList.length !== 0){
        const cameraId = Number(searchParams.get('camera'));
        const activeCamera = cameraList.find((camera) => camera.id === cameraId);
        if(activeCamera) {
          setActiveCamera(activeCamera);
        } else {
          setActiveCamera(null);
        }
      }
    }
  }, [cameraList, searchParams, setActiveCamera]);

  return (
    <div className="cards catalog__cards">
      {cameraList.map((camera) => <CardProduct key={`camera-key-${camera.id}`} setSearchParamsModalWindow={setSearchParamsModalWindow} camera={camera} />)}
    </div>
  );
}
