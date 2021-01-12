// import './App.css';
import React from "react";
import { ListGroup } from 'react-bootstrap';

class RestaurantList extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
        restaurants: [],
        bucketListRestaurantId: null
        };
    }

    // fetch data from "restaurants.json"
    // then setState the state.restaurants with the data from "restaurants.json"
    // all the data from "restaurants.json is being stored in this.setState({restaurants:data})"
    // so this.setState({restaurants:data}) has all the data now, call function postRestaurants and now it also has the restaurants data
    componentDidMount(){
        fetch("restaurants.json")
        .then(response => {
            console.log(response);
            return response.json() // convert to json
        })
        .then(data => {
            // console.log(data);
            this.setState({restaurants:data}); 
            this.clearRestaurantInfo();
        })
        .catch(error => {
            console.log("Error", error); // catch errors
        });
    }

    clearRestaurantInfo() {
        console.log("--------DELETE PREVIOUS DATA AND RESET AUTOINCREMENT---------------");

        fetch("/users/clearRestaurants", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.postRestaurants();
            })
            .catch(error => {
                console.log("error", error);
        });
    }
    
    postRestaurants() {
        console.log("--------POST TO THE RESTAURANTS TABLES---------------");

        fetch("/users/addRestaurants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                allRestaurants: this.state.restaurants,
            })
        })
        .then(res => {
            res.json();
        })
        .catch(err =>  
            console.log(err)
        );
    }
                
    
    //adding the bucket list into the db
    submitRestaurant(clickedRestaurantId) {
        // this.getRestaurantID(clickedRestaurant.name);
        fetch("/users/addToBucketList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                restaurant_id: clickedRestaurantId,
                complete: 0
            })
        })
        .then(res => {
            res.json();
            // this.componentDidMount();
        })
        .catch(error => {
            console.log(error);
        });
    }

    addBucketList(clickedRestaurant) {
        // fetch a url that goes to API and run the query that gives us the id based on the name
        // console.log(nameOfRestaurant);
        let restaurantId= null;
        fetch("/users/getRestaurantID?restaurantName="+clickedRestaurant.name, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            return res.json();
        }) 
        .then(data => {
            console.log(data);
            restaurantId = data;
            this.submitRestaurant(restaurantId);
        })
        .catch(error => {
            console.log(error);
        });
        
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
                            <h3>Hi, Khalilah!</h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="title-fonts">
                <p>Makan bah!</p>
                <span>Looking for something to eat?</span>
                <h4>Total Restaurants: {restaurants.length}</h4>
                </div>


                {/* <input placeholder="Enter Search"/>     */}

            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <ul className="bucket-container1">
                            {restaurants.map(item =>
                            <ListGroup.Item key={item.place_id}>
                                {/* item.photo_reference = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference" + photo_reference */}
                                {item.name} 
                                <br></br>
                                Ratings: {item.rating} 
                                <img alt="photoreference" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=ATtYBwJztZ5fRPa7mBQf0jKAT2pcL7bPN0RL0EFmyt3X6wlO_xMsyqe2SpI0BBOkzlCmxpO1_DXpqbzOCaZ2vq-koQlrKqQBo2Vy9N-IvXCsNsX6e3dmKYDlOQTx8ELWky-3ngkCOi7pl2Gp0y4Dl-Np44NXLKbRojx3Y66Ilep8KS1wTq7_&sensor=false&key=AIzaSyAsM-TE6HjRKxM8Tph0HmDmwyaWgRYSuaM"/>
                                <button
                                type="button" 
                                className="btn btn-danger"
                                onClick={e => this.addBucketList(item)}>
                                    Bucket List!
                                </button>
                            </ListGroup.Item>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default RestaurantList;



