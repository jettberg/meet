import React, { useState } from 'react';
import Event from "./Event"

const EventList = ({ events = [] }) => {
  return (
    <ul id="event-list">
      {events.map((event) => {
        const title = event.title || event.summary || "No Title";
        const location = event.location || "No Location Provided";
        const dateTime =
          event.start?.dateTime ||
          event.start?.date ||
          "Unknown Start Time";

        return (
          <li key={event.id} className="event">
            <h2 className="event-title">{title}</h2>
            <p className="event-start">Start: {dateTime}</p>
            <p className="event-location">Location: {location}</p>
            <button className="details-btn" aria-expanded="false">
              Show details
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;