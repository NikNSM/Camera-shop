import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../mocks/mock-component';
import Header from './header.';

describe('Component: Header', () => {
  it('should render correct', () => {
    const expectedTesxtCatalog = 'Каталог';
    const expectedTesxtGuarantees = 'Гарантии';
    const expectedTesxtDelivery = 'Доставка';
    const expectedTesxtAboutСompany = 'О компании';
    const linkLogoTestId = 'link-header-logo';
    const linkLogoUseTestId = 'link-header-use';

    render(withHistory(<Header />));

    expect(screen.getByTestId(linkLogoTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkLogoUseTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtCatalog)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtGuarantees)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtDelivery)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtAboutСompany)).toBeInTheDocument();
  });
});
