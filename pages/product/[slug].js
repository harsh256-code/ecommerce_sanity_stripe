import React from "react";
import { client, urlFor } from "../../lib/clients";
const ProductDetails = ({ products, product }) => {
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);
  const bannerquery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerquery);
  return {
    props: {
      products,
      product,
    },
  };
};
export default ProductDetails;
