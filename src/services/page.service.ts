import { PageProps } from '../types/page'
import { Api } from './api.service'

export const getPage = async ({ page }: PageProps) => {
	const { data } = await Api.get(`${page}?populate=deep`)
	return data
}
