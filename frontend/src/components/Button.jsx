import React from 'react';
import './Button.css';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false,
  disabled = false,
  className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}