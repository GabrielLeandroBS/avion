export type CheckoutButtonItemsProps = {
  isDisabled: boolean;
  items: Array<{
    stripe: string;
    quantity: number;
  }>;
};
