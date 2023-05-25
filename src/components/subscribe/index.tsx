import React from 'react'

import SignUp from '../Input/signUp'

const Subscribe: React.FC = () => {
	return (
		<section className='c-subscribe'>
			<section className='c-subscribe__wrapper'>
				<h2 className='c-subscribe__title'>Join the club and get the benefits</h2>
				<p className='c-subscribe__description'>
					Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more
				</p>
				<div className='c-subscribe__button'>
					<SignUp />
				</div>
			</section>
		</section>
	)
}

export default Subscribe
