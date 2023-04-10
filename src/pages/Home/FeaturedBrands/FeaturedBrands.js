import React from "react";
import { useQuery } from "react-query";
import LoaderSpinner from "../../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { Link } from "react-router-dom";
import Brand from "../../Brands/Brand";

const FeaturedBrands = () => {
  const { isLoading, data: featuredBrands } = useQuery({
    queryKey: ["featured-brand"],
    queryFn: () =>
      fetch(`http://localhost:5000/featured-brand`).then((res) => res.json()),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="my-10">
      {featuredBrands && (
        <>
          <h3 className="text-3xl my-5 ml-3 font-bold">Featured Brands</h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {featuredBrands.map((brand) => (
              <Brand key={brand._id} brand={brand} />
            ))}
          </div>
          <div className="text-center">
            <Link to={`/brands`}>
              <button className="btn btn-primary mt-3">See All</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedBrands;
