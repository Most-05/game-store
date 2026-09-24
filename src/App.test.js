import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  const storeHeader = screen.getByRole('heading', { name: /game store/i });
  expect(storeHeader).toBeInTheDocument();
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});
