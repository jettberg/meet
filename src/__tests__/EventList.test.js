import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from "../App";
import mockData from '../mock-data';
import userEvent from '@testing-library/user-event';


describe('<EventList /> component', () => {
    test('has an element with "list" role', async () => {
        const allEvents = await getEvents();
        const EventListComponent = render(<EventList events={allEvents} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });

    test('renders correct number of events', async () => {
        const allEvents = await getEvents();
        const EventListComponent = render(<EventList events={allEvents} />);
        const items = EventListComponent.getAllByRole("listitem");
        expect(items).toHaveLength(allEvents.length);
    });
});

describe('<EventList /> integration', () => {
  test('renders a list of events when the App component is mounted', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });
});