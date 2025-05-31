import { useAppSelector } from '../../../utils';
import CardProduct from './card-product/card-product';
import { getStateCameraList } from '../../../store/product-slice/product-selectors';
import { ProductCard, } from '../../../type/type';

type PropsListProduct = {
  filtersCameraList: (productList: ProductCard[]) => ProductCard[];
  sortListProduct: (productList: ProductCard[]) => ProductCard[];
}

export default function ListProduct({ filtersCameraList, sortListProduct }: PropsListProduct): JSX.Element {
  const cameraList = useAppSelector(getStateCameraList);

  return (
    <div className="cards catalog__cards">
      {sortListProduct(filtersCameraList(cameraList)).map((camera) => <CardProduct key={`camera-key-${camera.id}`} camera={camera} />)}
    </div>
  );
}
