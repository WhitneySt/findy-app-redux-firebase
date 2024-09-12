import PropTypes from 'prop-types'

const RestaurantCard = ({ restaurant = {} }) => {
  return (
    <div className="restaurant-card">
      <img
        src={restaurant.profilePicUrlHD}
        alt={restaurant.fullName}
        className="profile-pic"
      />
      <h2>{restaurant.fullName}</h2>
      <p>@{restaurant.username}</p>
      <p>{restaurant.biography}</p>
      <div className="stats">
        <span>Posts: {restaurant.postsCount}</span>
        <span>Followers: {restaurant.followersCount}</span>
        <span>Following: {restaurant.followsCount}</span>
      </div>
      {restaurant.website && (
        <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
          Website
        </a>
      )}
    </div>
  );
};

RestaurantCard.propTypes = {
    restaurant: PropTypes.object
}

export default RestaurantCard