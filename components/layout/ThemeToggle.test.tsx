import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';

jest.mock('@/components/ThemeProvider', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  test('toggles theme on click', () => {
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light', setTheme });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
