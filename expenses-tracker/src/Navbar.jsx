import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <div className="d-flex w-100 justify-content-between">
                <ul className="navbar-nav me-auto d-flex flex-row">
                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="nav-item"><Link to="/add-expenses" className="nav-link">Add expenses</Link></li>
                    <li className="nav-item"><Link to="/track-expenses" className="nav-link">Track expenses</Link></li>
                </ul>
                <ul className="navbar-nav d-flex flex-row">
                    <li className="nav-item"><Link to="/log-in" className="nav-link">Log in</Link></li>
                    <li className="nav-item"><Link to="/sign-in" className="nav-link">Sign in</Link></li>
                </ul>
            </div>
        </nav>
    );
}


export default Navbar;
