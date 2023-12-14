import React from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';
import Product from './Product';
import ProductInterface from '../models/ProductInterface';

interface ShopProps {
  onAddItemToCart: (id: string) => void;
}

export default function Shop({ onAddItemToCart }: ShopProps) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product: ProductInterface) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
