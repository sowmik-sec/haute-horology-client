import React, { useEffect, useState } from "react";
import BrandItem from "../Brands/BrandItem";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";

const WatchCollections = () => {
  const [watches, setWatches] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/watches/all`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWatches(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <LoaderSpinner />;
  }
  return (
    <div>
      <h2 className="text-4xl">Our Collection</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10">
        {watches.map((watch) => (
          <BrandItem key={watch._id} item={watch} />
        ))}
      </div>
    </div>
  );
};

export default WatchCollections;
