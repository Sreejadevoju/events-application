import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load from localStorage only once on mount
  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    setIsAuthenticated(auth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/events"
          element={isAuthenticated ? <Events /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
