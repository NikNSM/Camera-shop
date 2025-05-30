import { StateProductsBasket, PromoProduct, ArgumentCoupon } from '../../type/type';

const getQuantityBasketProductsWithoutPromo = (products: StateProductsBasket[], promo: PromoProduct[]) => products.reduce((acc, camera) => {
  if (promo.find((item) => item.id === camera.id)) {
    return acc;
  }
  return acc + camera.quantity;
}, 0);

const getAmountBasketWithoutPromo = (products: StateProductsBasket[], promo: PromoProduct[]) => products.reduce((acc, camera) => {
  if (promo.find((item) => item.id === camera.id)) {
    return acc;
  }
  return acc + camera.price * camera.quantity;
}, 0);

const getDiscountPercent = (products: StateProductsBasket[], promo: PromoProduct[]): number => {
  let discount = 0;
  const quantityProducts = getQuantityBasketProductsWithoutPromo(products, promo);
  const sumPrice = getAmountBasketWithoutPromo(products, promo);
  if (quantityProducts >= 10) {
    discount = 15;
  } else if (quantityProducts === 2) {
    discount = 3;
  } else if (quantityProducts <= 5 && quantityProducts >= 3) {
    discount = 5;
  } else if (quantityProducts >= 6 && quantityProducts <= 9) {
    discount = 10;
  }

  if (sumPrice >= 10000 && sumPrice < 20000) {
    discount = Math.floor((discount - 1) * 100) / 100;
  } else if (sumPrice >= 20000 && sumPrice < 30000) {
    discount = Math.floor((discount - 2) * 100) / 100;
  } else if (sumPrice >= 30000) {
    discount = Math.floor((discount - 3) * 100) / 100;
  }

  return discount;
};


const getAmountBasket = (products: StateProductsBasket[]) => products.reduce((acc, camera) => acc + camera.price * camera.quantity, 0);

const getDiscountCoupon = (products: StateProductsBasket[], percentCoupon: number) => {
  const amountBasket = getAmountBasket(products);
  return (amountBasket * percentCoupon) / 100;
};

const getDiscountOnProducts = (products: StateProductsBasket[], promo: PromoProduct[]) => {
  const percentDiscountOnProducts = getDiscountPercent(products, promo);
  const amountBasketWithoutPromo = getAmountBasketWithoutPromo(products, promo);
  return (amountBasketWithoutPromo * percentDiscountOnProducts) / 100;
};

const getDiscount = (basket: StateProductsBasket[], promo: PromoProduct[], percentCoupon: number | null) => {
  const discountCoupon = percentCoupon ? getDiscountCoupon(basket, percentCoupon) : 0;
  const discountOnProducts = getDiscountOnProducts(basket, promo);
  return discountCoupon + discountOnProducts;
};

const getArgumentCoupon = (coupon: string): ArgumentCoupon => ({
  coupon
});

export { getAmountBasket, getDiscount, getArgumentCoupon };
