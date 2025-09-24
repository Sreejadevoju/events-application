import React, { useEffect, useState } from "react";

export default function EventCard({ event }) {

    return (
        <div className="event-card">
            <h3>{event.eventName}</h3>
            <p>{event.cityName}</p>
            <p>{new Date(event.date).toDateString()}</p>
            <p>{event.weather} • {Math.round(event.distanceKm)} km</p>
        </div>
    );
}
