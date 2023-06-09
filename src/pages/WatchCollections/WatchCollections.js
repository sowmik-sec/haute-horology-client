import React, { useEffect, useState } from "react";
import BrandItem from "../Brands/BrandItem";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import useTitle from "../../hooks/useTitle";

const WatchCollections = () => {
  useTitle("Watch Collection");
  const [watches, setWatches] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://houte-horology-server.vercel.app/watches/all`, {
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
    <div className="my-10">
      <h2 className="text-4xl ml-2">Our Collection</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10">
        {watches.map((watch) => (
          <BrandItem key={watch._id} item={watch} />
        ))}
      </div>
    </div>
  );
};

export default WatchCollections;
