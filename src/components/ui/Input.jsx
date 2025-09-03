import React from 'react'

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  className = '',
  ...props 
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
  
  if (type === 'textarea') {
    return (
      <div className={`form-group ${className}`}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <textarea
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input form-textarea ${error ? 'error' : ''}`}
          rows={4}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    )
  }
  
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default Input
