import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { getPage } from "../../../services/page.service";
import { highlightedProps } from "../../../types/highlighted";
import ButtonLink from "../../button/link";
import CardProduct from "../../card";

const ProductsHighlighted: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [highlightedProduct, setHighlightedProduct] =
    useState<highlightedProps>({
      title: "",
      products: {
        data: [
          {
            attributes: {
              price: "",
              slug: "",
              stripe: "",
              title: "",
              description: "",
              image: {
                data: {
                  [0]: {
                    attributes: {
                      url: "/",
                    },
                  },
                },
              },
            },
          },
        ],
      },
      button: "",
      location: "",
    });

  const getHighlightedProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getPage({
        page: "home",
      });
      setHighlightedProduct(data.attributes.Highlighted);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getHighlightedProduct();
    })();
  }, []);

  const { title, products, button, location } = highlightedProduct;
  
  return (
    <section className="c-products">
      <h2 className="c-products__title">
        {loading ? <Skeleton height={50} /> : title}
      </h2>
      <div className="c-products__wrapper">
        {loading
          ? Array.from({ length: 4 }, (item, index) => (
              <CardProduct key={`highlighted-${index}`} isLoading={true} />
            ))
          : ""}
        {!loading &&
          products.data.map(({ attributes }) => (
            <CardProduct
              key={`highlighted-${attributes.title}`}
              image={attributes.image.data[0].attributes.url}
              title={attributes.title}
              price={attributes.price}
              slug={attributes.slug}
              isLoading={loading}
            />
          ))}
      </div>

      <ButtonLink title={button} href={location} isLoading={loading} />
    </section>
  );
};

export default ProductsHighlighted;
