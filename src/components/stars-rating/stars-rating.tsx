type PropsStarsRating = {
  rating: number;
}

export default function StarsRating({ rating }: PropsStarsRating): JSX.Element {
  return (
    <>
      {
        Array.from({ length: 5 }, (_, index) => (
          <svg key={`stars-${index + 1}`} width="17" height="16" aria-hidden="true" data-testid="container-star">
            {rating >= index + 1 ? <use xlinkHref="#icon-full-star" data-testid="full-star"></use> : <use xlinkHref="#icon-star" data-testid="star"></use>}
          </svg>))
      }
    </>
  );
}
