import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setServerError("");
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.find((u) => u.email === email)) {
                setServerError("User with this email already exists.");
                return;
            }
            users.push({ email, username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (err) {
            setServerError("Something went wrong while saving your data.");
        }
    };

    return (
        <div className="center-screen">
            <div className="card" style={{ width: "350px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
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
                        Sign Up
                    </button>
                </form>
                <p style={{ marginTop: "12px", textAlign: "center" }}>
                    Already have an account?{" "}
                    <span className="text-link" onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
