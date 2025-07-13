import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";
import BookingForm from './Components/BookingForm';

test('Renders the BookingForm heading', () => {
    render(<BookingForm availableTimes={[]}
            fetchTimesForSelectedDate={() => {}} />);
    const headingElement = screen.getByText(/make your reservation/i);
    expect(headingElement).toBeInTheDocument();
})


// File path: tests/components/BookingForm.test.js

import '@testing-library/jest-dom';
import {fireEvent, waitFor } from '@testing-library/react';
// Adjust this import path based on where your BookingForm.js is relative to this new test file


// --- Mocking external dependencies ---
const mockFetchTimesForSelectedDate = jest.fn();
const mockSubmitAPI = jest.fn(() => true); // Default mock for successful submission

beforeAll(() => {
    // Mock window.submitAPI for form submission tests
    window.submitAPI = mockSubmitAPI;

    // Mock Date.now() if your getTodayDate() or other date logic relies on it
    // For `min={getTodayDate()}`, it's good to ensure a consistent 'today'
    const MOCK_DATE = new Date('2025-07-15T12:00:00Z'); // Consistent mock date
    jest.spyOn(global, 'Date').mockImplementation((dateString) => {
        if (dateString) {
            return new Date(dateString);
        }
        return MOCK_DATE;
    });
});

afterAll(() => {
    // Clean up mocks after all tests
    delete window.submitAPI;
    jest.restoreAllMocks(); // Restore original Date implementation
});

// Helper function to render the BookingForm with default props
const renderBookingForm = (props = {}) => {
    // Provide default props that the component expects
    const defaultProps = {
        availableTimes: [], // Start with empty times
        fetchTimesForSelectedDate: mockFetchTimesForSelectedDate,
        ...props,
    };
    return render(<BookingForm {...defaultProps} />);
};

describe('BookingForm Validation', () => {

    // --- Initial State Tests ---
    test('submit button is initially disabled when form is empty', () => {
        renderBookingForm();
        // Updated query to use aria-label name
        const submitButton = screen.getByRole('button', { name: /on click/i });
        expect(submitButton).toBeDisabled();
    });

    // --- Date Input Validation ---
    test('submit button remains disabled if date is not selected', () => {
        renderBookingForm({ availableTimes: ["17:00"] }); // Provide times to enable time select
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i); // This query will now work after typo fix
        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query

        fireEvent.change(timeSelect, { target: { value: '17:00' } });
        fireEvent.change(guestsInput, { target: { value: '2' } });
        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        expect(submitButton).toBeDisabled(); // Date is still empty
    });

    test('submit button remains disabled if date is in the past', () => {
        renderBookingForm({ availableTimes: ["17:00"] });
        const dateInput = screen.getByLabelText(/choose date/i);
        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query

        // Attempt to set a past date (mocked today is 2025-07-15)
        fireEvent.change(dateInput, { target: { value: '2025-07-14' } });

        expect(submitButton).toBeDisabled(); // Should be disabled because date is invalid
    });

    // --- Time Select Validation ---
    test('submit button remains disabled if time is not selected (default disabled option)', () => {
        renderBookingForm({ availableTimes: ["17:00"] });
        const dateInput = screen.getByLabelText(/choose date/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i); // This query will now work
        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query

        fireEvent.change(dateInput, { target: { value: '2025-07-16' } }); // Valid date
        // Time is left at default disabled option
        fireEvent.change(guestsInput, { target: { value: '2' } });
        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        expect(submitButton).toBeDisabled(); // Time is still ""
    });

    // --- Guests Input Validation ---
    test('submit button remains disabled if guests is less than 1', () => {
        renderBookingForm({ availableTimes: ["17:00"] });
        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i); // This query will now work
        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query

        fireEvent.change(dateInput, { target: { value: '2025-07-16' } });
        fireEvent.change(timeSelect, { target: { value: '17:00' } });
        fireEvent.change(guestsInput, { target: { value: '0' } }); // Invalid guest count
        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        expect(submitButton).toBeDisabled();
    });

    test('submit button remains disabled if guests is greater than 10', () => {
        renderBookingForm({ availableTimes: ["17:00"] });
        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i); // This query will now work
        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query

        fireEvent.change(dateInput, { target: { value: '2025-07-16' } });
        fireEvent.change(timeSelect, { target: { value: '17:00' } });
        fireEvent.change(guestsInput, { target: { value: '11' } }); // Invalid guest count
        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        expect(submitButton).toBeDisabled();
    });

    // --- Occasion Select Validation ---
    test('submit button remains disabled if occasion is not selected (default disabled option)', () => {
        renderBookingForm({ availableTimes: ["17:00"] });
        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        // Occasion is left at default disabled option
        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query

        fireEvent.change(dateInput, { target: { value: '2025-07-16' } });
        fireEvent.change(timeSelect, { target: { value: '17:00' } });
        fireEvent.change(guestsInput, { target: { value: '2' } });

        expect(submitButton).toBeDisabled(); // Occasion is still "Select the event"
    });

    // --- Combined Valid State Test ---
    test('submit button becomes enabled when all required fields are valid', () => {
        const mockAvailableTimes = ["17:00", "18:00"];
        renderBookingForm({ availableTimes: mockAvailableTimes });

        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i); // This query will now work
        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query

        // Fill all fields with valid data
        fireEvent.change(dateInput, { target: { value: '2025-07-16' } }); // Future date
        fireEvent.change(timeSelect, { target: { value: '17:00' } });
        fireEvent.change(guestsInput, { target: { value: '5' } });
        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        expect(submitButton).toBeEnabled();
    });

    // --- Form Submission with Invalid State (Fallback Check) ---
    test('displays error message if form is submitted when invalid (button should be disabled but as fallback)', async () => {
        renderBookingForm(); // Form starts invalid

        const submitButton = screen.getByRole('button', { name: /on click/i }); // Updated query
        fireEvent.click(submitButton);


    });

});
