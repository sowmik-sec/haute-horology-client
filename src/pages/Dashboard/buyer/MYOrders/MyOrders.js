import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../context/AuthProvider";
import LoaderSpinner from "../../../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";

const MyOrders = () => {
  useTitle("My Orders");
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    data: orders,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: () =>
      fetch(
        `https://houte-horology-server.vercel.app/my-orders?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => res.json()),
  });
  console.log(orders);
  if (isLoading) {
    return <LoaderSpinner />;
  }
  const handleDelete = (order) => {
    fetch(`https://houte-horology-server.vercel.app/my-orders/${order._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          updateWatchStatus(order.watchId);
        }
      });
  };
  const updateWatchStatus = (id) => {
    fetch(`https://houte-horology-server.vercel.app/my-orders/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Order Deleted Successfully");
          refetch();
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
                <td>${order.price}</td>
                <td>
                  {order.paymentStatus === "unpaid" ? (
                    <Link to={`payment/${order._id}`}>
                      <button className="btn btn-primary btn-sm">Pay</button>
                    </Link>
                  ) : (
                    <p className="text-green-600">Paid</p>
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
