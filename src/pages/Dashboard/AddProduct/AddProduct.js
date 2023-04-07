import React from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const handleAddProduct = (data) => {
    const watch = {
      model: data.model,
      price: data.price,
      condition: data.condition,
      mobile: data.mobile,
      location: data.location,
      brand: data.brand,
      description: data.description,
      purchase: data.purchase,
    };
    console.log(watch);
  };
  return (
    <form onSubmit={handleSubmit(handleAddProduct)} className="my-10">
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
          <span className="label-text">Price</span>
        </label>
        <input
          type="text"
          placeholder="Price"
          {...register("price")}
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
