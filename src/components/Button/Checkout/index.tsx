import { loadStripe, Stripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import { CheckoutButtonItemsProps } from '../../../types/button/checkout';
import { checkoutOptionsProps } from '../../../types/checkout';
import { REACT_APP_STRIPE_KEY } from '../../../../global/constants';
import { useStripeProps } from '../../../types/stripe';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
};

const Checkout: React.FC<CheckoutButtonItemsProps> = (
  items: CheckoutButtonItemsProps
) => {
  const [loading, setLoading] = useState(false);

  const checkout = items.items.map((item) => {
    return {
      price: item.stripe.toString(),
      quantity: item.quantity,
    };
  });

  const checkoutOptions: checkoutOptionsProps = {
    lineItems: checkout,
    mode: 'payment',
    successUrl: `${window.location.origin}/`,
    cancelUrl: `${window.location.origin}/`,
    shippingAddressCollection: {
      allowedCountries: ['US', 'BR'],
    },
    billingAddressCollection: 'required',
  };

  const redirectToCheckout = async () => {
    try {
      setLoading(true);
      const stripe: useStripeProps = await getStripe();
      await stripe.redirectToCheckout(checkoutOptions);
      toast.info(`Product Added list, you will be redirected.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setLoading(false);
    } catch (error) {
      toast.error(`Product not registered.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setLoading(false);
    }
  };

  return (
    <button
      className={`c-button c-button--dark ${
        items.isDisabled ? 'c-button--disabled' : ''
      } `}
      type="button"
      onClick={redirectToCheckout}
    >
      {loading ? <span>Loading</span> : <span>Go to checkout</span>}
    </button>
  );
};

export default Checkout;
