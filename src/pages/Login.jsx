import React, { useState } from "react";
import { auth } from "../components/config/firebase-config"; // Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Message state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage("Login successful! Redirecting..."); // Success message
            setTimeout(() => {
                navigate("/vote"); // Redirect after successful login
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage(`Error logging in: ${error.message}`); // Error message
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Login to E-Voting System</h1>
            <form onSubmit={handleLogin} className="flex flex-col mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mb-2 p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="mb-2 p-2 border border-gray-300 rounded"
                    required
                />
                <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    Login
                </button>
            </form>
            {message && (
                <p className={`mt-4 ${message.startsWith("Error") ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}
            <p className="mt-4">
                Don't have an account?{" "}
                <button
                    onClick={() => navigate("/signup")}
                    className="text-green-500 hover:underline"
                >
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default Login;
  