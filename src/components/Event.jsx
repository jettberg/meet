import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!event) {
    return null;
  }

  const toggleDetails = () => setShowDetails(prev => !prev);

  return (
    <div className="event">
      <h2 className="event-title">{event.summary}</h2>
      <p className="event-start">Start: {event.created}</p>
      <p className="event-location">Location: {event.location}</p>

      <button
        className="details-btn"
        onClick={toggleDetails}
        aria-expanded={showDetails}
      >
        {showDetails ? 'Hide details' : 'Show details'}
      </button>

      {showDetails && (
        <div className="event-details" data-testid="event-details">
          <p className="event-description">{event.description || 'No description'}</p>
          {/* Additional detail fields as needed */}
        </div>
      )}
    </div>
  );
};

export default Event;