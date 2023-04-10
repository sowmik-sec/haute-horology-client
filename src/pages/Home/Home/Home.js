import React from "react";
import Banner from "../Banner/Banner";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import FeaturedBrands from "../FeaturedBrands/FeaturedBrands";

const Home = () => {
  return (
    <div>
      <Banner />
      <AdvertisedItems />
      <FeaturedBrands />
    </div>
  );
};

export default Home;
