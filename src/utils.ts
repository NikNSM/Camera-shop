import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { DateFormate, NameSpaceModalWindowProduct } from './const';
import { CategoryProduct, DataBasket, LocalStorageCameraShop, PayloadActiveModalWindow, ProductCard, TypeProduct } from './type/type';
import { TypeAppDispatch, TypeState } from './type/type-redux';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<TypeAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TypeState> = useSelector;

export const getConversionTypeCamera = (type: TypeProduct, category: CategoryProduct): TypeProduct | string => {
  if (category === CategoryProduct.VIDEO) {
    return type;
  }

  switch (type) {
    case TypeProduct.COLLECTION:
      return 'Коллекционный';
    case TypeProduct.DIGITAL:
      return 'Цифровой';
    case TypeProduct.FILM:
      return 'Пленочный';
    case TypeProduct.INSTANTLY:
      return 'Моментальный';
  }
};

export const getDateFormate = (date: string, dateFormate: DateFormate) =>
  dayjs(date).locale('ru').format(dateFormate);

export const getDataBasket:
  (cameraId: number, quantity?: number) => DataBasket =
  (cameraId, count = 1) => ({
    cameraId,
    quantity: count,
  });

export const getDataLocalStorage = (cameras: DataBasket[], coupon: string | null, percentDiscountCoupon: number | null): LocalStorageCameraShop => ({
  cameras,
  coupon,
  percentDiscountCoupon
});

export const getCurrenceRub = (meaning: number): string => new Intl.NumberFormat('ru-RU').format(meaning);

export const getPayloadActiveModalWindow: (name: NameSpaceModalWindowProduct, camera?: null | ProductCard) => PayloadActiveModalWindow = (name, camera = null) => ({
  name,
  camera
});
