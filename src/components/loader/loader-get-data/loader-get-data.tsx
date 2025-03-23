import { NameTitleLoader } from '../../../const';
import './css/loader-get-data.css';

type PropsLoader = {
  title: NameTitleLoader;
}

export default function LoaderGetData({ title }: PropsLoader): JSX.Element {
  return (
    <div className='container-loader' data-testid="loader-get-data-container">
      <h1 className='loader-title'>{title}</h1>
      <div className='loader' data-testid="loader">
        {Array.from({ length: 5 }, (_, index) => <div className='dot' key={index} data-testid="dot"></div>)}
      </div>
    </div>
  );
}
