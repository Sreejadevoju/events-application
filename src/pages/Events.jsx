import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import RecommendedEvents from "../components/RecommendedEvents";
import UpcomingEvents from "../components/UpcomingEvents";

const Events = () => (
    <>
        <Navbar />
        <Banner />
        <RecommendedEvents />
        <UpcomingEvents />
    </>
);

export default Events;
