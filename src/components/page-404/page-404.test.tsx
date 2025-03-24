import { render, screen } from '@testing-library/react';
import Page404 from './page-404';
import { withHistory } from '../../mocks/mock-component';

describe('Component: Page404', () => {
  it('should render correct', () => {
    const expectedTextHeader = '404';
    const expectedTextTitle = 'Что-то пошло не так. Вернемся в начало?';
    const linkTestId = 'link';
    const expectedTextLink = 'На Главную';

    render(withHistory(<Page404 />));

    const text404 = screen.getByText(expectedTextHeader);
    const textTitle = screen.getByText(expectedTextTitle);
    const textLink = screen.getByText(expectedTextLink);
    const link = screen.getByTestId(linkTestId);

    expect(text404).toBeInTheDocument();
    expect(textTitle).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(textLink).toBeInTheDocument();
  });
});
