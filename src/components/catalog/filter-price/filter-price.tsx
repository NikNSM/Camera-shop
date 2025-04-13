export default function FilterPrice(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" name="price" placeholder="от" />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp" placeholder="до" />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
