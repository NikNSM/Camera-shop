import { render, screen } from '@testing-library/react';
import ListReviews from './list-reviews';
import { review } from '../../../../mocks/mocks';

describe('Component: ListReviews', () => {
  beforeEach(() => {
    vi.mock('./card-review/card-review', () => ({ default: () => (<p>Отзыв</ p>) }));
  });

  it('should render correct', () => {
    const expectedLengthCard = 5;
    const expectedText = 'Отзыв';
    const mockListReviews = Array.from({ length: expectedLengthCard }, (_, index) => ({ ...review, id: `Id-${index}` }));

    render(<ListReviews listReviews={mockListReviews} />);

    expect(screen.getAllByText(expectedText).length).toBe(expectedLengthCard);
  });
});
