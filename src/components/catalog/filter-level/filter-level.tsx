import { SetURLSearchParams } from 'react-router-dom';
import { NameSpaceSearchParams } from '../../../const';
import { LevelProduct } from '../../../type/type';
type PropsFilterLevel = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export default function FilterLevel({ searchParams, setSearchParams }: PropsFilterLevel): JSX.Element {
  const getNameFilterLevel = (level: LevelProduct) => {
    switch (level) {
      case LevelProduct.ZERO:
        return 'zero';
      case LevelProduct.AMATEUR:
        return 'non-professional';
      case LevelProduct.PROFESSIONAL:
        return 'professional';
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title&#45;&#45;h5">Уровень</legend>
      {Object.values(LevelProduct).map((level) => (
        <div key={level} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name={getNameFilterLevel(level)}
              checked={searchParams.getAll(NameSpaceSearchParams.FILTER_LEVEL).includes(level)}
              data-level={level}
              onChange={(evt) => {
                const valueLevel = evt.currentTarget.dataset.level as string;
                const levelSearchParams = searchParams.getAll(NameSpaceSearchParams.FILTER_LEVEL);
                searchParams.delete(NameSpaceSearchParams.FILTER_LEVEL);

                if (levelSearchParams.includes(valueLevel)) {
                  const newLevelSearchParams = levelSearchParams.filter((parameter) => parameter !== valueLevel);
                  newLevelSearchParams.forEach((perameter) => searchParams.append(NameSpaceSearchParams.FILTER_LEVEL, perameter));
                } else {
                  levelSearchParams.push(valueLevel);
                  levelSearchParams.forEach((perameter) => searchParams.append(NameSpaceSearchParams.FILTER_LEVEL, perameter));
                }
                setSearchParams(searchParams);
              }}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{level}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
