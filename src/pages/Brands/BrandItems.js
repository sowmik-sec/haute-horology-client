import React from "react";
import { useLoaderData } from "react-router-dom";
import BrandItem from "./BrandItem";

const BrandItems = () => {
  const items = useLoaderData();
  console.log(items);
  return (
    <div className="flex flex-wrap justify-around mt-10">
      {items.map((item) => (
        <BrandItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default BrandItems;
