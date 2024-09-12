import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStoredRestaurants } from "../../redux/restaurants/restaurantsSlice";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchStoredRestaurants());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      {list.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList
