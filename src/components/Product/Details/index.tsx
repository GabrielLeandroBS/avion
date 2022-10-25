import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import NumberPicker from 'react-widgets/NumberPicker';

import Button from '../../Button/Link';
import { getDetails } from '../../../services/details.service';
import { useParams } from 'react-router-dom';
import {
  DetailsItemProps,
  DetailsInitalStateProps,
} from '../../../types/details';
import { NumericFormat } from 'react-number-format';
import { REACT_APP_BASE_URL } from '../../../../global/constants';
import ButtonAddToCart from '../../Button/AddToCart';
import { useCart } from '../../../hooks/useCart';
import { useCartProps } from '../../../types/context';
import { ProductInCart } from '../../../types/productInCart';
import { toast, ToastContainer } from 'react-toastify';

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
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { slug } = useParams();
  const getCart = useCart((state: useCartProps) => state.cartContent);
  const addToCart = useCart((state: useCartProps) => state.addTocart);
  const updateCart = useCart((state: useCartProps) => state.updateCart);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getDetails(slug);

      data.data.find((element: DetailsItemProps) => {
        const { attributes } = element;
        setDetails(attributes);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCartProducts = ({
    slug,
    image,
    price,
    quantity,
    stripe,
    title,
    description,
  }: ProductInCart) => {
    const findProductEqual = getCart.findIndex(
      (item: { slug: string }) => item.slug === slug
    );

    if (findProductEqual !== -1) {
      getCart[findProductEqual].quantity = quantity;
      updateCart(
        { slug, image, price, quantity, stripe, title, description },
        getCart
      );
      toast('🦄 Item already addeds!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast('🦄 Item included in cart!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      addToCart({
        slug,
        image,
        price,
        quantity,
        stripe,
        title,
        description,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getProductDetails();
    })();
  }, [slug]);

  return (
    <section className="c-details">
      <ToastContainer />
      <div className="c-details__container">
        <figure className="c-details__figure">
          <img
            src={`${REACT_APP_BASE_URL}${details.image.data.attributes.url}`}
            alt="product image"
          />
        </figure>

        <section className="c-details__content">
          <h1 className="c-details__title">{details.title}</h1>
          <p className="c-details__price">
            <NumericFormat
              value={details.price.toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'US$ '}
            />
          </p>

          <div>
            <h2 className="c-details__subtitle">Product description</h2>
            <p className="c-details__description">{details.description}</p>
          </div>

          <NumberPicker
            defaultValue={1}
            onChange={(value) => {
              setQuantity(Number(value));
            }}
          />

          <div className="c-details__buttons">
            <div
              onClick={() =>
                handleCartProducts({
                  slug: details.slug,
                  image: details.image.data.attributes.url,
                  price: details.price,
                  quantity: quantity,
                  stripe: details.stripe,
                  title: details.title,
                  description: details.description,
                })
              }
            >
              <ButtonAddToCart />
            </div>

            <Button title={'Go to Cart'} href={'/baskets'} color={'white'} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Details;
