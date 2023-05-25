import React from 'react'
import FilterCategories from './categories'

const Filters: React.FC = () => {
	return (
		<section className='c-filters'>
			<div className='c-filters__container'>
				<FilterCategories />
			</div>
		</section>
	)
}

export default Filters
