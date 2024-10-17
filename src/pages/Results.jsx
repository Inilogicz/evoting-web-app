    import React, { useEffect, useState } from "react";
    import { collection, getDocs } from "firebase/firestore";
    import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"; // Import components
    import { Bar } from "react-chartjs-2";
    import { db } from "../components/config/firebase-config";
    import "./Results.css";

    // Register the required components for Chart.js
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    function Results() {
        const [candidates, setCandidates] = useState([]);

        useEffect(() => {
            const fetchCandidates = async () => {
                const candidatesCollection = collection(db, "candidates");
                const candidateSnapshot = await getDocs(candidatesCollection);
                const candidateList = candidateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCandidates(candidateList);
            };

            fetchCandidates();
        }, []);

        const data = {
            labels: candidates.map(candidate => candidate.name),
            datasets: [
                {
                    label: 'Votes',
                    data: candidates.map(candidate => candidate.votes || 0),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        return (
            <div className="results-container">
                <h1 className="header">Election Results</h1>
                <div className="chart-container">
                    <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="candidates-list">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="candidate-card">
                            <h2 className="candidate-name">{candidate.name}</h2>
                            <p className="candidate-party">Party: {candidate.party}</p>
                            <p className="candidate-votes">Votes: {candidate.votes || 0}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    export default Results;
