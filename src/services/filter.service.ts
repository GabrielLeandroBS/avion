import { Api } from './api.service'
import { FilteringParametersForCategoryProps } from '../types/filters/categories'

export const getProductsFilteredByCategories = async (categories: FilteringParametersForCategoryProps) => {
	const { data } = await Api.get(`/products?populate=deep${categories}`)

	return data
}
