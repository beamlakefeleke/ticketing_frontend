// src/components/ui/button.js
import React from 'react';

export const Button = ({ children, className, ...props }) => {
    return (
        <button
            className={`px-4 py-2 rounded-2xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
