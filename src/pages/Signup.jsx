import React, { useState } from "react";
import { auth } from "../components/config/firebase-config"; // Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Message state
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("Signup successful! Redirecting..."); // Success message
            setTimeout(() => {
                navigate("/login"); // Redirect after successful signup
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage(`Error signing up: ${error.message}`); // Error message
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Sign Up for E-Voting System</h1>
            <form onSubmit={handleSignup} className="flex flex-col mb-4">
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
                    Sign Up
                </button>
            </form>
            {message && (
                <p className={`mt-4 ${message.startsWith("Error") ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}
             <p className="mt-4">
                Have an Account already?{" "}
                <button
                    onClick={() => navigate("/Login")}
                    className="text-green-500 hover:underline"
                >
                  Login
                </button>
            </p>
        </div>
    );
};

export default Signup;
