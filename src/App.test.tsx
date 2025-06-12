import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sequence alignment tool', () => {
  render(<App />);
  const titleElement = screen.getByText(/BIOCAD Sequence Alignment/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders input fields', () => {
  render(<App />);
  const firstSequenceInput = screen.getByLabelText(
    /Первая аминокислотная последовательность/i
  );
  const secondSequenceInput = screen.getByLabelText(
    /Вторая аминокислотная последовательность/i
  );

  expect(firstSequenceInput).toBeInTheDocument();
  expect(secondSequenceInput).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<App />);
  const submitButton = screen.getByRole('button', {
    name: /Показать выравнивание/i,
  });
  expect(submitButton).toBeInTheDocument();
});

test('renders instruction section', () => {
  render(<App />);
  const instructionElement = screen.getByText(/Инструкция:/i);
  expect(instructionElement).toBeInTheDocument();
});
