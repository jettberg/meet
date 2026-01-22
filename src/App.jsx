import React, { useState, useEffect } from 'react';
import './App.css';
import { getEvents, extractLocations } from './api'


import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CitySearch from './components/CitySearch';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");


  useEffect(() => {
    fetchData();
  }, [currentCity,]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    console.log('allEvents:', allEvents);
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter(event => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };


  return (
    <div>
      <div className="App">
        <NumberOfEvents />
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity} />
        <EventList
          events={events} />
      </div>
    </div>
  );
}

export default App
