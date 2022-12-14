import React from 'react';

import { CardFeatureProps } from '../../../types/card/feature';

const CardFeature: React.FC<CardFeatureProps> = ({
  image,
  title,
  description,
}: CardFeatureProps) => {
  return (
    <section className="c-card c-card__feature">
      <figure className="c-card__image">
        <img src={image} alt='image card' />
      </figure>

      <section>
        <h2 className="c-card__title">{title}</h2>
        <p className="c-card__description">{description}</p>
      </section>
    </section>
  );
};

export default CardFeature;
