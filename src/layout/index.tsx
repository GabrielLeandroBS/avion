import React from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from '../components/footer'
import Header from '../components/header'

import { LayoutProps } from '../types/layout'

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	return (
		<>
			<ToastContainer />
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}
