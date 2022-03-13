import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetail = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;
  console.log("(Re-)Generating" + params.pid);

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { loadedProduct: product },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const data = await getData();

  let ids = data.products.map((product) => product.id);

  ids = ids.filter((id) => id === "p1" || id === "p2");

  const pathsWithparams = ids.map((id) => ({
    params: {
      pid: id,
    },
  }));

  //   paths: [
  //     {
  //       params: {
  //         pid: "p1",
  //       },
  //     },
  //   ]

  return {
    paths: pathsWithparams,
    fallback: true,
  };
};

export default ProductDetail;
