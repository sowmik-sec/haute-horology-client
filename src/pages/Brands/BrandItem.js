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
          <div className="card-actions">
            <h3 className="text-xl">Original Price:${item.oPrice}</h3>
            <h3 className="text-xl">Resell Price: ${item.rPrice}</h3>
          </div>
          <div className="card-actions justify-around">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandItem;
