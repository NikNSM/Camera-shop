import { ProductCard } from '../../../type/type';
import { getConversionTypeCamera } from '../../../utils';

type PropsInformationCamera = {
  camera: ProductCard;
}

export default function InformationCamera({ camera }: PropsInformationCamera): JSX.Element {
  const price = new Intl.NumberFormat('ru-RU').format(camera.price);
  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`../${camera.previewImgWebp}, ../${camera.previewImgWebp2x}`} />
          <img src={`../${camera.previewImg}`} srcSet={`../${camera.previewImg2x}`} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{`${camera.category} "${camera.name}"`}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{`${getConversionTypeCamera(camera.type, camera.category)} ${camera.category}`}</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      </div>
    </div>
  );
}
