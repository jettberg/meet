# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Feature conversions 2-6:

**Feature 2: Show/Hide Event Details**

**Scenario 1:** An event element is collapsed by default.
-Given the user has opened the app;
When the list of upcoming events is displayed;
Then each event element should be collapsed by default.

**Scenario 2:** User can expand an event to see details.
-Given the list of upcoming events is visible;
When the user clicks on an event;
Then the event details should be expanded and visible.

**Scenario 3:** User can collapse an event to hide details.
-Given the user has expanded an event;
When the user clicks on the same event again;
Then the event details should be collapsed and hidden.

-----

**Feature 3: Specify Number of Events**

**Scenario 1:** When user hasn’t specified a number, 32 events are shown by default.
-Given the user has not specified a number of events;
When the user opens the app;
Then 32 upcoming events should be displayed by default.

**Scenario 2:** User can change the number of events displayed.
-Given the user is on the main page;
When the user enters a new number in the event count textbox;
Then that number of upcoming events should be displayed.

-----

**Feature 4: Use the App When Offline**

**Scenario 1:** Show cached data when there’s no internet connection.
-Given the user has previously accessed event data while online;
When the user opens the app without an internet connection;
Then the app should display cached event data.

**Scenario 2:** Show error when user changes search settings (city, number of events).
-Given the user is offline;
When the user attempts to search for a new city or change the number of events;
Then an error message should be displayed indicating the action cannot be completed offline.

-----

**Feature 5: Add an App Shortcut to the Home Screen**

**Scenario 1:** User can install the meet app as a shortcut on their device home screen.
-Given the user is using a compatible browser and device;
When the user clicks on the “Install” prompt or button;
Then the app should be added as a shortcut on the user’s home screen.

-----

**Feature 6: Display Charts Visualizing Event Details**

**Scenario 1:** Show a chart with the number of upcoming events in each city.
-Given the user is viewing the app with events loaded;
When the user scrolls to the data visualization section;
Then a chart showing the number of upcoming events per city should be displayed.
