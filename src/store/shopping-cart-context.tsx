import React, { createContext, useReducer } from "react";
import ShoppingCart from "../models/ShoppingCart";
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

type ShoppingCartUpdatePayload = {
  productId: string;
  amount: number;
};

type ShoppingCartAction =
  | { type: "ADD_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: ShoppingCartUpdatePayload }
  | { type: "CLEAR_CART" };

const ShoppingCartContext = createContext<ShoppingCartContextModel>({
  shoppingCart: { items: [] },
  addItem: (id: string) => {},
  updateQuantity: (productId: string, amount: number) => {},
  clearCart: () => {},
});

export default ShoppingCartContext;

function shoppingCartReducer(
  state: ShoppingCart,
  action: ShoppingCartAction
): ShoppingCart {
  let updatedItems = [...state.items];
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product: ProductInterface) => product.id === action.payload
        );
        updatedItems.push({
          id: action.payload,
          name: product!.title,
          price: product!.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };

    case "UPDATE_QUANTITY":
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    case "CLEAR_CART":
      return {
        items: [],
      };
    default:
      return state;
  }
}

export function ShoppingCartProvider({
  children,
}: ShoppingCartProviderProps): React.ReactElement {
  const [shoppingCart, dispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  function handleAddItemToCart(id: string) {
    dispatch({ type: "ADD_ITEM", payload: id });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, amount } });
  }

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart: shoppingCart,
        addItem: handleAddItemToCart,
        updateQuantity: handleUpdateCartItemQuantity,
        clearCart: clearCartHandler,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
