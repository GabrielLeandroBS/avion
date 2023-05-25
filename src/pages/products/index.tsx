import { Layout } from '../../layout'
import Filters from '../../components/filters'
import ListingProducts from '../../components/products/listing'
import React from 'react'

const Products: React.FC = () => {
	return (
		<Layout>
			<section>
				<h1 className='p-products__title'>View all Products</h1>
				<Filters />
				<ListingProducts />
			</section>
		</Layout>
	)
}

export default Products
