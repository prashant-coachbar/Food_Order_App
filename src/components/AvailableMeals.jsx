import { useContext, useState } from "react";
import Meals from "./Meals";
import { useEffect } from "react";
import { CartContext } from "../App";

export default function AvailableMeals() {
  const { setAvailableMeals } = useContext(CartContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  // console.log(availableMeals);
  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const response = await fetch("https://api.render.com/deploy/srv-cqk6t2iju9rs738hgatg?key=Z4HejqYR-iM/meals");
        const resData = await response.json();
        // console.log(resData);
        if (!response.ok) {
          throw new Error("Failed to Fetch Meals");
        }
        setAvailableMeals(resData);
      } catch (error) {
        setError(error);
      }
      setIsFetching(false);
    }
    fetchMeals();
  }, []);

  if (error) {
    alert(`An Error Ocurred.     Message: ${error.message}`);
  }

  return <Meals isFetching={isFetching} />;
}
