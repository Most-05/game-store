import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { BalanceProvider } from '../BalanceContext';
import '@testing-library/jest-dom';

const renderWithContext = (ui, { route = '/Home' } = {}) => {
    return render(
        <BalanceProvider>
            <MemoryRouter initialEntries={[route]}>
                {ui}
            </MemoryRouter>
        </BalanceProvider>
    );
};

describe('Header Component', () => {
    test('renders only on /Home route', () => {
        const { container } = renderWithContext(<Header />, { route: '/other' });
        expect(container.firstChild).toBeNull();
    });

    test('renders on /Home route', () => {
        renderWithContext(<Header />, { route: '/Home' });
        expect(screen.getByText(/Game Store/i)).toBeInTheDocument();
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /^Game$/i })).toBeInTheDocument();
        expect(screen.getByText(/เติมเงิน/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /coin/i })).toBeInTheDocument();
    });

    test('toggles coin balance display when Coin is clicked', () => {
        renderWithContext(<Header />, { route: '/Home' });
        
        // Balance is initially hidden
        expect(screen.queryByText(/Coin: \$/i)).toBeNull();
        
        // Click Coin link
        fireEvent.click(screen.getByRole('link', { name: /coin/i }));
        
        // Balance should be visible (initial is 0)
        expect(screen.getByText(/Coin: \$0/i)).toBeInTheDocument();
        
        // Click again
        fireEvent.click(screen.getByRole('link', { name: /coin/i }));
        
        // Balance is hidden again
        expect(screen.queryByText(/Coin: \$/i)).toBeNull();
    });
});
