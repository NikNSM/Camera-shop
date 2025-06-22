import { useAppSelector } from '../../../utils';
import { getStateLoadingPromoList, getStatePromoList } from '../../../store/product-slice/product-selectors';
import { Link } from 'react-router-dom';
import { AddresesRoute, NameSpaceSearchParams, NameTabs, NameTitleLoader } from '../../../const';
import LoaderGetData from '../../loader/loader-get-data/loader-get-data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css';
import './bullet-css/bullet.css';

export default function Banner() {
  const promoList = useAppSelector(getStatePromoList);
  const loadingPromoList = useAppSelector(getStateLoadingPromoList);
  return (
    promoList.length === 0 || loadingPromoList ? <LoaderGetData title={NameTitleLoader.BANNER} /> :
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000
        }}
        pagination={{
          clickable: true,
          bulletClass: 'pagination-bullet',
          bulletActiveClass: 'pagination-bullet-active'
        }}
      >
        {promoList.map((promo) => (
          <SwiperSlide key={promo.id}>
            <div className="banner" >
              <picture data-testid="banner-img">
                <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x}`} />
                <img src={promo.previewImg} srcSet={promo.previewImg2x} alt="баннер" />
              </picture>
              <p className="banner__info" data-testid="banner-description">
                <span className="banner__message">Новинка!</span>
                <span className="title title--h1">{promo.name}</span>
                <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
                <Link className="btn" to={`${AddresesRoute.CAMERA}${promo.id}?${NameSpaceSearchParams.TAB_PAGE_CAMERA}=${NameTabs.CHARACTERISTIC}`}>
                  Подробнее
                </Link>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  );
}
