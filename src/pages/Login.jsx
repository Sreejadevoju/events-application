import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser && savedUser.username === username && savedUser.password === password) {
            localStorage.setItem("auth", "true"); // ✅ mark authenticated
            alert("Login successful!");
            navigate("/events");
        } else {
            alert("Invalid credentials.");
        }
    };


    return (
        <div className="center-screen">
            <div className="card" style={{ width: "350px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input className="input" type="text" placeholder="Username"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="input" type="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn" type="submit">Login</button>
                </form>
                <p style={{ marginTop: "12px", textAlign: "center" }}>
                    Don’t have an account?{" "}
                    <span className="text-link" onClick={() => navigate("/signup")}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
