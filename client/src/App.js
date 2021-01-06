import './App.css';
import React from "react";
import { ListGroup } from 'react-bootstrap';
// import restaurantList from "./restaurantList.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurants: [],
      complete: 0,
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
  }

  // performSearch() {
  //   console.log("Perform search with google api")
  //   const urlString = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Kota+Kinabalu+Malaysia&key=AIzaSyAsM-TE6HjRKxM8Tph0HmDmwyaWgRYSuaM"
  //   fetch(urlString)
  //   .then(response => {
  //     console.log(response);
  //     return response.json()
  //   })
  // }

  addBucketList() {
    console.log("click click");
    fetch("restaurant.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        restaurants: this.state.restaurants,
        complete: this.state.complete
      })
    })
      .then(res => {
        res.json();
        this.componentDidMount();
      })
      .catch(err=> console.log(err));
  }


  render() { 
    

    const {restaurants} = this.state;
    console.log("i am here", restaurants);

    return ( 
      <div className="App">
        

        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="restaurant.svg"/>
                </td>
                <td width="8"/>
                <td>
                  <h1>MakanBah</h1>
                </td>
            </tr>
          </tbody>
        </table>
        <h3>Restaurant Finder</h3>
        <h4>Total Restaurants: {restaurants.length}</h4>

          <input placeholder="Enter Search"/>    

        <div className="container">
            <div className="box-grid">
              <ul>
                {restaurants.map(item=>
                  <ListGroup.Item key={item.place_id}>
                    {/* item.photo_reference = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference" + photo_reference */}
                    <h3>{item.name}</h3><h4>{item.rating} </h4>
                    <img alt="photoreference" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference=ATtYBwJztZ5fRPa7mBQf0jKAT2pcL7bPN0RL0EFmyt3X6wlO_xMsyqe2SpI0BBOkzlCmxpO1_DXpqbzOCaZ2vq-koQlrKqQBo2Vy9N-IvXCsNsX6e3dmKYDlOQTx8ELWky-3ngkCOi7pl2Gp0y4Dl-Np44NXLKbRojx3Y66Ilep8KS1wTq7_&sensor=false&key=AIzaSyAsM-TE6HjRKxM8Tph0HmDmwyaWgRYSuaM"/>
                    <button
                      type="button" 
                      onClick={e => this.addBucketList()}>
                        Bucket List!
                      </button>
                  </ListGroup.Item>
                )}
              </ul>
            </div>
        </div>
      </div>
    );
  }
}

export default App;







