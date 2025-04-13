export enum AddresesRoute {
  CATALOG = '/',
  CAMERA = '/camera/',
  PAGE_404 = '/*',
}

export enum NameTabs {
  CHARACTERISTIC = 'characteristic',
  DESCRIPTION = 'description',
}

export enum ApiRoute {
  CAMERAS_LIST = '/cameras',
  PROMO = '/promo',
  ORDERS = '/orders',
  REVIEWS = '/reviews',
}

export enum NameSpaceState {
  PRODUCT = 'product',
  REVIEWS = 'reviews',
}

export enum DateFormate {
  DATE_REVIEWS = 'DD MMMM',
  DATE_REVIEWS_DATE_TIME = 'YYYY-MM-DD',
}

export enum NameTitleLoader {
  BANNER = 'Загрузка эксклюзивного предложения',
  CAMERA_LIST = 'Загрузка имеющихся камер',
  CAMERA = 'Загрузка информации о камере',
  REVIEWS = 'Загрузка отзывов',
}

export enum NameSpaceSearchParams {
  MODAL_WINDOW = 'camera',
  TYPE_SORT = 'type-sort',
  DIRECTION_SORT = 'direction-sort',
  FILTER_CATEGORY = 'category',
  FILTER_LEVEL = 'level',
  FILTER_TYPE_CAMERA = 'type-camera',
  FILTER_MIN_PRICE = 'min-price',
  FILTER_MAX_PRICE = 'max-price',
}

export enum TypeSort {
  PRICE = 'price',
  POPULARITY = 'popularity',
}

export enum DirectionSort {
  UP = 'up',
  DOWN = 'down',
}
