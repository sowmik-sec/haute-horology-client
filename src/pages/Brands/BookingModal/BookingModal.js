import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ watch, setControlModal }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleModal = (data) => {
    const soldDetails = {
      watchId: watch._id,
      buyerName: user.displayName,
      buyerEmail: user.email,
      buyerMobile: data.mobile,
      meetingLocation: data.meetingLocation,
      sellerName: watch.sellerName,
      sellerEmail: watch.sellerEmail,
      sellerMobile: watch.mobile,
      model: watch.model,
      brand: watch.brand,
      price: watch.rPrice,
    };
    fetch(`http://localhost:5000/watch/buy`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(soldDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setControlModal(false);
          updateWatchDetails(watch._id);
        }
      });
  };
  const updateWatchDetails = (id) => {
    fetch(`http://localhost:5000/watch/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/dashboard/my-orders");
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            X
          </label>
          <p className="text-lg font-bold">{watch.brand}</p>
          <form
            onSubmit={handleSubmit(handleModal)}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              value={user?.email}
              readOnly
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              value={watch.model}
              readOnly
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              value={watch.rPrice}
              readOnly
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              {...register("phone")}
              placeholder="Phone number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              {...register("meetingLocation")}
              placeholder="Meeting Location"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              className="w-full btn btn-accent input-bordered"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
