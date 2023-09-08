import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'pages/App';
import React from 'react';

describe('CORRECT RENDERING', () => {
  test('renders input', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/what needs to be done?/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('default filter selected', () => {
    render(<App />);
    const buttonElement = screen.getByTestId('display-all');
    expect(buttonElement).toHaveClass('container__filterButton_active');
  });
});

describe('MAIN FUNCTIONS', () => {
  test('adds a new todo', () => {
    render(<App />);

    expect(screen.queryByTestId('list-item')).not.toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText(/what needs to be done?/i);

    userEvent.type(inputElement, 'Test');
    expect(inputElement).toHaveValue('Test');
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();

    fireEvent.keyDown(inputElement, { key: 'Enter' });
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  test('shows active todos', () => {
    render(<App />);

    const activeFilter = screen.getByTestId('active-todos');
    fireEvent.click(activeFilter);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  test('completes a todo', () => {
    render(<App />);

    const label = screen.getByText(/test/i);
    const checkbox = screen.getByRole('checkbox');

    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    fireEvent.click(label);
    expect(checkbox).toBeChecked();
  });

  test('clears completed todos', () => {
    render(<App />);

    const clearButton = screen.getByTestId('clear-all');
    expect(screen.getByTestId('list-item')).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(screen.queryByTestId('list-item')).not.toBeInTheDocument();
  });
});

describe('SNAPSHOT TESTS', () => {
  test('main page should not change', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
