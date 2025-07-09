import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

function Login() {
    const { users, setUsers } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            window.alert("Please fill in all fields.");
            return;
        }

        const foundUser = users.find(user => user.email === email);

        if (!foundUser) {
            window.alert("Incorrect email");
        } else if (foundUser.password !== password) {
            window.alert("Incorrect password");
        } else {
            window.alert("Login successful");
        }

        setEmail("");
        setPassword("");
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }


    //htmlFor вместо for onSubmit={login}
    return (
        <div className="d-flex  justify-content-center align-items-center" style={{ height: '500px' }}>
            <form onSubmit={handleLogin}>
                <div id="login-container" className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control mb-3" value={email} onChange={handleEmailChange} required></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control  mb-3" value={password} onChange={handlePasswordChange} required></input>
                    <input className="btn btn-primary" type="submit"></input>
                </div>
            </form>
        </div >
    )
}

export default Login