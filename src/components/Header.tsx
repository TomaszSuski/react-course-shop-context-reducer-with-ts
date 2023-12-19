import React, { useRef, useContext } from "react";
import CartModal from "./CartModal.jsx";
import ShoppingCartContext from "../store/shopping-cart-context.js";

export default function Header() {
  const { shoppingCart, clearCart } = useContext(ShoppingCartContext);
  const modal = useRef<any>(null);

  const cartQuantity = shoppingCart.items.length;

  function handleOpenCartClick() {
    if (!modal.current) {
      throw new Error("Modal ref is undefined");
    }
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button type="button" onClick={() => clearCart()}>
          Clear Cart
        </button>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
