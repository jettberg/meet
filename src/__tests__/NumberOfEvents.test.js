import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let input;
  let user;

  beforeEach(() => {
    render(<NumberOfEvents
      setCurrentNOE={jest.fn()}
      setErrorAlert={jest.fn()}
    />);
    input = screen.getByRole('textbox');
    user = userEvent.setup();
  });

  test('contains an element with role textbox', () => {
    expect(input).toBeInTheDocument();
  });

  test('default value of input is 32', () => {
    expect(input.value).toBe('32');
  });

  test('typing into input changes its value', async () => {
    await user.clear(input);
    await user.type(input, '10');
    expect(input.value).toBe('10');
  });
});