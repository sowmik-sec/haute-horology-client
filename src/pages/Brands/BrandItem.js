import React from "react";

const BrandItem = ({ item }) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <figure>
          <img src={item.watchImg} alt="Shoes" className="h-60" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.model}</h2>
          <p>{item.description.slice(0, 30)}...</p>
          <div className="card-actions justify-around">
            <h3 className="text-3xl">${item.price}</h3>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandItem;
