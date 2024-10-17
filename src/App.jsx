import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import { auth } from "./components/config/firebase-config"; // Import Firebase auth
import "./App.css"; // Import global styles
import './index.css'; // Ensure this is present in your main file


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(""); // To display login errors

    // Function to handle user login
    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            setLoginError(""); // Clear previous errors
            window.location.href = "/vote"; // Redirect to vote page after login
            console.log("Login successful:", userCredential.user);
        } catch (error) {
            setLoginError(error.message); // Set error to display to user
            console.error("Error logging in:", error.message);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Additional logout logic if needed
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} loginError={loginError} />} /> {/* Pass handleLogin and error */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </Router>
    );
}

export default App;
