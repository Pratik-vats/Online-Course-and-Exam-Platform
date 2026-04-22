import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function Register() {
    const navigate = useNavigate();
    const { register, loading } = useAuthContext();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const res = await register(form);

        if (res.success) {
            navigate("/dashboard");
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create an Account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name</label>
                        <input id="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input id="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input id="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Role</label>
                        <select id="role" value={form.role} onChange={handleChange} required>
                            <option value="">Select a Role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button disabled={loading} className="btn-primary">
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="auth-redirect">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}