import './css/preloader.css';

export default function Preloader(): JSX.Element {
  return (
    <div className='modal is-active'>
      <div className="modal__wrapper">
        <div className='container-loader'>
          <div className="loader-button" data-testid="loader-upload-data"></div>
        </div>
      </div>
    </div>
  );
}
