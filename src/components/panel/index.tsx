import React from 'react'

import { PanelProps } from '../../types/panel'

const Panel: React.FC<PanelProps> = ({ direction, title, description, image, actions }: PanelProps) => {
	return (
		<section className={`c-panel c-panel--direction-${direction}`}>
			<div className='c-panel__content'>
				<section>
					<h2 className='c-panel__title'>{title}</h2>
					<p className='c-panel__description' dangerouslySetInnerHTML={{ __html: description }} />
				</section>
				<div>{actions}</div>
			</div>
			<figure className='c-panel__figure'>
				<img src={image} alt='Panel Image' />
			</figure>
		</section>
	)
}

export default Panel
