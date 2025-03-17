import { useEffect } from 'react';
import { getStateListReviews } from '../../../store/reviews-slice/reviews-selectors';
import { useAppDispatch, useAppSelector } from '../../../utils';
import ListReviews from './list-reviews/list-reviews';
import { getReviewsCamera } from '../../../store/reviews-slice/api-reviews';
import { clearReviews } from '../../../store/reviews-slice/reviews-slice';
import { useHandleShowMoreButton } from './useHandleShowMoreButton/useHandleShowMoreButton';
type PropsReviewsComponent = {
  cameraId: number;
}


export default function ReviewsComponent({ cameraId }: PropsReviewsComponent): JSX.Element {
  const listReviews = useAppSelector(getStateListReviews);
  const dispatch = useAppDispatch();

  const [reviewsRender, isShowMoreButton, handlerClickShowMoreButton] = useHandleShowMoreButton(listReviews);

  useEffect(() => {
    dispatch(getReviewsCamera(cameraId));
    return () => {
      dispatch(clearReviews());
    };
  }, [dispatch, cameraId]);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
          </div>
          <ListReviews listReviews={reviewsRender} />
          <div className="review-block__buttons">
            {isShowMoreButton ?
              <button
                className="btn btn--purple"
                type="button"
                onClick={handlerClickShowMoreButton}
              >
                Показать больше отзывов
              </button> : ''}
          </div>
        </div>
      </section>
    </div>
  );
}
