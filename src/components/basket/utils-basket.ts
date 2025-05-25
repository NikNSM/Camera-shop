import { StateProductsBasket, PromoProduct } from '../../type/type';

const getQuantityBasketProducts = (products: StateProductsBasket[]) => products.reduce((acc, camera) => acc + camera.quantity, 0);
export const getAmountBasket = (products: StateProductsBasket[]) => products.reduce((acc, camera) => acc + camera.price * camera.quantity, 0);

const getDiscountPercent = (products: StateProductsBasket[]): number => {
  let discount = 0;
  const quantityProducts = getQuantityBasketProducts(products);
  const sumPrice = getAmountBasket(products);
  if (quantityProducts >= 10) {
    discount = 0.15;
  } else if (quantityProducts === 2) {
    discount = 0.03;
  } else if (quantityProducts <= 5 && quantityProducts >= 3) {
    discount = 0.05;
  } else if (quantityProducts >= 6 && quantityProducts <= 9) {
    discount = 0.1;
  }

  if (sumPrice >= 10000 && sumPrice < 20000) {
    discount = Math.floor((discount - 0.01) * 100) / 100;
  } else if (sumPrice >= 20000 && sumPrice < 30000) {
    discount = Math.floor((discount - 0.02) * 100) / 100;
  } else if (sumPrice >= 30000) {
    discount = Math.floor((discount - 0.03) * 100) / 100;
  }

  return discount;
};

export const getDiscount = (basket: StateProductsBasket[], promo: PromoProduct[]) => {
  const percentDiscount = getDiscountPercent(basket);
  const sumPriceOfDiscount = basket.reduce((acc, camera) => {
    if (promo.find((item) => item.id === camera.id)) {
      return acc;
    }
    return acc + camera.price * camera.quantity;
  }, 0);
  return Math.round((sumPriceOfDiscount * percentDiscount) * 100) / 100;
};
