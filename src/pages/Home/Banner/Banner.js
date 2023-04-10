import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex justify-around md:flex-row flex-col-reverse items-center mx-5 mt-10 banner h-[500px]">
      <div className="w-1/2">
        <h1 className="md:text-5xl text-2xl font-bold">
          Upgrade Your Watch Collection: Buy and Sell Pre-Owned Luxury
          Timepieces
        </h1>
        <Link to={`/brands`}>
          <button className="btn btn-primary mt-3">Get Started</button>
        </Link>
      </div>
      <div>
        <img
          src="https://www.thehourglass.com/wp-content/uploads/sites/15/2016/02/Displaying-the-luxury-Rolex-Submariner-collection-in-Basel.jpg"
          alt=""
          className="rounded-xl w-[500px]"
        />
      </div>
    </div>
  );
};

export default Banner;
