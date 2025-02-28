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
