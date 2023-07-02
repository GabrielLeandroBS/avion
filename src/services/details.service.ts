import { DetailsProps } from '../types/details'
import { Api } from './api.service'

export const getDetails = async (slug: DetailsProps) => {
	const data = await Api.get(`/products?filters[slug]=${slug}&populate=*`)

	return data
}
