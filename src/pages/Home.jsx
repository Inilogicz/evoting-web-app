import React from 'react';
import './Home.css'; // Import the styles

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to E-Voting</h1>
            <p className="home-description">
                Your voice matters. Participate in the voting process!
            </p>
            <button className="home-button">Get Started</button>
        </div>
    );
}

export default Home;
