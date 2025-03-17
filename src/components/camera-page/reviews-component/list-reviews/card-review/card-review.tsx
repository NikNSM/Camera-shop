import { DateFormate } from '../../../../../const';
import { ReviewCard } from '../../../../../type/type';
import { getDateFormate } from '../../../../../utils';

type PropsCardReview = {
  review: ReviewCard;
}

export default function CardReview({ review }: PropsCardReview): JSX.Element {
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{getDateFormate(review.createAt, DateFormate.DATA_REVIEWS)}</time>
      </div>
      <div className="rate review-card__rate">
        {Array.from({ length: 5 }, (_, index) => (
          <svg key={`stars-${index + 1}`} width="17" height="16" aria-hidden="true">
            {review.rating >= index + 1 ? <use xlinkHref="#icon-full-star"></use> : <use xlinkHref="#icon-star"></use>}
          </svg>))}
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
