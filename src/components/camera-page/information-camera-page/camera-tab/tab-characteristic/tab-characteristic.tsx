import { NameTabs } from '../../../../../const';
import { ProductCard } from '../../../../../type/type';

type PropsCameraTabCharacteristic = {
  camera: ProductCard;
  assignClassTab: (nameTab: NameTabs) => string;
}

export default function TabCharacteristic({camera, assignClassTab}: PropsCameraTabCharacteristic): JSX.Element {
  return (
    <div className={`tabs__element ${assignClassTab(NameTabs.CHARACTERISTIC)}`}>
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
