import React from 'react'

const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder, 
  error, 
  required = false,
  className = '',
  ...props 
}) => {
  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={`form-select ${error ? 'error' : ''}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default Select
