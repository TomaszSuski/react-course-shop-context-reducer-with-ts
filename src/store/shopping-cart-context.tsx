import React from "react";
import ShoppingCart from "../models/ShoppingCart";
import CartItem from "../models/CartItem";
import ProductInterface from "../models/ProductInterface";
import { DUMMY_PRODUCTS } from "../dummy-products";

interface ShoppingCartContextModel {
  shoppingCart: ShoppingCart;
  addItem: (id: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
}

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

const ShoppingCartContext = React.createContext<ShoppingCartContextModel>({
  shoppingCart: { items: [] },
  addItem: (id: string) => {},
  updateQuantity: (productId: string, amount: number) => {},
  clearCart: () => {},
});

export default ShoppingCartContext;

export function ShoppingCartProvider({
  children,
}: ShoppingCartProviderProps): React.ReactElement {
  const [cart, setCart] = React.useState<ShoppingCart>({ items: [] });

  function handleAddItemToCart(id: string) {
    setCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product: ProductInterface) => product.id === id);
        updatedItems.push({
          id: id,
          name: product!.title,
          price: product!.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    setCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const clearCartHandler = () => {
    setCart({ items: [] });
  };

  return (
    // istanbul ignore-next
    <ShoppingCartContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        shoppingCart: cart,
        addItem: handleAddItemToCart,
        updateQuantity: handleUpdateCartItemQuantity,
        clearCart: clearCartHandler,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
