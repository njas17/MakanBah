import React from "react";
// Import components
import Restaurants from "./RestaurantList";


const BucketList =({ buckets }) => {
    return (
        <div className ="bucket-container">
            <ul className="bucket-list">
                {buckets.map((item) => (
                    <Restaurants name={item.name} id={item.id}/>
                ))}
            </ul>
        </div>
    );
};

export default BucketList;