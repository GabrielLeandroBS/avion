import create from 'zustand';
import { persist } from 'zustand/middleware';

import {
  AddToCartInitialProps,
  CartContentProps,
  RemoveCartInitialProps,
  InitialProps,
  UpdateInitialCartProps,
} from '../types/context/cart';

export const useCart = create(
  persist(
    (set) => ({
      totalOfItemsInCartOfItemsInCart: 0,
      quantityOfItemsInCart: 0,
      itemsAllocatedInsideCart: [],

      addItemsIntoCart: (params: AddToCartInitialProps) => {
        set((state: InitialProps) => ({
          quantityOfItemsInCart: state.quantityOfItemsInCart + 1,
          totalOfItemsInCart:
            state.totalOfItemsInCart + parseFloat(params.price),
          itemsAllocatedInsideCart: [...state.itemsAllocatedInsideCart, params],
        }));
      },

      UpdatingItemInsideTheCart: (
        params: UpdateInitialCartProps,
        getCart: CartContentProps
      ) => {
        set((state: InitialProps) => ({
          quantityOfItemsInCart: state.quantityOfItemsInCart + 1,
          totalOfItemsInCart:
            state.totalOfItemsInCart + parseFloat(params.price),
          itemsAllocatedInsideCart: getCart,
        }));
      },

      removeCompleteItemFromCart: (params: RemoveCartInitialProps) =>
        set((state: InitialProps) => ({
          totalOfItemsInCart:
            state.totalOfItemsInCart -
            params.price * params.quantityOfItemsInCart,
          quantityOfItemsInCart:
            state.quantityOfItemsInCart - params.quantityOfItemsInCart,
          itemsAllocatedInsideCart: state.itemsAllocatedInsideCart.filter(
            (item: InitialProps) => item.slug !== params.slug
          ),
        })),

      RemoveAllItemsFromCart: () =>
        set({
          totalOfItemsInCart: 0,
          quantityOfItemsInCart: 0,
          itemsAllocatedInsideCart: [],
        }),
    }),
    { name: 'cart' }
  )
);
