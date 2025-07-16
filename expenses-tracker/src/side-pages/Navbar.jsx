import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    //user-съдържа инфо за потребителя или null
    //logout-функция за logout
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <div className="d-flex w-100 justify-content-between">
                <ul className="navbar-nav me-auto d-flex flex-row">
                    {user ? (
                        <>
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/add-expenses" className="nav-link">Add expenses</Link></li>
                            <li className="nav-item"><Link to="/track-expenses" className="nav-link">Track expenses</Link></li>
                              <li className="nav-item"><Link to="/add-income" className="nav-link">Add income</Link></li>
                            <li className="nav-item"><Link to="/track-income" className="nav-link">Track income</Link></li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link to="/log-in" className="nav-link">Log in</Link></li>
                            <li className="nav-item"><Link to="/sign-in" className="nav-link">Sign in</Link></li>
                        </>
                    )}
                </ul>

                {user && (
                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item nav-link">Hi, {user.displayName}</li>
                        <li className="nav-item">
                            <button className="btn btn-outline-secondary" onClick={logout}>Log out</button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
