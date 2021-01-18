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
            isLogged: false,
            errorMesg: ''
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
                const val = (data.length > 0) ? true : false
                if (val) 
                    this.setState({ errorMesg: "Sorry. The email you have provided is already registered in this site."})
            })
            .catch(error => {
                console.error("Error in check email: ", error);
                this.setState({ errorMesg: "Error on email. Please ensure email is provided."})
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ errorMesg: "" });
        const user = this.state.user;
        if (user.firstname === "" || user.lastname === "" || user.email === "" || user.password === "") {
            this.setState({ errorMesg: "All fields are required. Please provide the information." });
            return;
        }
            
        this.checkUserEmail();

        if (this.state.errorMesg !== "")
            this.addUser();
    }

    handleReset = (event) => {
        event.preventDefault();
        this.setState({
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            },
            errorMesg: ''
        })
    }

    render() {
        const { isRegistered, errorMesg, user } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8"></div>
                    {(!isRegistered) ? (
                        <div className="col-4 registrationpage">
                            <h4>Register your information to sign up:</h4>
                            { (errorMesg !== "") ? (
                                <div className="alert alert-danger" role="alert">
                                    { errorMesg }
                                </div>
                            ) : null}
                            <form>
                                <div className="form">
                                    <div className="form-group">
                                        <label className="form-label">First Name:</label>
                                        <input type="text" name="firstname" value={user.firstname} required onChange={(e) => this.handleChange(e)} className="form-control"  ></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name:</label>
                                        <input type="text" name="lastname" value={user.lastname} required onChange={(e) => this.handleChange(e)} className="form-control" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email:</label>
                                        <input type="email" name="email" value={user.email} required onChange={(e) => this.handleChange(e)} className="form-control"  ></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Password:</label>
                                        <input type="password" name="password" value={user.password} required onChange={(e) => this.handleChange(e)} className="form-control" ></input>
                                    </div>
                                    <div className="center">
                                        <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)} type="button">Sign Up</button> {` `}
                                        <button className="btn btn-secondary" onClick={(e) => this.handleReset(e)} type="button">Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                            <div className="col-4 registrationpage">
                                <h5>Your profile have been registered. Thank You.
                            <span>Click <a href="/loginpage">here</a> to login.</span>
                                </h5>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default RegistrationPage;



