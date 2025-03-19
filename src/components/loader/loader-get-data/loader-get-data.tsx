import { NameTitleLoader } from '../../../const';
import './css/loader-get-data.css';

type PropsLoader = {
  title: NameTitleLoader;
}

export default function LoaderGetData({title}: PropsLoader): JSX.Element {
  return (
    <div className='container-loader'>
      <h1 className='loader-title'>{title}</h1>
      <div className='loader'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
      </div>
    </div>
  );
}
