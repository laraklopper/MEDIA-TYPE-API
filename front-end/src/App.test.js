import React from "react";
import {render, screen} from '@testing-library/react';
import App from './App'

// Describe block to group tests related to the App component
describe('App', () => {
    test('render App component', () => {  // Test case to check if the App component renders successfully
        render(<App />)    // Render the App component
        expect(screen.getByText('API DATA')).toBeInTheDocument() })
 })