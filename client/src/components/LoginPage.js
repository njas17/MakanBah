import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setUserSession } from '../session';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMesg: '',
            email: '',
            password: '',
            user: {}
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    userSignin = () => {
        fetch("/auth/users/" + this.state.email)
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data[0] })
            }).then(() => this.validateUser())
            .catch(error => {
                this.setState({ errorMesg: "Sign-In Error: Please ensure you entered a valid email and password."});
            });
    }

    validateUser = () => {
        const { errorMesg, ...rest } = this.state;

        fetch(`/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rest)
        })
            .then(response => response.json())
            .then(data => {
                this.props.signin(data.user);
                setUserSession(data.token, data.user);
            })
            .catch(error => {
                this.setState({ errorMesg: "Validation Error: Please ensure you entered a valid email and password."});
            });
    }

    handleSubmit(e) {
        const { email, password } = this.state;

        e.preventDefault();
        this.setState({ errorMesg: "" });
        if (email === "" || password === "") {
            this.setState({ errorMesg: "All fields are required. Please provide the information." });
            return;
        }

        if (this.state.errorMesg === "")
            this.userSignin();
    }

    render() {
        const { errorMesg } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-9"></div>
                    {(!this.props.isAuthenticated) ? (
                        <div className="col-3 loginpage">
                            <h5>Login to MakanBah!</h5>
                            { (errorMesg !== "") ? (
                                <div className="alert alert-danger" role="alert">
                                    { errorMesg }
                                </div>
                            ) : null}                            
                            <form>
                                <div className="form">
                                    <div className="form-group">
                                        <input type="email" name="email" placeholder="Email" required onChange={(e) => this.handleChange(e)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" placeholder="Password" required onChange={(e) => this.handleChange(e)} className="form-control"></input>
                                    </div>
                                    <div className="center">
                                        <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)} type="submit">Login</button>
                                        <div><Link to="/registrationpage">Not a member? Sign up now.</Link></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                            <div className="col-4 loginpage">
                                <h6>You have logged in. Click to continue -</h6>
                                <div><Link to="/landingpage"> Member Page </Link></div>

                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default LoginPage;


// const useFormInput = initialValue => {
//     const [value, setValue] = useState(initialValue);

//     const handleChange = e => {
//       setValue(e.target.value);
//     }
//     return {
//       value,
//       onChange: handleChange
//     }
// }

// function LoginPage(props) {
//     const [loading, setLoading] = useState(false);   
//     const email = useFormInput('');
//     const password = useFormInput('');
//     const [error, setError] = useState(null);
//     const data = { email: email.value, password: password.value };

    // handle button click of login form
    // const handleLogin = () => {
    //     console.log(props, props.history);
    //     props.history.push('/landingpage');
    //     setError(null);
    //     setLoading(true);

    //     fetch.post("/users/signin", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data)
    //     })
    //     .then(response => {
    //         setLoading(false);
    //         setUserSession(response.data.token, response.data.user);
    //         props.history.push('/landingpage');
    //     })
    //     .catch(err => {
    //         setLoading(false);
    //         if (error.response.status === 401) setError(error.response.data.message);
    //     else setError("Something went wrong. Please try again later.");
    //     });
    // }

//     return (
//         <div className="container-fluid">
//             <div className="loginpage">
//                 <h3>Please login:</h3>
//             <form>
//                 <label>Email:</label><input type="email" {...email} autoComplete="new-password" ></input>
//                 <label>Password:</label><input type="password" {...password} autoComplete="new-password" ></input>
//                 <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} />
//             </form>
//             </div>
//         </div>
//     );
// }


