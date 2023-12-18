import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import CartItem from '../models/CartItem';

interface CartModalProps {
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (id: string, quantity: number) => void;
  title: string;
  actions: React.ReactNode;
}

const CartModal = forwardRef(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions }: CartModalProps,
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (!dialog.current) {
          throw new Error('Dialog ref is undefined');
        }
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default CartModal;
