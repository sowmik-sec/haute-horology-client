import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Houte Horology Hub`;
  }, [title]);
};
export default useTitle;
