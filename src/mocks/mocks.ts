import { TypeProduct, CategoryProduct, LevelProduct } from '../type/type';


export const camera = {
  id: 1,
  name: 'camera-1',
  vendorCode: '123421',
  type: TypeProduct.COLLECTION,
  category: CategoryProduct.FOTO,
  description: 'Как то так',
  level: LevelProduct.AMATEUR,
  price: 123000,
  rating: 4,
  reviewCount: 12,
  previewImg: '/img/1',
  previewImg2x: '/img/1',
  previewImgWebp: '/img/1',
  previewImgWebp2x: '/img/1'
};

export const promo = {
  id: 1,
  name: 'camera-1',
  previewImg: '/img/1',
  previewImg2x: '/img/1',
  previewImgWebp: '/img/1',
  previewImgWebp2x: '/img/1'
};

export const review = {
  id: '12343dd',
  createAt: '22.02.2020',
  cameraId: 1,
  userName: 'Q1q1',
  advantage: 'Достоинства',
  disadvantage: 'Недостатки',
  review: 'Как то так',
  rating: 2,
};

