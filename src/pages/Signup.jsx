import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        if (!email || !username || !password) {
            alert("Please fill in all fields.");
            return;
        }
        localStorage.setItem("user", JSON.stringify({ email, username, password }));
        alert("Signup successful! Please login.");
        navigate("/login");
    };

    return (
        <div className="center-screen">
            <div className="card" style={{ width: "350px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <input className="input" type="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="text" placeholder="Username"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="input" type="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn" type="submit">Sign Up</button>
                </form>
                <p style={{ marginTop: "12px", textAlign: "center" }}>
                    Already have an account?{" "}
                    <span className="text-link" onClick={() => navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
