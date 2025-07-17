import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
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