import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { CardProductProps } from '../../../types/card/product';
import { REACT_APP_BASE_URL } from '../../../../global/constants';

const CardProduct: React.FC<CardProductProps> = ({
  title,
  price,
  image,
  slug,
  isLoading,
}: CardProductProps) => {
  return (
    <article className="c-card c-card__product">
      <Link to={isLoading ? '/' : `/details/${slug}`} className="card__wrapper">
        <figure className="c-card__image">
          {isLoading ? (
            <Skeleton height={'100%'} />
          ) : (
            <img
              src={`${REACT_APP_BASE_URL}${image}`}
              alt="Image card product"
            />
          )}
        </figure>
        <section>
          <h2 className="c-card__title">{isLoading ? <Skeleton /> : title}</h2>
          <p className="c-card__price">
            {isLoading ? (
              <Skeleton />
            ) : (
              <NumericFormat
                value={price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'US$ '}
              />
            )}
          </p>
        </section>
      </Link>
    </article>
  );
};

export default CardProduct;
