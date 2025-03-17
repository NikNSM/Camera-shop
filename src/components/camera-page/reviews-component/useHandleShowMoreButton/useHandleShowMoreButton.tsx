import { ReviewCard } from '../../../../type/type';
import { useEffect, useState } from 'react';

export function useHandleShowMoreButton (reviews: ReviewCard[]): [ReviewCard[], boolean, () => void] {
  const sortReviews = [...reviews].sort((a, b) => {
    const dateA = Date.parse(a.createAt);
    const dateB = Date.parse(b.createAt);
    return dateB - dateA;
  });

  const renderCount = 3;
  const [renderReviewsCount, setRenderReviewsCount] = useState(Math.min(renderCount, sortReviews.length));

  const handlerClickShowMoreButton = () => {
    const newRenderReviewsCount = Math.min(sortReviews.length, renderReviewsCount + renderCount);
    setRenderReviewsCount(newRenderReviewsCount);
  };

  const reviewsRender = sortReviews.slice(0, renderReviewsCount);
  const isShowMoreButton = sortReviews.length > renderReviewsCount;

  useEffect(() => {
    const newRenderReviewsCount = Math.min(reviews.length, renderCount);
    setRenderReviewsCount(newRenderReviewsCount);
  }, [reviews, setRenderReviewsCount]);

  return [reviewsRender, isShowMoreButton, handlerClickShowMoreButton];
}
