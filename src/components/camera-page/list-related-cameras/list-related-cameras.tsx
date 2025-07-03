import { useEffect } from 'react';
import { getStateLoadingRelatedCameras, getStateRelatedCameras } from '../../../store/product-slice/product-selectors';
import { useAppDispatch, useAppSelector } from '../../../utils';
import { getRelatedCameras } from '../../../store/product-slice/api-product';

type PropsListRelatedCameras = {
  id: string;
}

export default function ListRelatedCameras({ id }: PropsListRelatedCameras): JSX.Element {
  const dispatch = useAppDispatch();
  const relatedCameras = useAppSelector(getStateRelatedCameras);
  const losdingRelatedCameras = useAppSelector(getStateLoadingRelatedCameras);

  useEffect(() => {
    dispatch(getRelatedCameras(id));
  }, [dispatch, id]);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title&#45;&#45;h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
