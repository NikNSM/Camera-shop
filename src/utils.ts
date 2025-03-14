import { CategoryProduct, TypeProduct } from './type/type';
import { TypeAppDispatch, TypeState } from './type/type-redux';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<TypeAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TypeState> = useSelector;

export const getConversionTypeCamera = (type: TypeProduct, category: CategoryProduct): TypeProduct | string => {
  if (category === CategoryProduct.VIDEO) {
    return type;
  }

  switch(type) {
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
