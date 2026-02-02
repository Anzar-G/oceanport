import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-gray-cool text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'input-field h-14',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/30',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';