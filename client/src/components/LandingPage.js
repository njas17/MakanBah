import React from 'react';
import RestaurantList from "./RestaurantList";
import BucketList from "./BucketList";

function LandingPage(props) {

    if (!props.isAuthenticated) {
        return (
            <div className="alert alert-danger lg" role="alert">
                <h6>Sorry.. Please login to access this page.</h6>
            </div>            
        )
    };

    return (
        <div className="restaurant-finder">
            <RestaurantList />
            <BucketList />
        </div>
    );

}

export default LandingPage;