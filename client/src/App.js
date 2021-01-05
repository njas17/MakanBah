import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurants: [],
    };
  }


  componentDidMount(){
    fetch("restaurants.json")
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => {
        console.log(data);
        this.setState({restaurants:data});
    })
    .catch(error => {
        console.log("Error", error);
    });
  //   fetch("/restaurants")
  //   .then(data => {
  //     this.setState({restaurants:data});
  //   })
  //   .catch(error => {
  //     console.log("Error", error);
  //   });
  }


  render() { 

    const {restaurants} = this.state;
    console.log("i am here", restaurants);

    return ( 
      <div className="App">
      <h1>Makanbah</h1>
      <h3>Restaurant Finder</h3>
      <h4>Total Restaurants: {restaurants.length}</h4>
    
      <ul>
        {restaurants.map(item=>
          <ul key={item.name}>
            {item.name}
            <div></div>
            ratings: {item.rating} 
          </ul>
        )}
      </ul>
      </div>
    );
  }
}

export default App;







// Solution with Shubhra


// Put in HTML
// <div id="map"></div>
// <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
// Techsprint Academy to Everyone (6:31 PM)
// <script
//       src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE&callback=initMap&libraries=places&v=weekly"
//       defer
//     ></script>


// Fiddle link : https://jsfiddle.net/api/post/library/pure/#&togetherjs=6JE5PLPLin