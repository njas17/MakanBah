import React from 'react';

class LoginPage extends React.Component {

    render() {
        return (
            <div className="container-fluid">
             <div className="loginpage">
                 <h3>Please login:</h3>
                <form>
                    <label>Email:</label><input type="email"></input>
                    <label>Password:</label><input type="password"></input>
                    <button>Login</button>
                </form>
             </div>
            </div>
        );
    }
}

export default LoginPage;
