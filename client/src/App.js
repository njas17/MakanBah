import React from "react";
import "./App.css";
import RestaurantList from "./components/RestaurantList";
import BucketList from "./components/BucketList";

class App extends React.Component {
  render() {
    return (
      <div className="restaurant-finder">
        <RestaurantList />
        <BucketList />
      </div>
    );
  }
}

export default App;