import { useEffect, useRef } from 'react';
import { ProductCard, SetInformationModalWindow } from '../../type/type';
import { NameSpaceModalWindowProduct } from '../../const';
import { useHandleTab } from './use-handle-tab/use-handle-tab';
import ModalWindowContent from './modal-window-content/modal-window-content';

type PorpsModalWindow = {
  name: NameSpaceModalWindowProduct;
  camera: ProductCard | null;
  setActiveModalWindow: SetInformationModalWindow;
}

export default function ModalWindow({ name, camera, setActiveModalWindow }: PorpsModalWindow): JSX.Element {
  const orderButton = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const closeModalWindow = () => {
    setActiveModalWindow(NameSpaceModalWindowProduct.UNKNOW);
  };

  useHandleTab(true, orderButton, closeButton);

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
    <div className={`modal is-active ${name === NameSpaceModalWindowProduct.SUCCESSFULLY || name === NameSpaceModalWindowProduct.THANKS ? 'modal--narrow' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModalWindow}></div>
        <div className="modal__content">
          <ModalWindowContent name={name} camera={camera} setActiveModalWindow={setActiveModalWindow} orderButton={orderButton} />
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
