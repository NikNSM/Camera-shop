import { ReviewCard } from '../../../../type/type';
import CardReview from './card-review/card-review';

type PropsListReviews = {
  listReviews: ReviewCard[];
}

export default function ListReviews({listReviews}: PropsListReviews):JSX.Element {
  return(
    <ul className="review-block__list">
      {
        listReviews.map((review) => <CardReview key={`review-${review.id}`} review={review}/>)
      }
    </ ul>
  );
}
