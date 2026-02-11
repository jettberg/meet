import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';


const mockEvent = {
    summary: 'Testing Event',
    start: {
        dateTime: '2025-12-01T12:00:00Z'
    },
    location: 'Testing Location',
    description: 'This is a test event'
};

describe('<Event /> component', () => {
    let eventComponent;

    beforeEach(() => {
        eventComponent = render(<Event event={mockEvent} />);
    });

    test('renders title, start time, location and show details button (collapsed)', () => {
        expect(screen.getByText('Testing Event')).toBeInTheDocument();
        expect(screen.getByText('Start: 2025-12-01T12:00:00Z')).toBeInTheDocument();
        expect(screen.getByText('Location: Testing Location')).toBeInTheDocument();
        expect(screen.getByText('Show details')).toBeInTheDocument();
    });

    test('shows details when "Show details" button is clicked and toggles to "Hide details"', () => {
        const button = screen.getByRole('button', { name: 'Show details' });
        fireEvent.click(button);

        expect(screen.getByTestId('event-details')).toBeInTheDocument();
        expect(screen.getByText('This is a test event')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Hide details' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Hide details' }));
        expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
    });
});