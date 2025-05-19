import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils';
import CardProduct from './card-product/card-product';
import { getCameraList } from '../../../store/product-slice/api-product';
import { getStateCameraList } from '../../../store/product-slice/product-selectors';
import { ProductCard } from '../../../type/type';
// import { NameSpaceModalWindowProduct, NameSpaceSearchParams } from '../../../const';
import { SetInformationModalWindow } from '../catalog';

type PropsListProduct = {
  setActiveCamera: SetInformationModalWindow;
  searchParams: URLSearchParams;
  filtersCameraList: (productList: ProductCard[]) => ProductCard[];
  sortListProduct: (productList: ProductCard[]) => ProductCard[];
}

export default function ListProduct({ setActiveCamera, searchParams, filtersCameraList, sortListProduct }: PropsListProduct): JSX.Element {
  const dispatch = useAppDispatch();
  const cameraList = useAppSelector(getStateCameraList);
  const [filtersCameras, setFiltersCameras] = useState<ProductCard[]>([]);

  useEffect(() => {
    if (cameraList.length !== 0) {
      setFiltersCameras(filtersCameraList(cameraList));
      return;
    }
    dispatch(getCameraList());
  }, [dispatch, cameraList, searchParams, filtersCameraList]);

  // useEffect(() => {
  //   if (searchParams.has(NameSpaceSearchParams.MODAL_WINDOW)) {
  //     if (cameraList.length !== 0) {
  //       const cameraId = Number(searchParams.get(NameSpaceSearchParams.MODAL_WINDOW));
  //       const activeCamera = cameraList.find((camera) => camera.id === cameraId);
  //       if (activeCamera) {
  //         setActiveCamera(NameSpaceModalWindowProduct.ADD, activeCamera);
  //       } else {
  //         setActiveCamera(NameSpaceModalWindowProduct.UNKNOW);
  //       }
  //     }
  //   }
  // }, [cameraList, searchParams, setActiveCamera]);

  return (
    <div className="cards catalog__cards">
      {sortListProduct(filtersCameras).map((camera) => <CardProduct key={`camera-key-${camera.id}`} setActiveCamera={setActiveCamera} camera={camera} />)}
    </div>
  );
}
