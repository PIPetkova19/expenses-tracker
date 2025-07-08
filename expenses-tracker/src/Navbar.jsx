import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item "><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item "><Link to="/add-expenses" className="nav-link">Add expenses</Link></li> 
                <li className="nav-item "><Link to="/track-expenses" className="nav-link">Track expenses</Link></li>
                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
            </ul>
        </nav >
    );
}

export default Navbar;
