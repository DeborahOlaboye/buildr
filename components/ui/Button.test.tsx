import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('applies variant and size classes', () => {
    render(<Button variant="destructive" size="sm">Delete</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-destructive');
    expect(btn).toHaveClass('h-9');
  });

  test('asChild renders custom component', () => {
    const LinkMock = ({children, ...props}: any) => <a {...props}>{children}</a>;
    render(<Button asChild><LinkMock>Link</LinkMock></Button>);
    expect(screen.getByText('Link').tagName).toBe('A');
  });
});
