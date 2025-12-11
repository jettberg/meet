import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents />', () => {
  test('contains an element with role textbox', () => {
    render(<NumberOfEvents />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('default value of input is 32', () => {
    render(<NumberOfEvents />);
    const input = screen.getByRole('textbox');

    expect(input.value).toBe('32' || 32);
  });

  test('typing into input changes its value', async () => {
    render(<NumberOfEvents />);
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');

    // this clears and waits for 10 input
    await user.type(input, '{backspace}{backspace}10');

    expect(input.value).toBe('10');
  });
});

test("placeholder", () => {
  expect(true).toBe(true);
});