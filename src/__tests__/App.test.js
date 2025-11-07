import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../App';


describe('<app /> component', () => {
    
test('renders list of events', () => {
       const AppDOM = render(<App />).container.firstChild;
       expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
     });

});