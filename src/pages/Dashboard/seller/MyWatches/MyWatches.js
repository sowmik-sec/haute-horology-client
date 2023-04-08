import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";

const MyWatches = () => {
  const [watches, setWatches] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:5000/watches?email=${user.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setWatches(data));
  }, [user.email]);
  console.log(watches);
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Model</th>
            <th>Price</th>
            <th>Status</th>
            <th>Advertise</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {watches.map((watch, i) => (
            <tr key={watch._id} className="hover">
              <th>{i + 1}</th>
              <td>{watch.model}</td>
              <td>${watch.price}</td>
              <td>
                {watch?.status === "sold" ? (
                  <p className="text-green-400">Sold</p>
                ) : (
                  <p>Available</p>
                )}
              </td>
              <td>
                {watch?.status !== "sold" && watch?.advertise !== true ? (
                  <button className="btn btn-xs btn-primary">Advertise</button>
                ) : (
                  ""
                )}
              </td>
              <td>
                {watch?.status !== "sold" ? (
                  <button className="btn btn-xs btn-error">Delete</button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyWatches;
