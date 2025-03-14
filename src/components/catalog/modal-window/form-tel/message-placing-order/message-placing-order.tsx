import { ResultPlacingOrder } from '../../../../../type/type';

type PropsMessagePlacingOrder = {
  resultPlacingOrder: ResultPlacingOrder;
}

export default function MessagePlacingOrder({resultPlacingOrder}: PropsMessagePlacingOrder): JSX.Element | string{
  switch (resultPlacingOrder) {
    case ResultPlacingOrder.SUCCESSFULY:
      return (
        <p
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '18px',
            color: '#65cd54'
          }}
        >
          Заказ успешно создан. Мы с вами свяжимся!
        </ p>);
    case ResultPlacingOrder.ERROR:
      return (
        <p
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '18px',
            color: '#ed6041'
          }}
        >
          Произошла ошибка. Попробуйте снова.
        </ p>
      );
    default:
      return ('');
  }
}
