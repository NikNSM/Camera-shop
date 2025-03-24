import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../mocks/mock-component';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correct info footer', () => {
    const linkfooterLogoTestId = 'link-footer-logo';
    const linkfooterLogoImgTestId = 'link-footer-logo-img';
    const linkfooterVkTestId = 'link-footer-vk';
    const linkfooterVkImgTestId = 'link-footer-vk-img';
    const linkfooterPinterestTestId = 'link-footer-pinterest';
    const linkfooterPinterestImgTestId = 'link-footer-pinterest-img';
    const linkfooterRedditTestId = 'link-footer-reddit';
    const linkfooterRedditImgTestId = 'link-footer-reddit-img';
    const expectedTextTitleFooterInfo = 'Интернет-магазин фото- и видеотехники';

    render(withHistory(<Footer />));

    expect(screen.getByTestId(linkfooterLogoTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkfooterLogoImgTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkfooterVkTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkfooterVkImgTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkfooterPinterestTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkfooterPinterestImgTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkfooterRedditTestId)).toBeInTheDocument();
    expect(screen.getByTestId(linkfooterRedditImgTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedTextTitleFooterInfo)).toBeInTheDocument();
  });

  it('should render correct nav footer', () => {
    const expectedTextTitleNav = 'Навигация';
    const expectedTesxtCatalog = 'Каталог';
    const expectedTesxtGuarantees = 'Гарантии';
    const expectedTesxtDelivery = 'Доставка';
    const expectedTesxtAboutСompany = 'О компании';

    const expectedTextTitleResource = 'Ресурсы';
    const expectedTesxtOperatorCourses = 'Курсы операторов';
    const expectedTesxtBlog = 'Блог';
    const expectedTesxtCommunity = 'Сообщество';

    const expectedTextTitleSupport = 'Поддержка';
    const expectedTesxtFAQ = 'FAQ';
    const expectedTesxtAskQuaestions = 'Задать вопрос';

    render(withHistory(<Footer />));

    expect(screen.getByText(expectedTextTitleNav)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtCatalog)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtGuarantees)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtDelivery)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtAboutСompany)).toBeInTheDocument();
    expect(screen.getByText(expectedTextTitleResource)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtOperatorCourses)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtBlog)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtCommunity)).toBeInTheDocument();
    expect(screen.getByText(expectedTextTitleSupport)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtFAQ)).toBeInTheDocument();
    expect(screen.getByText(expectedTesxtAskQuaestions)).toBeInTheDocument();
  });
});
