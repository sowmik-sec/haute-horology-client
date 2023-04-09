import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { useQuery } from "react-query";

const BrandItemDetails = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const watchId = path[path.length - 1];
  const { isLoading, data: watchDetails } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(`http://localhost:5000/watches/single-brand/${watchId}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={watchDetails.watchImg} alt="" className="h-96 rounded-xl" />
          <div>
            <h1 className="text-5xl font-bold">{watchDetails.model}</h1>
            <div className="py-6">
              <p>Seller: {watchDetails.sellerName}</p>
              <p>Original Price: ${watchDetails.oPrice}</p>
              <p>Resell Price: ${watchDetails.rPrice}</p>
              <p>Purchased: {watchDetails.purchase}</p>
            </div>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>
      <p className="w-2/3 mx-auto my-6">{watchDetails.description}</p>
    </div>
  );
};

export default BrandItemDetails;
