import { render, screen } from '@testing-library/react';
import LoaderUploadData from './loader-upload-data';

describe('Component: LoaderUploadData', () => {
  it('should render correct', () => {
    const loaderUploadDataTestId = 'loader-upload-data';

    render(<LoaderUploadData />);

    expect(screen.getByTestId(loaderUploadDataTestId)).toBeInTheDocument();
  });
});
