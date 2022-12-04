export type checkoutOptionsProps = {
  lineItems: Array<{
    price: string;
    quantity: number;
  }>;
  mode: 'payment' | 'subscription' | undefined;
  successUrl: string;
  cancelUrl: string;
  shippingAddressCollection: {
    allowedCountries: string[];
  };
  billingAddressCollection: 'required' | 'auto' | undefined;
};
