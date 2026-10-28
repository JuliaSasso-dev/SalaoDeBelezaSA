import React from 'react';
import './InputField.css';

export default function InputField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className = ''
}) {
  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`input-element ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}