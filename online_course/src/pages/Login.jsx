import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import "../styles/login.css";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading } = useAuthContext();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await login(form);

        if(res.success){
            navigate("/dashboard");
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input id="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input id="password" type="password" value={form.password} onChange={handleChange} required />
                    </div>

                    <button className="btn-primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="auth-redirect">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}