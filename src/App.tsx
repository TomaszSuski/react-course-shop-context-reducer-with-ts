import React, { useState, useContext } from "react";
import Header from "./components/Header";
import Shop from "./components/Shop";
import ShoppingCartContext, {
  ShoppingCartProvider,
} from "./store/shopping-cart-context";

function App() {
  const { shoppingCart, addItem } = useContext(ShoppingCartContext);

  return (
    <ShoppingCartProvider>
      <Header />
      <Shop />
    </ShoppingCartProvider>
  );
}

export default App;
