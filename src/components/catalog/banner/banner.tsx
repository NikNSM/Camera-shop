import { useAppSelector } from '../../../utils';
import { getStateLoadingPromoList, getStatePromoList } from '../../../store/product-slice/product-selectors';
import { Link } from 'react-router-dom';
import { AddresesRoute, NameSpaceSearchParams, NameTabs, NameTitleLoader } from '../../../const';
import LoaderGetData from '../../loader/loader-get-data/loader-get-data';

export default function Banner(): JSX.Element {
  const promoList = useAppSelector(getStatePromoList);
  const loadingPromoList = useAppSelector(getStateLoadingPromoList);

  return (
    promoList.length === 0 || loadingPromoList ? <LoaderGetData title={NameTitleLoader.BANNER} /> :
      <div className="banner">
        <picture data-testid="banner-img">
          <source type="image/webp" srcSet={`${promoList[0].previewImgWebp}, ${promoList[0].previewImgWebp2x}`} /><img src={promoList[0].previewImg} srcSet={promoList[0].previewImg2x} alt="баннер" />
        </picture>
        <p className="banner__info" data-testid="banner-description">
          <span className="banner__message">Новинка!</span>
          <span className="title title--h1">{promoList[0].name}</span>
          <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
          <Link className="btn" to={`${AddresesRoute.CAMERA}${promoList[0].id}?${NameSpaceSearchParams.TAB_PAGE_CAMERA}=${NameTabs.CHARACTERISTIC}`}>Подробнее</Link>
        </p>
      </div>
  );
}
