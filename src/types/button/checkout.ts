export type CheckoutButtonProps = {
  isDisabled: boolean;
  items: Array<{
    stripe: string;
    quantity: number;
  }>;
};
