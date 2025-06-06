import { NameSpaceModalWindowProduct } from '../const';

export enum TypeProduct {
  COLLECTION = 'Коллекционная',
  INSTANTLY = 'Моментальная',
  DIGITAL = 'Цифровая',
  FILM = 'Плёночная',
}

export enum CategoryProduct {
  VIDEO = 'Видеокамера',
  FOTO = 'Фотоаппарат',
}

export enum LevelProduct {
  ZERO = 'Нулевой',
  AMATEUR = 'Любительский',
  PROFESSIONAL = 'Профессиональный',
}

export type ProductCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: TypeProduct;
  category: CategoryProduct;
  description: string;
  level: LevelProduct;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type PromoProduct = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type Order = {
  camerasIds: number[];
  coupon: string | null;
}

export enum ResultPlacingOrder {
  UNKNOW = 'unknow',
  SUCCESSFULY = 'successfuly',
  ERROR = 'error',
}

export enum IsValidUserPhone {
  UNKNOW = 'unknow',
  ISVALID = 'is-valid',
  ISINVALID = 'is-invalid'
}

export type ReviewCard = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type DataBasket = {
  cameraId: number;
  quantity: number;
}

export type LocalStorageCameraShop = {
  cameras: DataBasket[];
  coupon: string | null;
  percentDiscountCoupon: null | number;
}

export type StateProductsBasket = ProductCard & {
  quantity: number;
};

export type ArgumentCoupon = {
  coupon: string;
}

export type PayloadActiveModalWindow = {
  name: NameSpaceModalWindowProduct;
  camera: null | ProductCard;
}
