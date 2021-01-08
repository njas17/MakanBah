import React from "react";


class BucketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            restaurants: [],
            complete: 0,
        };
    }

// class BucketList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             restaurants: [],
//             complete: 0,
//         };
//     }

//     componentDidMount() {
//         fetch("/users")
//         .then(res => res.json())
//         .then(data => {
//             this.setState({
//                 restaurants:data
//             })
//         })
//         .catch(error => {
//             console.log("Failure")
//         });
//     }

// deleteList(e, id){
//     fetch("/api/todos/" + id, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json"
//         }
//         })
//         .then(res => {
//             res.json();
//             this.componentDidMount();
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     }


// updateList(e, id){
//     fetch("/api/todos/" + id, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             id: id,
//             text: e.target.value,
//             complete: this.state.complete
//             })
//         })
//         .then(res => {
//             this.componentDidMount();
//             })
//         .catch(error => {
//             console.log(error);
//             });
// }



    render () {
        return (
            <form>
            <div className="bucket-container">
                <li className="bucket-list">selected restaurant</li>
                <button className="complete-btn">
                    <i className="fas fa-check"></i>
                </button>
                <button className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
            </form>
        );
    }
}


export default BucketList;