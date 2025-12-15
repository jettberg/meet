import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';
import { extractLocations } from '../api';

jest.mock('../api', () => {
    const originalModule = jest.requireActual('../api');
    return {
        ...originalModule,
        getEvents: jest.fn(() => Promise.resolve(mockData)),
    };
});


describe('<CitySearch /> component', () => {

    test('renders text input', async () => {
        const allEvents = await getEvents();
        const allLocations = extractLocations(mockData);
        const { queryByRole } = render(<CitySearch allLocations={allLocations} />);

        const cityTextBox = queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', async () => {
        const allEvents = await getEvents();
        const allLocations = extractLocations(mockData);
        const { queryByRole } = render(<CitySearch allLocations={allLocations} />);

        const suggestionList = queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox gains focus', async () => {
        const allEvents = await getEvents();
        const allLocations = extractLocations(mockData);
        const { queryByRole } = render(<CitySearch allLocations={allLocations} />);
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
        const allEvents = await getEvents();
        const allLocations = extractLocations(mockData);
        const { queryByRole, findAllByRole, rerender } = render(<CitySearch allLocations={allLocations} />);
        const user = userEvent.setup();

        rerender(<CitySearch allLocations={allLocations} />);

        const cityTextBox = queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        const suggestions = allLocations
            ? allLocations.filter((location) =>
                location.toUpperCase().includes(cityTextBox.value.toUpperCase())
            )
            : [];

        const suggestionListItems = await findAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i++) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const allEvents = await getEvents();
        const allLocations = extractLocations(mockData);
        const { queryByRole, queryAllByRole, rerender } = render(<CitySearch allLocations={allLocations} />);
        const user = userEvent.setup();

        rerender(<CitySearch allLocations={allLocations} />);

        const cityTextBox = queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        const BerlinGermanySuggestion = queryAllByRole('listitem')[0];
        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});