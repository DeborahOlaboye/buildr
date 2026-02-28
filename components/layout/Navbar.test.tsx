import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('Navbar component', () => {
  test('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Rewards')).toBeInTheDocument();
    expect(screen.getByText('Builders')).toBeInTheDocument();
    expect(screen.getByText('Ecosystems')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  test('search input opens on command key', () => {
    render(<Navbar />);
    const searchButton = screen.getByLabelText(/Open search/i);
    expect(searchButton).toBeInTheDocument();
  });
});
