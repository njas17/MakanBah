import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setUserSession } from '../session';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: { }
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
              console.error("Error in add: ", error);
            }); 
    }

    validateUser = () => {
        fetch(`/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state)
          })
            .then(response => response.json())
            .then(data => {
                console.log("Validation starts..", {...data.token, ...data.user});
                //this.props.signin({data.token, data.user});
                setUserSession(data.token, data.user);
                // this.props.history.push('/landingpage');
            })
            .catch(error => {
              console.error("Error in add: ", error);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.userSignin();
        //this.props.history.push("/landingpage");
    } 

    render() {
        // if (this.props.isAuthenticated) {
        //     return <LandingPage />
        // }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8"></div>
                    { (!this.props.isAuthenticated) ? (                    
                    <div className="col-4 loginpage">
                        <h3>Please login:</h3>
                        <form>
                            <div className="form-group">
                                <label>Email:</label><input type="email" name="email" required onChange={(e) => this.handleChange(e)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password:</label><input type="password" name="password" required onChange={(e) => this.handleChange(e)} className="form-control"></input>
                            </div>
                            <div className="center">
                                <button className="btn btn-secondary" onClick={(e) => this.handleSubmit(e)} type="submit">Login</button> 
                                <div><Link to="/registrationpage">Sign up to become a MakanBah! user.</Link></div>
                            </div>
                        </form>
                    </div>
                    ) : (
                        <div className="col-4 loginpage">
                            <h6>You have logged in. Click to continue -</h6>
                            <div><Link to="/landingpage"> Member Page </Link></div>
                            
                        </div>
                        ) }
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


