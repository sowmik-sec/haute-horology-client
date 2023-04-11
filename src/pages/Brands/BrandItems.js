import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import BrandItem from "./BrandItem";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import useTitle from "../../hooks/useTitle";

const BrandItems = () => {
  useTitle("Brand Items");
  const items = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <LoaderSpinner />;
  }
  return (
    <div className="flex flex-wrap justify-around my-10">
      {items.map((item) => (
        <BrandItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default BrandItems;
