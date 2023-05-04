import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/products.service";
import { ProductsListProps } from "../../../types/products";
import CardProduct from "../../card";

const ListingProducts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [ListingProducts, setListingProducts] = useState<ProductsListProps>([
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
  ]);

  const getListingProducts = async () => {
    try {
      const data = await getProducts();
      setListingProducts(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getListingProducts();
    })();
  }, []);

  return (
    <section className="c-products">
      <div className="c-products__wrapper c-products__wrapper--columns-list">
        {loading
          ? Array.from({ length: 12 }, (item = length, index) => (
              <CardProduct
                key={`list-products-${item}-${index}`}
                isLoading={true}
              />
            ))
          : ""}
        {!loading &&
          ListingProducts.map(({ attributes }) => (
            <CardProduct
              key={`list-products-${attributes.title}`}
              image={attributes.image.data[0].attributes.url}
              title={attributes.title}
              price={attributes.price}
              slug={attributes.slug}
              isLoading={loading}
            />
          ))}
      </div>
    </section>
  );
};

export default ListingProducts;
