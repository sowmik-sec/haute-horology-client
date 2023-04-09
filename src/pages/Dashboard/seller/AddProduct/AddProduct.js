import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddProduct = (data) => {
    const watch = {
      sellerEmail: user.email,
      model: data.model,
      watchImg: data.watchImg,
      rPrice: data.rPrice,
      oPrice: data.oPrice,
      condition: data.condition,
      mobile: data.mobile,
      location: data.location,
      brand: data.brand,
      description: data.description,
      purchase: data.purchase,
    };
    fetch(`http://localhost:5000/watches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(watch),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Watch added successfully");
          navigate("/dashboard/my-watches");
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(handleAddProduct)} className="my-10 mx-10">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Watch Model</span>
        </label>
        <input
          type="text"
          placeholder="Watch Model"
          {...register("model")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Photo URL</span>
        </label>
        <input
          type="text"
          placeholder="Photo URL"
          {...register("watchImg")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Original Price</span>
        </label>
        <input
          type="text"
          placeholder="Original Price"
          {...register("oPrice")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Resell Price</span>
        </label>
        <input
          type="text"
          placeholder="Resell Price"
          {...register("rPrice")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Watch Condition</span>
        </label>
        <input
          type="text"
          placeholder="Watch Condition"
          {...register("condition")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Mobile Number</span>
        </label>
        <input
          type="text"
          placeholder="Mobile No."
          {...register("mobile")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          placeholder="Location"
          {...register("location")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Brand</span>
        </label>
        <input
          type="text"
          placeholder="Brand"
          {...register("brand")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          type="text"
          placeholder="Description"
          {...register("description")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Year of purchase</span>
        </label>
        <input
          type="text"
          placeholder="Year of purchase"
          {...register("purchase")}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <input type="submit" value="Add Watch" className="btn btn-primary mt-5" />
    </form>
  );
};

export default AddProduct;
