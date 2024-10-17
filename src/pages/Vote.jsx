import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc, updateDoc, increment, collection, getDocs } from "firebase/firestore";
import { auth } from '../components/config/firebase-config';
import { db } from '../components/config/firebase-config';
import './VoteComponent.css'; // Import the CSS file

const VoteComponent = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const candidatesCollection = collection(db, "candidates");
                const candidateSnapshot = await getDocs(candidatesCollection);
                const candidateList = candidateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCandidates(candidateList);
            } catch (error) {
                console.error("Error fetching candidates:", error);
                setErrorMessage("Failed to load candidates.");
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const handleVoteSubmission = async (candidateId) => {
        const voterId = auth.currentUser.uid;
        const voterRef = doc(db, "voters", voterId);
        const candidateRef = doc(db, "candidates", candidateId);

        try {
            setIsVoting(true);
            const voterDoc = await getDoc(voterRef);
            if (voterDoc.exists()) {
                console.log("User has already voted.");
                setErrorMessage("You have already voted.");
                return;
            }

            await updateDoc(candidateRef, {
                votes: increment(1),
            });
            await setDoc(voterRef, { voted: true, timestamp: new Date() });

            console.log("Vote submitted successfully");
            setSuccessMessage("Vote submitted successfully.");
        } catch (error) {
            console.error("Error submitting vote:", error.message);
            setErrorMessage("Error submitting vote.");
        } finally {
            setIsVoting(false);
        }
    };

    if (loading) {
        return <p className="loading-message">Loading candidates...</p>;
    }

    return (
        <div className="vote-container">
            <h2>Vote for Your Candidate</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="candidates-list">
                {Array.isArray(candidates) && candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <div key={candidate.id} className="candidate-card">
                            <h3>{candidate.name}</h3>
                            <p>Party: {candidate.party}</p>
                            <button 
                                onClick={() => handleVoteSubmission(candidate.id)} 
                                disabled={isVoting}
                                className="vote-button"
                            >
                                {isVoting ? "Voting..." : "Vote"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No candidates available to vote for.</p>
                )}
            </div>
        </div>
    );
};

export default VoteComponent;
