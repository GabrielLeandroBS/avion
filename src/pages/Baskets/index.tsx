import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-widgets/scss/styles.scss';
import 'rsuite/dist/rsuite.min.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NumericFormat } from 'react-number-format';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import React, { useEffect, useState } from 'react';

import { Layout } from '../../layout';
import { ProductInCartProps, RemoveProductInCartProps } from '../../types/cart';
import { useCart } from '../../hooks/useCart';
import { useCartProps } from '../../types/context';
import Checkout from '../../components/Button/Checkout';
import Dots from '../../assets/sprite-svg/dots.svg';

const Baskets: React.FC = () => {
  const [totalQuantity, setTotalQuantity] = useState<number>(1);

  const [disabled, setDisabled] = useState<boolean>(false);

  const getProductsInCart = useCart((state: useCartProps) => state.cartContent);
  const removeProductInCart = useCart(
    (state: useCartProps) => state.removeFromCart
  );

  const handleRemoveProductInCart = ({
    slug,
    image,
    price,
    description,
  }: RemoveProductInCartProps) =>
    removeProductInCart({
      slug,
      image,
      price,
      description,
    });

  useEffect(() => {
    const getQuantityItems = getProductsInCart.reduce(
      (acc: number, obj: { price: number; quantity: number }) => {
        return acc + obj.price * obj.quantity;
      },
      0
    );

    getProductsInCart.length <= 0 ? setDisabled(true) : setDisabled(false);
    setTotalQuantity(getQuantityItems);
  }, [getProductsInCart]);

  return (
    <Layout>
      <section className="p-baskets">
        <div className="p-baskets__container">
          <header className="p-baskets__wrapper p-baskets__header">
            <div>Product</div>
            <div className="p-baskets__price">Total price</div>
          </header>

          {getProductsInCart.length <= 0 ? (
            <div className="p-baskets__empty">
              <span>There are no items in the cart.</span>
            </div>
          ) : (
            getProductsInCart.map(
              ({
                title,
                image,
                description,
                price,
                slug,
                quantity,
              }: ProductInCartProps) => (
                <div key={price} className="p-baskets__wrapper">
                  <div key={title} className="p-baskets__product">
                    <figure className="p-baskets__figure">
                      <LazyLoadImage
                        alt="Image baskets"
                        src={`${image}`}
                        effect="blur"
                      />
                    </figure>

                    <div>
                      <h2 className="p-baskets__title">{title}</h2>
                      <p className="p-baskets__description">{`${description}`}</p>
                      <p className="p-baskets__rating">
                        {`${quantity} x `}
                        <NumericFormat
                          value={price.toFixed(2)}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'US$ '}
                        />
                      </p>

                      <div className="p-baskets__actions">
                        <Whisper
                          placement="bottomEnd"
                          trigger="click"
                          speaker={
                            <Popover arrow={false}>
                              <div
                                className="p-baskets__remove"
                                onClick={() =>
                                  handleRemoveProductInCart({
                                    description,
                                    image,
                                    price,
                                    slug,
                                  })
                                }
                              >
                                Remove Item
                              </div>
                            </Popover>
                          }
                        >
                          <ButtonPopover>
                            <img src={Dots} alt="Dots" />
                          </ButtonPopover>
                        </Whisper>
                      </div>
                    </div>
                  </div>

                  <div className="p-baskets__price">
                    {
                      <NumericFormat
                        value={(price * quantity).toFixed(2)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'US$ '}
                      />
                    }
                  </div>

                  <div className="p-baskets__actions p-baskets__actions--desktop">
                    <Whisper
                      placement="bottomEnd"
                      trigger="click"
                      speaker={
                        <Popover arrow={false}>
                          <div
                            className="p-baskets__remove"
                            onClick={() =>
                              handleRemoveProductInCart({
                                description,
                                image,
                                price,
                                slug,
                              })
                            }
                          >
                            Remove Item
                          </div>
                        </Popover>
                      }
                    >
                      <ButtonPopover>
                        <img src={Dots} alt="Dots" />
                      </ButtonPopover>
                    </Whisper>
                  </div>
                </div>
              )
            )
          )}

          <footer className="p-baskets__footer">
            <span className="p-baskets__span">
              See prices and rates at checkout.
            </span>

            <div className="p-baskets__content">
              <div className="p-baskets__subtotal">
                <span>Subtotal</span>
                <NumericFormat
                  value={totalQuantity.toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'US$ '}
                />
              </div>

              <div className="p-baskets__buttons">
                <Checkout items={getProductsInCart} isDisabled={disabled} />
              </div>
            </div>
          </footer>
        </div>
      </section>
    </Layout>
  );
};

export default Baskets;
