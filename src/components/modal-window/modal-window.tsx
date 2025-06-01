import { useEffect, useRef } from 'react';
import { NameSpaceModalWindowProduct } from '../../const';
import { useHandleTab } from './use-handle-tab/use-handle-tab';
import ModalWindowContent from './modal-window-content/modal-window-content';
import { useAppDispatch, useAppSelector } from '../../utils';
import { getStateAciveCameraModalWindow, getStateActiveModalWindow } from '../../store/modal-window-slice/modal-window-selectors';
import { clearActiveModalWinow } from '../../store/modal-window-slice/modal-window-slice';

export default function ModalWindow(): JSX.Element | string {
  const dispatch = useAppDispatch();
  const activeModalWindow = useAppSelector(getStateActiveModalWindow);
  const activeCameraModalWindow = useAppSelector(getStateAciveCameraModalWindow);

  const elementsFocus = useRef<(HTMLElement | HTMLAnchorElement | null)[]>([]);
  const closeModalWindow = () => {
    dispatch(clearActiveModalWinow());
  };

  useHandleTab(elementsFocus);

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
    <div className={`modal is-active ${activeModalWindow === NameSpaceModalWindowProduct.SUCCESSFULLY || activeModalWindow === NameSpaceModalWindowProduct.THANKS ? 'modal--narrow' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModalWindow}></div>
        <div className="modal__content">
          <ModalWindowContent name={activeModalWindow} camera={activeCameraModalWindow} elementsFocus={elementsFocus} />
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={closeModalWindow} ref={(element) => {
            elementsFocus.current[0] = element;
          }}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
