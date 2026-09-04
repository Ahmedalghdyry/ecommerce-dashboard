import type { IProductSlice } from "../interface";

interface ICartItem extends IProductSlice {
  quantity: number;
}
export const addItemShoppingCart = (
  cartItems: IProductSlice,
  shoppingCartItems: ICartItem[] = [],
) => {
  const existingCartItem = shoppingCartItems.find(
    (item) => item.id === cartItems.id,
  );
  if (existingCartItem) {
    console.log("first");

    return shoppingCartItems.map((item) =>
      item.id === cartItems.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...shoppingCartItems, { ...cartItems, quantity: 1 }];
};
