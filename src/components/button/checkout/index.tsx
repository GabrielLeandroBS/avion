import { loadStripe, Stripe } from '@stripe/stripe-js'
import { toast } from 'react-toastify'
import React, { useState } from 'react'

import { CheckoutButtonProps } from '../../../types/button/checkout'
import { checkoutOptionsProps } from '../../../types/checkout'
import { VITE_STRIPE_KEY } from '../../../../global/constants'
import { useStripeProps } from '../../../types/stripe'

let stripePromise: Promise<Stripe | null>

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(VITE_STRIPE_KEY)
	}
	return stripePromise
}

const Checkout: React.FC<CheckoutButtonProps> = (checkoutProps: CheckoutButtonProps) => {
	const [loading, setLoading] = useState(false)
	const { items } = checkoutProps
	const checkout = items.map((product) => {
		return {
			price: product.stripe.toString(),
			quantity: product.quantity,
		}
	})

	const checkoutOptions: checkoutOptionsProps = {
		lineItems: checkout,
		mode: 'payment',
		successUrl: `${window.location.origin}/`,
		cancelUrl: `${window.location.origin}/baskets`,
		shippingAddressCollection: {
			allowedCountries: ['US', 'BR'],
		},
		billingAddressCollection: 'required',
	}

	const redirectToCheckout = async () => {
		try {
			setLoading(true)
			const stripe: useStripeProps = await getStripe()
			toast.info(`Product Added list, you will be redirected.`, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				onClose: async () => {
					setLoading(false)
					await stripe.redirectToCheckout(checkoutOptions)
				},
			})
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
			})
		}
	}

	return (
		<button
			aria-label='checkout button'
			className={`c-button c-button--dark ${checkoutProps.isDisabled ? 'c-button--disabled' : ''} `}
			type='button'
			onClick={redirectToCheckout}
		>
			{loading ? <span>Loading</span> : <span>Go to checkout</span>}
		</button>
	)
}

export default Checkout
