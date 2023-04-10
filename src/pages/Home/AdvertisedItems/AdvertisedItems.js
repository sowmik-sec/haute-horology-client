import React from "react";
import { useQuery } from "react-query";
import BrandItem from "../../Brands/BrandItem";
import LoaderSpinner from "../../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { Link } from "react-router-dom";

const AdvertisedItems = () => {
  const { isLoading, data: advertised } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(`http://localhost:5000/advertised-items-3`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div>
      {advertised && (
        <>
          <h3 className="text-3xl my-5 ml-3 font-bold">Advertised Items</h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {advertised.map((item) => (
              <BrandItem key={item._id} item={item} />
            ))}
          </div>
          <div className="text-center">
            <Link to={`/advertised-all`}>
              <button className="btn btn-primary mt-3">See All</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertisedItems;
