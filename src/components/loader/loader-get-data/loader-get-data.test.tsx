import { render, screen } from '@testing-library/react';
import LoaderGetData from './loader-get-data';
import { NameTitleLoader } from '../../../const';

describe('Component: LoaderGetData', () => {
  it('should render correct', () => {
    const titleLoaderText = NameTitleLoader.BANNER;
    const loaderGetDataContainerTestId = 'loader-get-data-container';
    const loaderTestId = 'loader';
    const loaderDotTestId = 'dot';
    const expectedCountDot = 5;

    render(<LoaderGetData title={titleLoaderText} />);

    const titleLoader = screen.getByText(titleLoaderText);
    const loaderGetDataContainer = screen.getByTestId(loaderGetDataContainerTestId);
    const loader = screen.getByTestId(loaderTestId);
    const loaderDot = screen.getAllByTestId(loaderDotTestId);

    expect(titleLoader).toBeInTheDocument();
    expect(loaderGetDataContainer).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(loaderDot.length).toBe(expectedCountDot);
  });
});

