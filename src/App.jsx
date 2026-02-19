import React, { useState, useEffect } from 'react';
import './App.css';
import { getEvents, extractLocations } from './api'


import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CitySearch from './components/CitySearch';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");


  useEffect(() => {
    const fetchDataAndCheckOnline = async () => {
      const allEvents = await getEvents();

      const filteredEvents =
        currentCity === "See all cities"
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);

      setEvents(filteredEvents?.slice(0, currentNOE) || []);
      setAllLocations(extractLocations(allEvents));


      if (!navigator.onLine) {
        setWarningAlert(
          "You are offline! There may be some events that are outdated!"
        );
      } else if (!allEvents || allEvents.length === 0) {
        setWarningAlert(
          "Could not load events from server. Showing cached events."
        );
      } else {
        setWarningAlert("");
      }
    };

    fetchDataAndCheckOnline();
  }, [currentCity, currentNOE]);


  return (
    <div>
      <div className="App">

        <div className="alerts-container">
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
          {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
          {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        </div>

        <NumberOfEvents
          setCurrentNOE={setCurrentNOE}
          setErrorAlert={setErrorAlert}
        />
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert} />


          <div className= "charts-container"> 
            <CityEventsChart allLocations={allLocations} events={events}/>
            <EventGenresChart events={events} />
          </div>


        <EventList
          events={events} />
      </div>
    </div>
  );
}

export default App
