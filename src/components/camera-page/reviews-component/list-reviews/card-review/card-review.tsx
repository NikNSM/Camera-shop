import { DateFormate } from '../../../../../const';
import { ReviewCard } from '../../../../../type/type';
import { getDateFormate } from '../../../../../utils';
import StarsRating from '../../../../stars-rating/stars-rating';

type PropsCardReview = {
  review: ReviewCard;
}

export default function CardReview({ review }: PropsCardReview): JSX.Element {
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={getDateFormate(review.createAt, DateFormate.DATE_REVIEWS_DATE_TIME)}>{getDateFormate(review.createAt, DateFormate.DATE_REVIEWS)}</time>
      </div>
      <div className="rate review-card__rate">
        <StarsRating rating={review.rating} />
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
