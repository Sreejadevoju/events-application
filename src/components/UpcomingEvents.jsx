import React, { useEffect, useState, useRef, useCallback } from "react";
import EventCard from "./EventCard";
import "./UpcomingEvents.css";
const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const observer = useRef();

    useEffect(() => {
        fetchEvents(page);
    }, [page]);

    const fetchEvents = async (p) => {
        try {
            setLoading(true);
            const apiKey = import.meta.env.VITE_AZURE_API_KEY;

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
        } finally {
            setLoading(false);
        }
    };

    // Intersection Observer for infinite scroll
    const lastEventRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && page < totalPages) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, page, totalPages]
    );

    return (
        <div className="events-container">
            <h2>Upcoming Events</h2>
            <div className="event-list">
                {events.map((e, i) => {
                    if (i === events.length - 1) {
                        return <div ref={lastEventRef} key={i}><EventCard event={e} /></div>;
                    } else {
                        return <EventCard key={i} event={e} />;
                    }
                })}
            </div>

            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;
