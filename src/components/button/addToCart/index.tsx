import React from 'react';
import { toast } from 'react-toastify';

import { ProductInCartProps, AddProductInCartProps } from '../../../types/cart';
import { useCart } from '../../../hooks/useCart';
import { useCartProps } from '../../../types/context/cart';

const ButtonAddToCart: React.FC<AddProductInCartProps> = ({
  product,
}: AddProductInCartProps) => {
  const getItemsAllocatedInsideTheCart = useCart(
    (state: useCartProps) => state.itemsAllocatedInsideCart
  );
  const addItemsIntoCart = useCart(
    (state: useCartProps) => state.addItemsIntoCart
  );
  const updatingItemInsideTheCart = useCart(
    (state: useCartProps) => state.UpdatingItemInsideTheCart
  );

  const handleCartProducts = ({
    slug,
    image,
    price,
    quantity,
    stripe,
    title,
    description,
  }: ProductInCartProps) => {
    const findProductAlreadyEntered = getItemsAllocatedInsideTheCart.findIndex(
      (item: { slug: string }) => item.slug === slug
    );

    if (findProductAlreadyEntered !== -1) {
      getItemsAllocatedInsideTheCart[findProductAlreadyEntered].quantity =
        quantity;
      updatingItemInsideTheCart(
        { slug, image, price, quantity, stripe, title, description },
        getItemsAllocatedInsideTheCart
      );
      toast.info('Item already addeds!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.info('Item included in cart!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      addItemsIntoCart({
        slug,
        image,
        price,
        quantity,
        stripe,
        title,
        description,
      });
    }
  };

  const { slug, image, price, quantity, stripe, title, description } = product;

  return (
    <button
      aria-label="add product in cart"
      className="c-button c-button--dark"
      aria-haspopup="dialog"
      onClick={() =>
        handleCartProducts({
          slug,
          image,
          price,
          quantity,
          stripe,
          title,
          description,
        })
      }
    >
      <span>Add to cart</span>
    </button>
  );
};

export default ButtonAddToCart;
