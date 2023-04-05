import React from "react";

const Brand = ({ brand }) => {
  const { brand: name, photoURL } = brand;
  return (
    <div>
      <div className="card mx-auto w-96 h-96 bg-base-100 shadow-xl">
        <figure>
          <img src={photoURL} alt="Watches" className="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Brand;
