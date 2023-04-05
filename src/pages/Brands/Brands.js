import React from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { useQuery } from "react-query";

const Brands = () => {
  //   const [brands, setBrands] = useState([]);

  const {
    isLoading,
    isError,
    data: brands,
    error,
    refetch,
  } = useQuery({
    queryKey: "brands",
    queryFn: () =>
      fetch(`http://localhost:5000/brands`).then((res) => res.json()),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="my-14 mx-14 grid gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {brands &&
        brands.map((brand) => (
          <Link key={brand._id} to={`/brands/${brand._id}`}>
            <Brand brand={brand} />
          </Link>
        ))}
    </div>
  );
};

export default Brands;
