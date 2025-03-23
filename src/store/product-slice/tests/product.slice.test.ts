import { camera, promo } from '../../../mocks/mocks';
import { ResultPlacingOrder } from '../../../type/type';
import { getCamera, getCameraList, getPromoList, postOrder } from '../api-product';
import { clearCamera, productReducer, setPlacingOrderUnknow } from '../product-slice';

describe(
  'Product slice', () => {
    it('should return initial state with empty action', () => {
      const expectedState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [camera],
        promoList: [promo],
        camera
      };

      const emptyAction = {
        type: ''
      };

      const result = productReducer(expectedState, emptyAction);
      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty ection', () => {
      const emptyAction = {
        type: ''
      };

      const initialState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null
      };

      const result = productReducer(undefined, emptyAction);
      expect(result).toEqual(initialState);
    });

    it('should set result placing order to "unknow" with action "setPlacingOrderUnknow"', () => {
      const initialState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.SUCCESSFULY,
        cameraList: [],
        promoList: [],
        camera: null
      };

      const result = productReducer(initialState, setPlacingOrderUnknow);
      expect(result.resultPlacingOrder).toBe(ResultPlacingOrder.UNKNOW);
    });

    it('should set camera to "null" with action "clearCamera"', () => {
      const initialState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera
      };

      const expectedState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const result = productReducer(initialState, clearCamera);
      expect(result).toEqual(expectedState);
    });

    it('should set loading camera list to "true" witch action "getCameraList.pending"', () => {
      const expectedLoadingCameraList = true;

      const result = productReducer(undefined, getCameraList.pending);
      expect(result.loadingCameraList).toBe(expectedLoadingCameraList);
    });

    it('should set loading camera list to "false", set camera list array cameras with action "getCameraList.fulfilled"', () => {
      const expectedState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [camera],
        promoList: [],
        camera: null,
      };

      const initialState = {
        loadingCameraList: true,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const result = productReducer(initialState, getCameraList.fulfilled([camera], '', undefined));
      expect(result).toEqual(expectedState);
    }
    );

    it('should set loading promo list to "true" with action "getPromoList.pending"', () => {
      const expectedLoadingPromoList = true;

      const result = productReducer(undefined, getPromoList.pending);
      expect(result.loadingPromoList).toBe(expectedLoadingPromoList);
    });

    it('should set loading promo list to "false", set promo list array cameras with action "getPromoList.fulfilled"', () => {
      const expectedState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [promo],
        camera: null,
      };

      const initialState = {
        loadingCameraList: false,
        loadingPromoList: true,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const result = productReducer(initialState, getPromoList.fulfilled([promo], '', undefined));
      expect(result).toEqual(expectedState);
    });

    it('should set loading camera to "true" with action "getCamera.pending"', () => {
      const expectedLoadingCamera = true;

      const result = productReducer(undefined, getCamera.pending);
      expect(result.loadingCamera).toBe(expectedLoadingCamera);
    });

    it('should set loading camera to "false", set camera object camera with action "getCamera.fulfilled"', () => {
      const expectedState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera,
      };

      const initialState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: true,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const result = productReducer(initialState, getCamera.fulfilled(camera, '', ''));
      expect(result).toEqual(expectedState);
    });

    it('should set loading post order to "true" with action "postOrder.pending"', () => {
      const expectedLoadingPostOrder = true;

      const result = productReducer(undefined, postOrder.pending);
      expect(result.loadingPostOrder).toBe(expectedLoadingPostOrder);
    });

    it('should set loading post order to "false", set result placing order to "successfuly" with action "postOrder.fulfilled"', () => {
      const expectedState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.SUCCESSFULY,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const initialState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: true,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const result = productReducer(initialState, postOrder.fulfilled);
      expect(result).toEqual(expectedState);
    });

    it('should set loading post order to "false", set result placing order to "error" with action "postOrder.rejected"', () => {
      const expectedState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.ERROR,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const initialState = {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: true,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null,
      };

      const result = productReducer(initialState, postOrder.rejected);
      expect(result).toEqual(expectedState);
    });
  }
);

