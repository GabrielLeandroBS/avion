import Axios, { AxiosInstance } from 'axios'
import { VITE_VERCEL_URL } from '../../global/constants'

export const Api: AxiosInstance = Axios.create({
	baseURL: `${VITE_VERCEL_URL}/api`,
})
