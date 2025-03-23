import { render, screen } from '@testing-library/react';
import Aside from './aside';

describe('Component: Aside', () => {
  it('should render correctly', () => {
    const asideContainerTestId = 'Aside-container';
    const asideImgTestId = 'Aside-img';

    render(<Aside />);

    const asideContainer = screen.getByTestId(asideContainerTestId);
    const asideImg = screen.getByTestId(asideImgTestId);

    expect(asideContainer).toBeInTheDocument();
    expect(asideImg).toBeInTheDocument();
  });
});
