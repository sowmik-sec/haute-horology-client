import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../context/AuthProvider";
import LoaderSpinner from "../../../../shared/Navbar/LoaderSpinner/LoaderSpinner";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, data: orders } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/my-orders?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  console.log(orders);
  if (isLoading) {
    return <LoaderSpinner />;
  }
  const handleDelete = (order) => {
    fetch(`http://localhost:5000/my-orders/${order._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
        }
      });
  };
  return (
    <div>
      <h1 className="text-4xl">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Model</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>{order.model}</td>
                <td>{order.price}</td>
                <td>
                  {order.paymentStatus === "unpaid" ? (
                    <button className="btn btn-primary btn-sm">Pay</button>
                  ) : (
                    <p className="text-green-400">Paid</p>
                  )}
                </td>
                <td>
                  {order.paymentStatus === "unpaid" ? (
                    <button
                      onClick={() => handleDelete(order)}
                      className="btn btn-error btn-sm"
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
    </div>
  );
};

export default MyOrders;
