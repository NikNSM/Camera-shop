import { render, screen } from '@testing-library/react';
import { review } from '../../../../../mocks/mocks';
import CardReview from './card-review';

describe('Component: CardReview', () => {
  beforeEach(() => {
    vi.mock('../../../../stars-rating/stars-rating', () => ({ default: () => (<p>Рейтинг в звездах</p>) }));
  });

  it('should render correct', () => {
    const mockReview = review;
    const expectedTextStarsMock = 'Рейтинг в звездах';

    render(<CardReview review={mockReview} />);

    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
    expect(screen.getByText(expectedTextStarsMock)).toBeInTheDocument();
    expect(screen.getByText(mockReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(mockReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(mockReview.review)).toBeInTheDocument();
  });
});
