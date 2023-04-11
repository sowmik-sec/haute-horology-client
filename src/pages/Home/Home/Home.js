import React from "react";
import Banner from "../Banner/Banner";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import FeaturedBrands from "../FeaturedBrands/FeaturedBrands";
import useTitle from "../../../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner />
      <AdvertisedItems />
      <FeaturedBrands />
    </div>
  );
};

export default Home;
