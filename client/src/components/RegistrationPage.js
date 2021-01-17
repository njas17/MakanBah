import React, { Component } from 'react';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',                
            },
            isRegistered: false,
            isDuplicateEmail: false,
            isLogged: false
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ user: { ...this.state.user, [name]: value } }); 
    }

    addUser = () => {
        fetch("/auth/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state.user)
        })
          .then(response => {
            response.json();
            this.setState({ isRegistered: true });
          })
          .catch(error => {
            console.error("Error in add: ", error);
          });
    };

    checkUserEmail = () => {
        fetch("/auth/users/" + this.state.user.email)
            .then(response => response.json())
            .then(data => {
                this.setState({ isDuplicateEmail: data.length })
            })
            .catch(error => {
              console.error("Error in add: ", error);
            });        
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkUserEmail();

        if (this.state.isDuplicateEmail === false)
            this.addUser();
    }

    render() {
        return (            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8"></div>
                    { (!this.state.isRegistered) ? ( 
                    <div className="col-4 registrationpage">
                        <h4>Register your information to sign up:</h4>
                        { (this.state.isDuplicateEmail) ? (
                        <div className="alert alert-danger" role="alert">
                            Sorry. The email you provided is already registered.
                        </div>
                        ) : null }
                        <form>
                            <div className="form-group">
                                <label className="form-label">First Name:</label><input type="text" name="firstname" required onChange={(e) => this.handleChange(e)} className="form-control"  ></input>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name:</label><input type="text" name="lastname" required onChange={(e) => this.handleChange(e)} className="form-control" ></input>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email:</label><input type="email" name="email" required onChange={(e) => this.handleChange(e)} className="form-control"  ></input>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password:</label><input type="password" name="password" required onChange={(e) => this.handleChange(e)} className="form-control" ></input>
                            </div>
                            <div className="center">
                                <button className="btn btn-secondary" onClick={(e) => this.handleSubmit(e)} type="button">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    ) : (
                    <div className="col-4 registrationpage">
                        <h5>Your profile have been registered. Thank You.
                            <span>Click <a href="/loginpage">here</a> to login.</span>
                        </h5>
                    </div>
                    ) }
                </div>
            </div>
        );
    }
}

export default RegistrationPage;



