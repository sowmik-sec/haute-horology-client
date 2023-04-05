import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Brand from "./Brand";

const Brands = () => {
  const brands = useLoaderData();
  return (
    <div className="my-14 mx-14 grid gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {brands &&
        brands.map((brand) => (
          <Link key={brand.id} to={`/brands/${brand.id}`}>
            <Brand brand={brand} />
          </Link>
        ))}
    </div>
  );
};

export default Brands;
