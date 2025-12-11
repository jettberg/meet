import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';

const mockEvent = {
  summary: 'Testing Event',
  created: '2025-12-01T12:00:00Z',
  location: 'Testing Location',
  description: 'This is a test event'
};

describe('<Event /> component', () => {
  test('renders title, start time, location and show details button (collapsed)', () => {
    render(<Event event={mockEvent} />);

    // title
    expect(screen.queryByText('Testing Event')).toBeInTheDocument();

    // start time
    expect(screen.queryByText('2025-12-01T12:00:00Z')).toBeInTheDocument();

    // location
    expect(screen.queryByText('Testing Location')).toBeInTheDocument();

    // show details button
    expect(screen.queryByText('Show details')).toBeInTheDocument();
  });

  test('shows details when "Show details" button is clicked and toggles to "Hide details"', () => {
    render(<Event event={mockEvent} />);

    const button = screen.getByRole('button', { name: 'Show details' });
    fireEvent.click(button);

    // make it visible
    expect(screen.getByTestId('event-details')).toBeInTheDocument();
    expect(screen.getByText('This is a test event')).toBeInTheDocument();

    // this changes the buttons test to hide details
    expect(screen.getByRole('button', { name: 'Hide details' })).toBeInTheDocument();

    // this is another click that would hide
    fireEvent.click(screen.getByRole('button', { name: 'Hide details' }));
    expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
  });
});

test("placeholder", () => {
  expect(true).toBe(true);
});