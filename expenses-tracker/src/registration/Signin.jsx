import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

function Signin() {
    const { users, setUsers } = useContext(UserContext);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function addUsers(e) {
        e.preventDefault();

        if (!fullName || !email || !password) {
            window.alert("Please fill in all fields.");
            return;
        }

        const alreadySigned = users.find(user => user.email === email);
        if (alreadySigned) {
            window.alert("This email is already logged in!");
        }
        else {
            window.alert("Sign in successfull!");
        }

        const newUsers = { fullName, email, password };
        setUsers(prev => [...prev, newUsers]);

        setFullName("");
        setEmail("");
        setPassword("");
    }

    function handleFullNameChange(event) {
        setFullName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    return (
        <div className="d-flex  justify-content-center align-items-center" style={{ height: '500px' }}>
            <form onSubmit={addUsers}>
                <div id="signin-container" className="form-group">
                    <label htmlFor="fullName">Name</label>
                    <input type="text" id="fullName" className="form-control mb-3" value={fullName} onChange={handleFullNameChange} required></input>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control mb-3" value={email} onChange={handleEmailChange} required ></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control  mb-3" value={password} onChange={handlePasswordChange} required></input>
                    <input className="btn btn-primary" type="submit"></input>
                    <div>
                        <span id="login-msg"> Already have an account?</span>
                        <Link id="login-link" to="/log-in" className="nav-link">Log in</Link>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Signin