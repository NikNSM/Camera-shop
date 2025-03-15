import { ProductCard } from '../../../../type/type';

type PropsCameraTabCharacteristic = {
  camera: ProductCard;
}

export default function CameraTabCharacteristic({camera}: PropsCameraTabCharacteristic): JSX.Element {
  return (
    <div className="tabs__element">
      <ul className="product__tabs-list">
        <li className="item-list"><span className="item-list__title">Артикул:</span>
          <p className="item-list__text">{camera.vendorCode}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Категория:</span>
          <p className="item-list__text">{camera.category}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Тип камеры:</span>
          <p className="item-list__text">{camera.type}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Уровень:</span>
          <p className="item-list__text">{camera.level}</p>
        </li>
      </ul>
    </div>
  );
}
