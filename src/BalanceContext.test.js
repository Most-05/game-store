import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BalanceContext, BalanceProvider } from './BalanceContext';
import '@testing-library/jest-dom';

const TestComponent = () => {
    const { balance, updateBalance, decreaseBalance } = useContext(BalanceContext);
    return (
        <div>
            <div data-testid="balance">{balance}</div>
            <button onClick={() => updateBalance(100)}>Set to 100</button>
            <button onClick={() => decreaseBalance(30)}>Decrease by 30</button>
            <button onClick={() => decreaseBalance(200)}>Decrease by 200</button>
        </div>
    );
};

describe('BalanceContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('initial balance should be 0 if localStorage is empty', () => {
        render(
            <BalanceProvider>
                <TestComponent />
            </BalanceProvider>
        );
        expect(screen.getByTestId('balance').textContent).toBe('0');
    });

    test('initial balance should load from localStorage', () => {
        localStorage.setItem('balance', '500');
        render(
            <BalanceProvider>
                <TestComponent />
            </BalanceProvider>
        );
        expect(screen.getByTestId('balance').textContent).toBe('500');
    });

    test('updateBalance should set new balance and update localStorage', () => {
        render(
            <BalanceProvider>
                <TestComponent />
            </BalanceProvider>
        );
        fireEvent.click(screen.getByText('Set to 100'));
        expect(screen.getByTestId('balance').textContent).toBe('100');
        expect(localStorage.getItem('balance')).toBe('100');
    });

    test('decreaseBalance should subtract amount if balance is sufficient', () => {
        localStorage.setItem('balance', '100');
        render(
            <BalanceProvider>
                <TestComponent />
            </BalanceProvider>
        );
        fireEvent.click(screen.getByText('Decrease by 30'));
        expect(screen.getByTestId('balance').textContent).toBe('70');
        expect(localStorage.getItem('balance')).toBe('70');
    });

    test('decreaseBalance should not subtract amount if balance is insufficient', () => {
        localStorage.setItem('balance', '100');
        render(
            <BalanceProvider>
                <TestComponent />
            </BalanceProvider>
        );
        fireEvent.click(screen.getByText('Decrease by 200'));
        // Balance remains unchanged
        expect(screen.getByTestId('balance').textContent).toBe('100');
        expect(localStorage.getItem('balance')).toBe('100');
    });
});
