import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { useQuery } from "react-query";
import LoaderSpinner from "../../../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { toast } from "react-hot-toast";
import useTitle from "../../../../hooks/useTitle";

const MyWatches = () => {
  //   const [watches, setWatches] = useState([]);
  useTitle("My Watches");
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    data: watches,
    refetch,
  } = useQuery({
    queryKey: ["watches", user.email],
    queryFn: () =>
      fetch(
        `https://houte-horology-server.vercel.app/watches?email=${user.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  console.log(watches);
  const handleAdvertise = (id) => {
    fetch(`https://houte-horology-server.vercel.app/watches/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
        }
      });
  };
  const handleDelete = (id) => {
    fetch(`https://houte-horology-server.vercel.app/watches/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Watch Deleted");
          refetch();
        }
      });
  };
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table w-full">
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
                {watch?.status !== "sold" && watch?.isAdvertised !== true ? (
                  <button
                    onClick={() => handleAdvertise(watch._id)}
                    className="btn btn-xs btn-primary"
                  >
                    Advertise
                  </button>
                ) : (
                  <p className="text-emerald-600">Advertised</p>
                )}
              </td>
              <td>
                {watch?.status !== "sold" ? (
                  <button
                    onClick={() => handleDelete(watch._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
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
