import { render, screen } from '@testing-library/react';
import App from './App';

test('renders user name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Bijoy/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders course name on the page', () => {
  render(<App />);
  const courseElement = screen.getByText(/Enterprise computing course/i);
  expect(courseElement).toBeInTheDocument();
});