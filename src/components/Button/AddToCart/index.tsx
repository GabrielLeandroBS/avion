import React from 'react';
import { toast } from 'react-toastify';

import { ProductInCartProps, AddProductInCartProps } from '../../../types/cart';
import { useCart } from '../../../hooks/useCart';
import { useCartProps } from '../../../types/context';

const ButtonAddToCart: React.FC<AddProductInCartProps> = ({
  product,
}: AddProductInCartProps) => {
  const getCart = useCart((state: useCartProps) => state.cartContent);
  const addToCart = useCart((state: useCartProps) => state.addTocart);
  const updateCart = useCart((state: useCartProps) => state.updateCart);

  const handleCartProducts = ({
    slug,
    image,
    price,
    quantity,
    stripe,
    title,
    description,
  }: ProductInCartProps) => {
    const findProductEqual = getCart.findIndex(
      (item: { slug: string }) => item.slug === slug
    );

    if (findProductEqual !== -1) {
      getCart[findProductEqual].quantity = quantity;
      updateCart(
        { slug, image, price, quantity, stripe, title, description },
        getCart
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
      addToCart({
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
      className="c-button c-button--dark"
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
