import React from "react";
import { useQuery } from "react-query";
import LoaderSpinner from "../../../../shared/Navbar/LoaderSpinner/LoaderSpinner";

const AllBuyers = () => {
  const { isLoading, data: buyers } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(`http://localhost:5000/buyers-all`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div>
      <h3>All buyers</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((seller, i) => (
              <tr key={seller._id} className="hover">
                <th>{i + 1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;
