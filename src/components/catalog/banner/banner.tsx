import { useAppSelector, useAppDispatch } from '../../../utils';
import { getStateLoadingPromoList, getStatePromoList } from '../../../store/product-slice/product-selectors';
import { useEffect } from 'react';
import { getPromoList } from '../../../store/product-slice/api-product';
import { Link } from 'react-router-dom';
import { AddresesRoute, NameTitleLoader } from '../../../const';
import LoaderGetData from '../../loader/loader-get-data/loader-get-data';

export default function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoList = useAppSelector(getStatePromoList);
  const loadingPromoList = useAppSelector(getStateLoadingPromoList);

  useEffect(() => {
    if(promoList.length !== 0) {
      return;
    }
    dispatch(getPromoList());
  }, [dispatch, promoList]);

  return (
    promoList.length === 0 || loadingPromoList ? <LoaderGetData title={NameTitleLoader.BANNER} /> :
      <div className="banner">
        <picture>
          <source type="image/webp" srcSet={`${promoList[0].previewImgWebp}, ${promoList[0].previewImgWebp2x}`} /><img src={promoList[0].previewImg} srcSet={promoList[0].previewImg2x} alt="баннер" />
        </picture>
        <p className="banner__info">
          <span className="banner__message">Новинка!</span>
          <span className="title title--h1">{promoList[0].name}</span>
          <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
          <Link className="btn" to={`${AddresesRoute.CAMERA}${promoList[0].id}`}>Подробнее</Link>
        </p>
      </div>
  );
}
