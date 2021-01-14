import React from 'react';
import RestaurantList from "./RestaurantList";
import BucketList from "./BucketList";

class LandingPage extends React.Component {

    render() {
        return (
            <div className="restaurant-finder">
                <RestaurantList />
                <BucketList />
            </div>
        );
    }
}

export default LandingPage;