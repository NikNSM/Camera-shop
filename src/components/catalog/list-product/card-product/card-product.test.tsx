import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { camera } from '../../../../mocks/mocks';
import { withHistory } from '../../../../mocks/mock-component';
import CardProduct from './card-product';

describe('Component: CardProduct', () => {
  beforeEach(() => {
    vi.mock('../../../stars-rating/stars-rating', () => ({ default: () => (<p>Рейтинг в звездах</p>) }));
  });

  it('should render correct', () => {
    const mockCamera = camera;
    const mockFunction = vi.fn();
    const expectedTextStarsMock = 'Рейтинг в звездах';
    const expectedTextButton = 'Купить';
    const expectedTextLink = 'Подробнее';

    const componentHistory = withHistory(<CardProduct camera={mockCamera} setSearchParamsModalWindow={mockFunction} />);

    render(componentHistory);

    expect(screen.getByAltText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(expectedTextStarsMock)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(expectedTextButton)).toBeInTheDocument();
    expect(screen.getByText(expectedTextLink)).toBeInTheDocument();
  });

  it('should click button "Купить"', async () => {
    const mockCamera = camera;
    const expectedTextButton = 'Купить';
    const mockFunction = vi.fn();

    const componentHistory = withHistory(<CardProduct camera={mockCamera} setSearchParamsModalWindow={mockFunction} />);
    render(componentHistory);
    await userEvent.click(screen.getByText(expectedTextButton));

    expect(mockFunction).toBeCalledTimes(1);
  });
});

