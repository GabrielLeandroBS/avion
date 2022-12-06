import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import NumberPicker from 'react-widgets/NumberPicker';
import React, { useEffect, useState } from 'react';

import Button from '../Button/Link';
import { getDetails } from '../../services/details.service';
import { useParams } from 'react-router-dom';
import { DetailsItemProps, DetailsInitalStateProps } from '../../types/details';
import { NumericFormat } from 'react-number-format';
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
        [0]: {
          attributes: {
            url: '',
          },
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
            <LazyLoadImage
              alt="product image"
              src={`${details.image.data[0].attributes.url}`}
              effect="blur"
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
                    image: details.image.data[0].attributes.url,
                    price: details.price,
                    quantity: quantity,
                    stripe: details.stripe,
                    title: details.title,
                    description: details.description,
                  }}
                />
              )}
            </div>
            <Button
              title={'Go to Cart'}
              href={'/baskets'}
              color={'white'}
              isLoading={loading}
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Details;
