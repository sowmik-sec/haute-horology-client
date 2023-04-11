import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { useQuery } from "react-query";
import BookingModal from "./BookingModal/BookingModal";
import { toast } from "react-hot-toast";
import VerifyTick from "../../shared/VerifyTick/VerifyTick";

const BrandItemDetails = () => {
  const [controlModal, setControlModal] = useState(true);
  const [seller, setSeller] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/");
  const navigate = useNavigate();
  const watchId = path[path.length - 1];
  const { isLoading, data: watchDetails } = useQuery({
    queryKey: ["single-brand", watchId],
    queryFn: () =>
      fetch(
        `https://houte-horology-server.vercel.app/watches/single-brand/${watchId}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => res.json()),
  });
  useEffect(() => {
    fetch(
      `https://houte-horology-server.vercel.app/user?email=${watchDetails?.sellerEmail}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSeller(data);
      });
  }, [watchDetails?.sellerEmail]);

  if (isLoading) {
    return <LoaderSpinner />;
  }
  const handleReport = (id) => {
    fetch(
      `https://houte-horology-server.vercel.app/watches/single-brand/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Item reported to admin");
          navigate("/brands");
        }
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={watchDetails.watchImg} alt="" className="h-96 rounded-xl" />
          <div>
            <h1 className="text-5xl font-bold">{watchDetails.model}</h1>
            <div className="py-6">
              <div className="flex items-center">
                <p>Seller: {watchDetails?.sellerName}</p>
                <span className="ml-1">
                  {seller?.isVerified && <VerifyTick />}
                </span>
              </div>
              <p>Original Price: ${watchDetails.oPrice}</p>
              <p>Resell Price: ${watchDetails.rPrice}</p>
              <p>Purchased: {watchDetails.purchase}</p>
            </div>
            <label
              htmlFor="booking-modal"
              className="btn btn-primary text-white"
            >
              Book Now
            </label>
            <button
              onClick={() => handleReport(watchId)}
              className="ml-5 btn btn-secondary"
            >
              Report Item
            </button>
          </div>
        </div>
      </div>
      <p className="w-2/3 mx-auto my-6">{watchDetails.description}</p>
      {controlModal && (
        <BookingModal watch={watchDetails} setControlModal={setControlModal} />
      )}
    </div>
  );
};

export default BrandItemDetails;
