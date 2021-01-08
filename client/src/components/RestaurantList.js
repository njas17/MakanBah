// import './App.css';
import React from "react";
import { ListGroup } from 'react-bootstrap';

class RestaurantList extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
        restaurants: [],
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
            this.setState({restaurants:data}); // print data to console
            this.postRestaurants();
        })
        .catch(error => {
            console.log("Error", error); // catch errors
        });
    }

    
    postRestaurants() {
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
                
    addBucketList(clickedRestaurant) {
        console.log("im adding you to bucket", clickedRestaurant);
        fetch("/users/addToBucketList", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postRestaurant: clickedRestaurant,
            })
        })
        .then(res => {
            alert("okkkkk");
            console.log(res, "resss");
            return res.json();
            // this.componentDidMount();
        })
        .then(data => {
            console.log(data,"CCCCCCCCCC");
            // this.setState({restaurants:data});
        })
        .catch(err=> console.log(err));
    };


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

                {/* <input placeholder="Enter Search"/>     */}

            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="bucket-container1">
                            {restaurants.map(item=>
                            <ListGroup.Item key={item.place_id}>
                                {/* item.photo_reference = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference" + photo_reference */}
                                <h6>{item.name}</h6><p>{item.rating} </p>
                                <img alt="photoreference" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=ATtYBwJztZ5fRPa7mBQf0jKAT2pcL7bPN0RL0EFmyt3X6wlO_xMsyqe2SpI0BBOkzlCmxpO1_DXpqbzOCaZ2vq-koQlrKqQBo2Vy9N-IvXCsNsX6e3dmKYDlOQTx8ELWky-3ngkCOi7pl2Gp0y4Dl-Np44NXLKbRojx3Y66Ilep8KS1wTq7_&sensor=false&key=AIzaSyAsM-TE6HjRKxM8Tph0HmDmwyaWgRYSuaM"/>
                                <button
                                type="button" 
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


// addBucketList(clickedRestaurant){
    //     console.log("im adding you to bucket", clickedRestaurant);
    //     fetch("/users/addToBucketList", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             postRestaurant: clickedRestaurant
    //         })
    //     })
    //     .then(res => {
    //         alert("Restaurant added");
    //         res.text();
    //         // this.componentDidMount();
    //     })
    //     .then(text => {
    //         console.log(text);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }




