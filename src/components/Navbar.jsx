import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <h1>Event Explorer</h1>
            <div className="navbar-links">
                <span onClick={() => navigate("/events")}>Events</span>
                <span onClick={() => navigate("/login")}>Logout</span>
            </div>
        </div>
    );
};

export default Navbar;
