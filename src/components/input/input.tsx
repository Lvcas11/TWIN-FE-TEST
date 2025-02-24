import React from 'react';

interface InputProps {
  label: string;
  id: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  'data-testid'?: string;
  'aria-describedby'?: string;
  className?: string;
}

/**
 * A reusable Input component that includes a label and an input field.
 *
 * @param props - The props for the Input component.
 * @param props.label - The label text for the input field.
 * @param props.id - The unique ID for the input field. This should match the `htmlFor` attribute of the label.
 * @param props.type - The type of the input field (e.g., 'text', 'number', 'email').
 * @param props.name - The name of the input field. This is used when the form is submitted.
 * @param props.value - The value of the input field.
 * @param props.onChange - Callback function that is called when the input value changes.
 * @param props.required - Whether the input field is required. Defaults to `false`.
 * @param props.data-testid - A test ID for the input field. This is used for testing purposes.
 * @param props.aria-describedby - The ID of the element that describes the input field (e.g., an error message).
 * @param props.className - Additional CSS classes to apply to the input field.
 * @returns A React element representing the Input component.
 */

const Input = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  required = false,
  'data-testid': dataTestId,
  'aria-describedby': ariaDescribedBy,
  className = '',
}: InputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${className}`}
        required={required}
        data-testid={dataTestId}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
};

export default Input;
