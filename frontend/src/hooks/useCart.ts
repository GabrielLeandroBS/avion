import create from 'zustand';
import { persist } from 'zustand/middleware';

import {
  AddToCartInitialProps,
  CartContentProps,
  RemoveCartInitialProps,
  UpdateCartInitialStateProps,
  UpdateInitialCartProps,
} from '../types/context';

export const useCart = create(
  persist(
    (set) => ({
      total: 0,
      quantity: 0,
      cartContent: [],

      addTocart: (params: AddToCartInitialProps) => {
        set((state: UpdateCartInitialStateProps) => ({
          quantity: state.quantity + 1,
          total: state.total + parseFloat(params.price),
          cartContent: [...state.cartContent, params],
        }));
      },

      updateCart: (
        params: UpdateInitialCartProps,
        getCart: CartContentProps
      ) => {
        set((state: UpdateCartInitialStateProps) => ({
          quantity: state.quantity + 1,
          total: state.total + parseFloat(params.price),
          cartContent: getCart,
        }));
      },

      removeFromCart: (params: RemoveCartInitialProps) =>
        set((state: UpdateCartInitialStateProps) => ({
          total: state.total - params.price * params.quantity,
          quantity: state.quantity - params.quantity,
          cartContent: state.cartContent.filter(
            (item: UpdateCartInitialStateProps) => item.slug !== params.slug
          ),
        })),

      clearCart: () =>
        set({
          total: 0,
          quantity: 0,
          cartContent: [],
        }),
    }),
    { name: 'cart' }
  )
);
