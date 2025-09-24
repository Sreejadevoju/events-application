import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchEvents(page);
    }, [page]);

    const fetchEvents = async (p) => {
        try {
            const apiKey = import.meta.env.VITE_AZURE_API_KEY || "DUMMY";

            const res = await fetch(
                `https://gg-backend-assignment.azurewebsites.net/api/Events?code=${apiKey}&page=${p}&type=upcoming`
            );
            const data = await res.json();
            if (Array.isArray(data.events)) {
                setEvents((prev) => [...prev, ...data.events]);
                setTotalPages(data.totalPages);
            }
        } catch (err) {
            console.error("Failed to fetch upcoming events:", err);
        }
    };

    return (
        <div className="events-container">
            <h2>Upcoming Events</h2>
            <div className="event-list">
                {events.map((e, i) => (
                    <EventCard key={i} event={e} />
                ))}
            </div>
            {page < totalPages && (
                <button onClick={() => setPage(page + 1)}>Load More</button>
            )}
        </div>
    );
};

export default UpcomingEvents;
