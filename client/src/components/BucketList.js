import React from "react";


class BucketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            restaurants: [],
            complete: 0,
        };
        // this.updateList = this.updateList.bind(this);
        // this.deleteList = this.deleteList.bind(this);
    }

    componentDidMount() {
        fetch("/users")
        .then(res => res.json())
        .then(data => {
            this.setState({
                restaurants:data
            })
        })
        .catch(error => {
            console.log("Failure")
        });
    }

    completedList() {

    }


    render () {
        return (
            <form>
                <div className="rows">
                    <ul>
                        {this.state.restaurants.map(item => {
                            return (
                                <li key={item.place_id}>
                                    <div className="bucket-container">
                                        {/* <div className="bucket-list">selected restaurant</div> */}
                                        <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={this.state.restaurants}
                                        />
                                        <div>
                                        <button className="complete-btn"
                                        type="button"
                                        onClick={e => this.completedList()}>
                                            Completed
                                            {/* <i className="fas fa-check"></i> */}
                                        </button>
                                        <button 
                                        className="trash-btn"
                                        type="button"
                                        onClick={e => this.deleteList()}>
                                            Delete
                                            {/* <i className="fas fa-trash"></i> */}
                                        </button> 
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </form>
        );
    }
}


export default BucketList;