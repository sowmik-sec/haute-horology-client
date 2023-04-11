import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  useEffect(() => {
    fetch(`https://houte-horology-server.vercel.app/users/buyer/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsBuyerLoading(false);
        setIsBuyer(data.isBuyer);
      });
  }, [email]);
  return [isBuyer, isBuyerLoading];
};
export default useBuyer;
