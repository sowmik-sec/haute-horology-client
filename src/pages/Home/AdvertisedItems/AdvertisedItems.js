import React, { useEffect, useState } from "react";
import BrandItem from "../../Brands/BrandItem";
import LoaderSpinner from "../../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { Link } from "react-router-dom";

const AdvertisedItems = () => {
  const [advertised, setAdvertised] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/advertised-items-3`)
      .then((res) => res.json())
      .then((data) => {
        setAdvertised(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="my-10">
      {advertised && (
        <>
          <h3 className="text-3xl my-5 ml-3 font-bold">Advertised Items</h3>
          <div className="grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {advertised.map((item) => (
              <BrandItem key={item._id} item={item} />
            ))}
          </div>
          <div className="text-center">
            <Link to={`/advertise-all`}>
              <button className="btn btn-primary mt-3">See All</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertisedItems;
