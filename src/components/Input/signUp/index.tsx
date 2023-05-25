import React from 'react'

const SignUp: React.FC = () => {
	return (
		<label className='c-signup'>
			<section>
				<form action='' className='c-signup__wrapper'>
					<input type='text' className='c-signup__input' placeholder='your@email.com' required aria-required='true' />

					<button type='submit' className='c-button c-button--dark' aria-label='create account'>
						<a href=''>Sign up</a>
					</button>
				</form>
			</section>
		</label>
	)
}

export default SignUp
