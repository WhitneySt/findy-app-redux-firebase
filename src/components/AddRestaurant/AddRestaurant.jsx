import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRestaurantProfile } from "../../redux/restaurants/restaurantsSlice";

const AddRestaurant = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRestaurantProfile(username));
    setUsername("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Instagram username"
      />
      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default AddRestaurant;
