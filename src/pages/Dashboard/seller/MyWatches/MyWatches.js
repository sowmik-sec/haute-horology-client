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
  return <div></div>;
};

export default MyWatches;
