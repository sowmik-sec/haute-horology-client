import React, { useEffect, useState } from "react";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import BrandItem from "../Brands/BrandItem";

const AdvertiseAll = () => {
  const [advertised, setAdvertised] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/advertised-all-seller`)
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
        </>
      )}
    </div>
  );
};

export default AdvertiseAll;
