import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { availableButtonVariants } from './button';

describe('Button Component', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
  });

  Object.keys(availableButtonVariants).forEach((variant) => {
    test('renders different variants correctly', () => {
      render(
        <Button variant={variant as keyof typeof availableButtonVariants}>
          Test
        </Button>,
      );
      const button = screen.getByRole('button', { name: /test/i });
      expect(button).toHaveClass(
        availableButtonVariants[
          variant as keyof typeof availableButtonVariants
        ],
      );
    });
  });

  test('calls onClick function when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50 cursor-not-allowed');
  });

  test('renders with correct aria-label', () => {
    render(<Button ariaLabel="Custom Label">Test</Button>);
    const button = screen.getByLabelText(/custom label/i);

    expect(button).toBeInTheDocument();
  });
});
