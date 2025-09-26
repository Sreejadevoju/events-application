import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setServerError("");
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(
                (u) => u.username === username && u.password === password
            );
            if (user) {
                localStorage.setItem("auth", "true");
                setIsAuthenticated(true);
                navigate("/events");
            } else {
                setServerError("Invalid username or password.");
            }
        } catch (err) {
            setServerError("Something went wrong while logging in.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Please login to continue</p>

                <form onSubmit={handleLogin}>
                    <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    {serverError && <p className="error">{serverError}</p>}

                    <button className="btn" type="submit">
                        Login
                    </button>
                </form>

                <p className="signup-text">
                    Don’t have an account?{" "}
                    <span className="text-link" onClick={() => navigate("/signup")}>
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
