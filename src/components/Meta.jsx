import React from "react";
import { Helmet } from "react-helmet-async";
const Meta = () => {
  return (
    <>
      <Helmet>
        <title>Home | ShopEase</title>

        <meta
          name="description"
          content="Discover premium products at affordable prices. Shop electronics, fashion, home essentials and more."
        />

        <meta
          name="keywords"
          content="ecommerce, online shopping, electronics, fashion, ShopEase"
        />

        <meta name="author" content="Your Name" />

        <meta property="og:title" content="ShopEase" />

        <meta
          property="og:description"
          content="Discover premium products at affordable prices."
        />

        <meta property="og:type" content="website" />
      </Helmet>
    </>
  );
};

export default Meta;
