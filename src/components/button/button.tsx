import { ButtonHTMLAttributes, ReactNode } from 'react';

// eslint-disable-next-line
export const availableButtonVariants = {
  // TODO: Change the lint rules
  default: 'bg-none',
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400',
  secondary:
    'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400',
} as const;

type ButtonVariant = keyof typeof availableButtonVariants; // Correct type

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  ariaLabel?: string;
  disabled?: boolean;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  ariaLabel = '',
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    'px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2';
  let variantClass = availableButtonVariants[variant];

  if (disabled) {
    variantClass += ' opacity-50 cursor-not-allowed';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantClass}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
