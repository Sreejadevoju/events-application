import React from "react";
import "./EventCard.css";

export default function EventCard({ event }) {
    return (
        <div className="event-card">
            <div className="event-card-body">
                <h3 className="event-title">{event.eventName}</h3>
                <p className="event-city">{event.cityName}</p>
                <p className="event-date">
                    {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
                <div className="event-meta">
                    <span className="event-weather">{event.weather}</span>
                    <span className="event-dot">•</span>
                    <span className="event-distance">{Math.round(event.distanceKm)} km</span>
                </div>
            </div>
        </div>
    );
}
