import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium transition-all duration-300 rounded-none uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none';
  
  const variants = {
    primary: 'bg-navy text-white hover:bg-charcoal focus:ring-2 focus:ring-accent-gold focus:ring-offset-2',
    secondary: 'bg-accent-gold text-navy hover:bg-gold focus:ring-2 focus:ring-navy focus:ring-offset-2',
    outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white focus:ring-2 focus:ring-accent-gold focus:ring-offset-2',
    ghost: 'text-navy hover:bg-warm-white focus:ring-2 focus:ring-accent-gold focus:ring-offset-2',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
