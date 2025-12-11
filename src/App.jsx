import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CitySearch from './components/CitySearch';

const App = () => {
  return (
    <div>
      <div className="App">
        <NumberOfEvents />
        <CitySearch />
        <EventList />
      </div>
    </div>
  );
}

export default App
