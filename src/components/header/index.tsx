import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/sprite-svg/logo.svg'
import cart from '../../assets/sprite-svg/cart.svg'

const Header: React.FC = () => {
	return (
		<header className='c-header'>
			<Link to={`/`}>
				<figure>
					<img src={logo} alt='Logo' />
				</figure>
			</Link>

			<Link to={`/baskets`}>
				<figure>
					<img src={cart} alt='Logo' />
				</figure>
			</Link>
		</header>
	)
}

export default Header
