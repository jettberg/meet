import React from 'react';
import { render, waitFor, within } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';
import { extractLocations, getEvents } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
    const mockSetCurrentCity = jest.fn();
    const mockSetInfoAlert = jest.fn();

    test('renders text input', () => {
        const allLocations = extractLocations(mockData);

        const { queryByRole } = render(
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={mockSetCurrentCity}
                setInfoAlert={mockSetInfoAlert}
            />
        );

        const cityTextBox = queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const allLocations = extractLocations(mockData);

        const { queryByRole } = render(
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={mockSetCurrentCity}
                setInfoAlert={mockSetInfoAlert}
            />
        );

        const suggestionList = queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox gains focus', async () => {
        const allLocations = extractLocations(mockData);

        const { queryByRole } = render(
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={mockSetCurrentCity}
                setInfoAlert={mockSetInfoAlert}
            />
        );

        const user = userEvent.setup();
        const cityTextBox = queryByRole('textbox');
        await user.click(cityTextBox);

        await waitFor(() => {
            const suggestionList = queryByRole('list');
            expect(suggestionList).toBeInTheDocument();
            expect(suggestionList).toHaveClass('suggestions');
        });
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const allLocations = extractLocations(mockData);

        const { queryByRole, findAllByRole } = render(
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={mockSetCurrentCity}
                setInfoAlert={mockSetInfoAlert}
            />
        );

        const user = userEvent.setup();
        const cityTextBox = queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        const suggestions = allLocations.filter(location =>
            location.toUpperCase().includes('BERLIN')
        );

        const suggestionListItems = await findAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const allLocations = extractLocations(mockData);

        const { queryByRole, queryAllByRole } = render(
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={mockSetCurrentCity}
                setInfoAlert={mockSetInfoAlert}
            />
        );

        const user = userEvent.setup();
        const cityTextBox = queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        const BerlinGermanySuggestion = queryAllByRole('listitem')[0];
        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});


describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered.', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;


        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);


        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);


        const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });

});
