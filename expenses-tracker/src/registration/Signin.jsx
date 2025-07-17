import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password) {
            alert("Fill in all the fields");
            return;
        }

        try {
            // Създава нов потребител с имейл и парола в Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Обновява профила на новия потребител, като добавя име
            await updateProfile(userCredential.user, { displayName: fullName });
            alert("Sign in successfull!");
            setFullName('');
            setEmail('');
            setPassword('');
            navigate("/home");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

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
            <form onSubmit={handleSignin}>
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