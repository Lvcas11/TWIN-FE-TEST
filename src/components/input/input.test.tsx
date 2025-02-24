import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    label: 'Test Label',
    id: 'test-input',
    type: 'text',
    name: 'testName',
    value: '',
    onChange: mockOnChange,
  };

  it('renders the input with the correct label', () => {
    render(<Input {...defaultProps} />);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('renders the input field with the correct attributes', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'testName');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('');
  });

  it('calls the onChange handler when the input value changes', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('applies the required attribute when required is true', () => {
    render(<Input {...defaultProps} required />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('applies the data-testid attribute when provided', () => {
    render(<Input {...defaultProps} data-testid="test-input-id" />);

    const input = screen.getByTestId('test-input-id');
    expect(input).toBeInTheDocument();
  });

  it('applies the aria-describedby attribute when provided', () => {
    render(<Input {...defaultProps} aria-describedby="error-message" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'error-message');
  });

  it('applies additional className when provided', () => {
    render(<Input {...defaultProps} className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('renders the input with the correct value', () => {
    render(<Input {...defaultProps} value="Test Value" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Test Value');
  });

  it('renders the input with dark mode classes', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('dark:bg-gray-700');
    expect(input).toHaveClass('dark:border-gray-600');
    expect(input).toHaveClass('dark:text-white');
    expect(input).toHaveClass('dark:placeholder-gray-400');
  });
});
