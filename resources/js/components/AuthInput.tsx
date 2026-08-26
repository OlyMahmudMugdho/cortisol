import React, { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export default function AuthInput({
    error,
    className = '',
    ...props
}: AuthInputProps) {
    return (
        <div>
            <input
                className={`block w-full rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder-gray-500 transition-colors hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none ${className}`}
                {...props}
            />
            {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
        </div>
    );
}
