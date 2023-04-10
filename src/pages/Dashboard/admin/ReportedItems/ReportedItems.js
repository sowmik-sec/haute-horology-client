import React from "react";
import { useQuery } from "react-query";
import LoaderSpinner from "../../../../shared/Navbar/LoaderSpinner/LoaderSpinner";

const ReportedItems = () => {
  const { isLoading, data: reported } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(`http://localhost:5000/reported-items`, {
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
      <h3>Reported Items</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Model</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {reported?.map((rp, i) => (
              <tr key={rp._id} className="hover">
                <th>{i + 1}</th>
                <td>{rp.model}</td>
                <td>{rp.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedItems;
