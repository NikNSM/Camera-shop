import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../mocks/mock-component';
import Banner from './banner';
import { NameSpaceState } from '../../../const';
import { TypeState } from '../../../type/type-redux';
import { ResultPlacingOrder } from '../../../type/type';
import { camera } from '../../../mocks/mocks';

describe('Component: Banner', () => {

  beforeEach(() => {
    vi.mock('../../loader/loader-get-data/loader-get-data', () => ({ default: () => (<p>Loading</p>) }));
  });

  it('should render correct with promList length to "0"', () => {
    const expetedText = 'Loading';
    const expetedNotText = 'Подробнее';
    const mockInitialState: Omit<TypeState, NameSpaceState.REVIEWS> = {
      [NameSpaceState.PRODUCT]: {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [],
        camera: null
      }
    };
    const componentHistory = withHistory(<Banner />);
    const { withStoreComponent } = withStore(componentHistory, mockInitialState);
    render(withStoreComponent);

    expect(screen.getByText(expetedText)).toBeInTheDocument();
    expect(screen.queryByText(expetedNotText)).not.toBeInTheDocument();
  });

  it('should render correct with loadingPromoList to "true"', () => {
    const expetedText = 'Loading';
    const expetedNotText = 'Подробнее';
    const mockInitialState: Omit<TypeState, NameSpaceState.REVIEWS> = {
      [NameSpaceState.PRODUCT]: {
        loadingCameraList: false,
        loadingPromoList: true,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [camera],
        camera: null
      }
    };
    const componentHistory = withHistory(<Banner />);
    const { withStoreComponent } = withStore(componentHistory, mockInitialState);
    render(withStoreComponent);

    expect(screen.getByText(expetedText)).toBeInTheDocument();
    expect(screen.queryByText(expetedNotText)).not.toBeInTheDocument();
  });

  it('should render correct with promoList to array data', () => {
    const expetedText = 'Подробнее';
    const expetedNotText = 'Loading';
    const expectedAltImg = 'баннер';
    const mockInitialState: Omit<TypeState, NameSpaceState.REVIEWS> = {
      [NameSpaceState.PRODUCT]: {
        loadingCameraList: false,
        loadingPromoList: false,
        loadingPostOrder: false,
        loadingCamera: false,
        resultPlacingOrder: ResultPlacingOrder.UNKNOW,
        cameraList: [],
        promoList: [camera],
        camera: null
      }
    };
    const expetedNameCamera = mockInitialState.product.promoList[0].name;

    const componentHistory = withHistory(<Banner />);
    const { withStoreComponent } = withStore(componentHistory, mockInitialState);
    render(withStoreComponent);

    expect(screen.getByText(expetedText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltImg)).toBeInTheDocument();
    expect(screen.getByText(expetedNameCamera)).toBeInTheDocument();
    expect(screen.queryByText(expetedNotText)).not.toBeInTheDocument();
  });

});
