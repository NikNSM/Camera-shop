import { render, screen } from '@testing-library/react';
import StarsRating from './stars-rating';

describe('Component: StarsRating', () => {
  it('should render correct', () => {
    const countStars = 5;
    const expectedRating = 3;
    const containerStarTestId = 'container-star';
    const fullStarTestId = 'full-star';
    const starTestId = 'star';

    render(<StarsRating rating={expectedRating} />);

    const containerStar = screen.getAllByTestId(containerStarTestId);
    const fullStar = screen.getAllByTestId(fullStarTestId);
    const star = screen.getAllByTestId(starTestId);

    expect(containerStar.length).toBe(countStars);
    expect(fullStar.length).toBe(expectedRating);
    expect(star.length).toBe(countStars - expectedRating);
  });
});
