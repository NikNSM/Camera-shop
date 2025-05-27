import { useState } from 'react';
import { IsValidUserPhone, OrderContactMe } from '../../../type/type';
import { useAppDispatch } from '../../../utils';
import { postOrder } from '../../../store/product-slice/api-product';

type ResultUseSendOrder = [(value: string) => void, () => void, IsValidUserPhone]

export function useSendOrder(cameraId: number): ResultUseSendOrder {
  const dispatch = useAppDispatch();
  const [numberPhone, setNumberPhone] = useState<string>('');
  const [numberPhoneIsValid, setNumberPhoneIsValid] = useState<IsValidUserPhone>(IsValidUserPhone.UNKNOW);
  const regExpTel = /^(\+79)\d{9}$/;
  const regExpTelReplace = /-|\(|\)/g;

  const validateNumberPhoneUser = (value: string) => {
    const newValue = value.replace(regExpTelReplace, '');
    if (regExpTel.test(newValue)) {
      setNumberPhoneIsValid(IsValidUserPhone.ISVALID);
    } else if (numberPhoneIsValid !== IsValidUserPhone.ISINVALID) {
      setNumberPhoneIsValid(IsValidUserPhone.ISINVALID);
    }
    setNumberPhone(newValue);
  };

  const sendOrder = () => {
    const orderInformation: OrderContactMe = {
      camerasIds: [cameraId],
      coupon: null,
      tel: numberPhone
    };
    dispatch(postOrder(orderInformation));
  };

  return [validateNumberPhoneUser, sendOrder, numberPhoneIsValid];
}
