import React from "react";
import { useLoaderData } from "react-router-dom";

const BrandItems = () => {
  const items = useLoaderData();
  console.log(items);
  return <div></div>;
};

export default BrandItems;
