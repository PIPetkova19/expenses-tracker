import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Fill in all the fields");
            return;
        }

        try {
            // Вход на потребител с имейл и парола чрез Firebase
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successfull!");
            setEmail('');
            setPassword('');
            navigate("/home");// навигира към Home след login
        } catch (error) {
            alert("Error: " + error.message);
        }

    };

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }


    //htmlFor вместо for onSubmit={login}
    return (
        <div className="w-100 w-md-50 d-flex justify-content-center align-items-center bg-white">
            <form onSubmit={handleLogin}>
                <div id="login-container" className="form-group">
                    <h1 className="text-center mt-3 mb-4 header-registration">Welcome back</h1>
                    <div id="login-text"><div>Glab to see you again👋</div>
                        <div className='mb-3'>Login to your account below</div>
                    </div>

                    <label className="labels mb-2" htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control mb-3" value={email} onChange={handleEmailChange} required />
                    <label className="labels mb-2" htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control mb-4" value={password} onChange={handlePasswordChange} required />
                    <hr />
                    <input className="submit-btn btn btn-primary mb-3" type="submit" />
                    
                        <span id="login-msg"> Don't have an account? 
                        <Link id="login-link" to="/sign-in" className="nav-link"> Sign up for free</Link></span>
                </div>
            </form>
        </div>
    );

}

export default Login