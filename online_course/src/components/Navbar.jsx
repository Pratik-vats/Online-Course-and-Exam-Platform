import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
    const { user , logout } = useAuthContext();

    return (
        <header>
            <nav>
                <div className="nav-brand">
                    <Link to="/">EduExam</Link>
                </div>
                
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/exams">Exams</Link></li>
                </ul>

                <div className="nav-actions">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-secondary">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;