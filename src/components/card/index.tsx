import 'react-lazy-load-image-component/src/effects/blur.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { CardProductProps } from '../../types/card/product'

const CardProduct: React.FC<CardProductProps> = ({ title, price, image, slug, isLoading }: CardProductProps) => {
	return (
		<article className='c-card c-card__product'>
			<Link to={isLoading ? '/' : `/details/${slug}`} className='card__wrapper' aria-label='link to product item'>
				<figure className='c-card__image'>
					{isLoading ? (
						<Skeleton height={'100%'} />
					) : (
						<LazyLoadImage alt='Image card product' src={`${image}`} effect='blur' />
					)}
				</figure>
				<section>
					<h2 className='c-card__title'>{isLoading ? <Skeleton height={40} /> : title}</h2>
					<p className='c-card__price'>
						{isLoading ? (
							<Skeleton height={30} />
						) : (
							<NumericFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'US$ '} />
						)}
					</p>
				</section>
			</Link>
		</article>
	)
}

export default CardProduct
