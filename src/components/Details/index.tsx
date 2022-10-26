import React, { useEffect, useState } from 'react';
import NumberPicker from 'react-widgets/NumberPicker';

import Button from '../Button/Link';
import { getDetails } from '../../services/details.service';
import { useParams } from 'react-router-dom';
import { DetailsItemProps, DetailsInitalStateProps } from '../../types/details';
import { NumericFormat } from 'react-number-format';
import { REACT_APP_BASE_URL } from '../../../global/constants';
import ButtonAddToCart from '../Button/AddToCart';
import Skeleton from 'react-loading-skeleton';

const Details: React.FC = () => {
  const [details, setDetails] = useState<DetailsInitalStateProps>({
    description: '',
    price: 0,
    publishedAt: '',
    slug: '',
    title: '',
    quantity: 1,
    image: {
      data: {
        attributes: {
          url: '',
        },
      },
    },
    stripe: '',
  });
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();

  const getProductDetails = async () => {
    try {
      const { data } = await getDetails(slug);
      data.data.find((element: DetailsItemProps) => {
        const { attributes } = element;
        setDetails(attributes);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getProductDetails();
    })();
  }, [slug]);

  return (
    <section className="c-details">
      <div className="c-details__container">
        <figure className="c-details__figure">
          {loading ? (
            <Skeleton height={'100%'} width={'100%'} />
          ) : (
            <img
              src={`${REACT_APP_BASE_URL}${details.image.data.attributes.url}`}
              alt="product image"
            />
          )}
        </figure>

        <section className="c-details__content">
          <h1 className="c-details__title">
            {loading ? <Skeleton height={80} /> : details.title}
          </h1>
          <p className="c-details__price">
            {loading ? (
              <Skeleton height={40} width={100} />
            ) : (
              <NumericFormat
                value={details.price.toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'US$ '}
              />
            )}
          </p>
          <div>
            <h2 className="c-details__subtitle">
              {loading ? <Skeleton height={40} /> : details.title}
            </h2>
            <p className="c-details__description">
              {loading ? <Skeleton height={80} /> : details.description}
            </p>
          </div>

          {loading ? (
            <Skeleton height={40} width={100} />
          ) : (
            <NumberPicker
              defaultValue={1}
              onChange={(value) => {
                setQuantity(Number(value));
              }}
            />
          )}

          <div className="c-details__buttons">
            <div>
              {loading ? (
                <Skeleton height={56} />
              ) : (
                <ButtonAddToCart
                  product={{
                    slug: details.slug,
                    image: details.image.data.attributes.url,
                    price: details.price,
                    quantity: quantity,
                    stripe: details.stripe,
                    title: details.title,
                    description: details.description,
                  }}
                />
              )}
            </div>
            {loading ? (
              <Skeleton height={56} />
            ) : (
              <Button title={'Go to Cart'} href={'/baskets'} color={'white'} />
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Details;
