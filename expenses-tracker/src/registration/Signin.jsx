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
            <div className="w-100 w-md-50 d-flex justify-content-center align-items-center bg-white">
            <form onSubmit={handleSignin}>
                <div id="signin-container" className="form-group">
                    <h1 className="text-center mt-1 header-registration">Sign up</h1>
                       <div id="login-text"className='mb-3 mt-3'>Enter your details below  to create your account. </div>

                    <label htmlFor="fullName" className="labels mb-2">Name</label>
                    <input type="text" id="fullName" className="form-control mb-3" value={fullName} onChange={handleFullNameChange} required></input>
                    <label htmlFor="email" className="labels mb-2">Email</label>
                    <input type="email" id="email" className="form-control mb-3" value={email} onChange={handleEmailChange} required ></input>
                    <label htmlFor="password" className="labels mb-2">Password</label>
                    <input type="password" id="password" className="form-control  mb-3" value={password} onChange={handlePasswordChange} required></input>
                      <hr className="mb-3 mt-3"/>
                    <input className="btn btn-primary submit-btn mb-3" type="submit"></input>
                    
                        <span id="login-msg"> Already have an account? 
                        <Link id="login-link" to="/log-in" className="nav-link"> Log in</Link></span>
                
                </div>
            </form>
        </div >
    )
}

export default Signin