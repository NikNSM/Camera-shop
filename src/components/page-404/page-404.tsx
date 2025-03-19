import { Helmet } from 'react-helmet-async';
import { AddresesRoute } from '../../const';
import { Link } from 'react-router-dom';

export default function Page404(): JSX.Element {
  return (
    <main
      style={
        {
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'

        }
      }
    >
      <Helmet>
        <title>404</title>
      </Helmet>
      <h1 className="title title--h1">404</h1>
      <h3 className="title title--h3">Что-то пошло не так. Вернемся в начало?</h3>
      <div>
        <Link className="btn btn--purple product-card__btn" to={AddresesRoute.CATALOG}>
          <p className="title--size-s">На Главную</p>
        </Link>
      </div>
    </main>
  );
}
