import React from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { useQuery } from "react-query";
import useTitle from "../../hooks/useTitle";

const Brands = () => {
  //   const [brands, setBrands] = useState([]);
  useTitle("Brands");
  const { isLoading, data: brands } = useQuery({
    queryKey: "brands",
    queryFn: () =>
      fetch(`https://houte-horology-server.vercel.app/brands`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="my-14 mx-14 grid gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {brands &&
        brands.map((brand) => (
          <Link key={brand._id} to={`/brands/${brand.brand}`}>
            <Brand brand={brand} />
          </Link>
        ))}
    </div>
  );
};

export default Brands;
