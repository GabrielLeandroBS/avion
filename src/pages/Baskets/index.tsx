import 'react-widgets/scss/styles.scss';
import 'rsuite/dist/rsuite.min.css';
import { NumericFormat } from 'react-number-format';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import React, { useEffect, useState } from 'react';

import { Layout } from '../../layout';
import { ProductInCart, RemoveProductInCart } from '../../types/productInCart';
import { REACT_APP_BASE_URL } from '../../../global/constants';
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
  }: RemoveProductInCart) =>
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
      <section className="baskets">
        <div className="baskets__container">
          <header className="baskets__wrapper baskets__header">
            <div>Product</div>
            <div className="baskets__price">Total price</div>
          </header>

          {getProductsInCart.length <= 0 ? (
            <div className="baskets__empty">
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
              }: ProductInCart) => (
                <div key={price} className="baskets__wrapper">
                  <div key={title} className="baskets__product">
                    <figure className="baskets__figure">
                      <img
                        src={`${REACT_APP_BASE_URL}${image}`}
                        alt="Image baskets"
                      />
                    </figure>

                    <div>
                      <h2 className="baskets__title">{title}</h2>
                      <p className="baskets__description">{`${description.slice(
                        0,
                        80
                      )}. . .`}</p>
                      <p className="baskets__rating">
                        {`${quantity} x `}
                        <NumericFormat
                          value={price.toFixed(2)}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'US$ '}
                        />
                      </p>

                      <div className="baskets__actions">
                        <Whisper
                          placement="bottomStart"
                          trigger="click"
                          speaker={
                            <Popover arrow={false}>
                              <div
                                className="baskets__remove"
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
                          <ButtonPopover>Click</ButtonPopover>
                        </Whisper>
                      </div>
                    </div>
                  </div>

                  <div className="baskets__price">
                    {
                      <NumericFormat
                        value={(price * quantity).toFixed(2)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'US$ '}
                      />
                    }
                  </div>

                  <div className="baskets__actions baskets__actions--desktop">
                    <Whisper
                      placement="bottomEnd"
                      trigger="click"
                      speaker={
                        <Popover arrow={false}>
                          <div
                            className="baskets__remove"
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

          <footer className="baskets__footer">
            <span className="baskets__span">
              See prices and rates at checkout.
            </span>

            <div className="baskets__content">
              <div className="baskets__subtotal">
                <span>Subtotal</span>
                <NumericFormat
                  value={totalQuantity.toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'US$ '}
                />
              </div>

              <div className="baskets__buttons">
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
