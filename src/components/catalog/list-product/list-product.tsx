import CardProduct from './card-product/card-product';

export default function ListProduct(): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {Array.from({ length: 8 }, (_, index) => <CardProduct key={`camera-key-${index}`} />)}
    </div>
  );
}
