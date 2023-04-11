import React from "react";
import { useQuery } from "react-query";
import LoaderSpinner from "../../../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { toast } from "react-hot-toast";

const AllSellers = () => {
  const { isLoading, data: sellers } = useQuery({
    queryKey: ["sellers-all"],
    queryFn: () =>
      fetch(`http://localhost:5000/sellers-all`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  const handleVerify = (id) => {
    fetch(`http://localhost:5000/seller-verify/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Seller Verified");
        }
      });
  };
  return (
    <div>
      <h3>All sellers</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((seller, i) => (
              <tr key={seller._id} className="hover">
                <th>{i + 1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  {seller.isVerified ? (
                    <p className="text-green-600">Verified</p>
                  ) : (
                    <button
                      onClick={() => handleVerify(seller._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Verify Seller
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
