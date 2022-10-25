import React from 'react';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

import { CardProductProps } from '../../../types/card/product';
import { REACT_APP_BASE_URL } from '../../../../global/constants';

const CardProduct: React.FC<CardProductProps> = ({
  title,
  price,
  image,
  slug,
}: CardProductProps) => {
  return (
    <article className="c-card c-card__product">
      <Link to={`/details/${slug}`} className="card__wrapper">
        <figure className="c-card__image">
          <img src={`${REACT_APP_BASE_URL}${image}`} alt="Image card product" />
        </figure>
        <section>
          <h2 className="c-card__title">{title}</h2>
          <p className="c-card__price">
            <NumericFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'US$ '}
            />
          </p>
        </section>
      </Link>
    </article>
  );
};

export default CardProduct;
