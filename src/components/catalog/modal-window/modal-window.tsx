import { useEffect, useRef } from 'react';
import { useMask } from '@react-input/mask';
import { ProductCard } from '../../../type/type';
import InformationCamera from './information-camera/information-camera';
import FormTel from './form-tel/form-tel';
import { useHandleTab } from './use-handle-tab/use-handle-tab';

type PorpsModalWindow = {
  camera: ProductCard;
  setCamera: React.Dispatch<React.SetStateAction<null | ProductCard>>;
}

export default function ModalWindow({ camera, setCamera }: PorpsModalWindow): JSX.Element {
  const inputTel = useMask({
    mask: '+7(___)-___-__-__',
    replacement: { _: /\d/ }
  });

  const orderButton = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const closeModalWindow = () => setCamera(null);

  const indexFocusElement = useHandleTab(true, inputTel, orderButton, closeButton);

  useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModalWindow();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return (() => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    });
  });

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModalWindow}></div>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <InformationCamera camera={camera}/>
          <FormTel orderButton={orderButton} inputTel={inputTel} inedxFocusElement={indexFocusElement}/>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={closeModalWindow} ref={closeButton}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
