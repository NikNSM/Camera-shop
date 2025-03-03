import { useAppSelector, useAppDispatch } from '../../../utils';
import { getStatePromoList } from '../../../store/product-slice/product-selectors';
import { useEffect } from 'react';
import { getPromoList } from '../../../store/product-slice/api-product';

export default function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoList = useAppSelector(getStatePromoList);

  useEffect(() => {
    dispatch(getPromoList());
  }, [dispatch]);

  return (
    promoList.length === 0 ? <p> Загрузка</p> :
      <div className="banner">
        <picture>
          <source type="image/webp" srcSet={`${promoList[0].previewImgWebp}, ${promoList[0].previewImgWebp2x}`} /><img src={promoList[0].previewImg} srcSet={promoList[0].previewImg2x} alt="баннер" />
        </picture>
        <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{promoList[0].name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><a className="btn" href="#">Подробнее</a></p>
      </div>
  );
}
