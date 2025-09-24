import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const RecommendedEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const apiKey = import.meta.env.VITE_AZURE_API_KEY;
                const res = await fetch(
                    `https://gg-backend-assignment.azurewebsites.net/api/Events?code=${apiKey}&type=reco`
                );
                const data = await res.json();
                if (Array.isArray(data.events)) {
                    setEvents(data.events);
                }
            } catch (err) {
                console.error("Failed to fetch recommended events:", err);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="events-container">
            <h2>Recommended Shows</h2>
            <div className="recommended-list" style={{ display: "flex", overflowX: "auto" }}>
                {events.map((e, i) => (
                    <EventCard key={i} event={e} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedEvents;
