import { NameTitleLoader } from '../../../const';
import { getStateListReviews, getStateLoadingReviews } from '../../../store/reviews-slice/reviews-selectors';
import { useAppSelector } from '../../../utils';
import LoaderGetData from '../../loader/loader-get-data/loader-get-data';
import ListReviews from './list-reviews/list-reviews';
import { useHandleShowMoreButton } from './useHandleShowMoreButton/useHandleShowMoreButton';


export default function ReviewsComponent(): JSX.Element {
  const listReviews = useAppSelector(getStateListReviews);
  const loadingListReviews = useAppSelector(getStateLoadingReviews);

  const [reviewsRender, isShowMoreButton, handlerClickShowMoreButton] = useHandleShowMoreButton(listReviews);
  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
          </div>
          {loadingListReviews ? <LoaderGetData title={NameTitleLoader.REVIEWS}/> :
            <>
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
            </>}
        </div>
      </section>
    </div>
  );
}
