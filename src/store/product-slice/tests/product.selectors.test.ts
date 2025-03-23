import { NameSpaceState } from '../../../const';
import { CategoryProduct, LevelProduct, TypeProduct, ResultPlacingOrder } from '../../../type/type';
import {
  getResultPlacingOrder,
  getStateCamera,
  getStateCameraList,
  getStateLoadingCamera,
  getStateLoadingCameraList,
  getStateLoadingPostOrder,
  getStateLoadingPromoList,
  getStatePromoList
} from '../product-selectors';

describe(
  'Product selectors', () => {
    const listCameras = [{
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
    }];

    const listPromo = [{
      id: 1,
      name: 'camera-1',
      previewImg: '/img/1',
      previewImg2x: '/img/1',
      previewImgWebp: '/img/1',
      previewImgWebp2x: '/img/1'
    }];

    const state = {
      [NameSpaceState.PRODUCT]: {
        cameraList: listCameras,
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        promoList: listPromo,
        camera: {
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
        }
      }
    };

    it('should return camera list from state', () => {
      const { cameraList } = state[NameSpaceState.PRODUCT];
      const result = getStateCameraList(state);
      expect(result).toEqual(cameraList);
    });

    it('should return loading camera list from state', () => {
      const { loadingCameraList } = state[NameSpaceState.PRODUCT];
      const result = getStateLoadingCameraList(state);
      expect(result).toBe(loadingCameraList);
    });

    it('should return camera from state', () => {
      const { camera } = state[NameSpaceState.PRODUCT];
      const result = getStateCamera(state);
      expect(result).toEqual(camera);
    });

    it('should return loading camera from state', () => {
      const { loadingCamera } = state[NameSpaceState.PRODUCT];
      const result = getStateLoadingCamera(state);
      expect(result).toBe(loadingCamera);
    });

    it('should return promo list from state', () => {
      const { promoList } = state[NameSpaceState.PRODUCT];
      const result = getStatePromoList(state);
      expect(result).toEqual(promoList);
    });

    it('should return loading promo list from state', () => {
      const { loadingPromoList } = state[NameSpaceState.PRODUCT];
      const result = getStateLoadingPromoList(state);
      expect(result).toBe(loadingPromoList);
    });

    it('should return loading post order from state', () => {
      const { loadingPostOrder } = state[NameSpaceState.PRODUCT];
      const result = getStateLoadingPostOrder(state);
      expect(result).toBe(loadingPostOrder);
    });

    it('should return result plasing order from state', () => {
      const { resultPlacingOrder } = state[NameSpaceState.PRODUCT];
      const result = getResultPlacingOrder(state);
      expect(result).toBe(resultPlacingOrder);
    });
  }
);
