export const theme = {
  colors: {
    primary: '#58a6ff',
    primaryHover: '#2ea043',
    primaryLight: 'rgba(56, 139, 253, 0.15)',
    primaryLighter: 'rgba(56, 139, 253, 0.1)',
    primaryDark: '#1f6feb',
    
    bg: {
      primary: '#0d1117',
      secondary: '#161b22',
      tertiary: '#21262d',
      overlay: 'rgba(0, 0, 0, 0.6)',
    },
    
    text: {
      primary: '#f0f6fc',
      secondary: '#c9d1d9',
      muted: '#8b949e',
    },
    
    border: {
      primary: '#30363d',
      secondary: '#21262d',
    },
    
    button: {
      primary: '#238636',
      primaryHover: '#2ea043',
      danger: '#da3633',
      dangerHover: '#f85149',
    },
    
    status: {
      success: '#238636',
      successHover: '#2ea043',
      danger: '#f85149',
      dangerHover: '#da3633',
    },
    
    shadow: {
      default: 'rgba(0, 0, 0, 0.4)',
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.2)',
    },
    
    scrollbar: {
      default: 'rgba(139, 148, 158, 0.3)',
      hover: 'rgba(139, 148, 158, 0.6)',
      light: 'rgba(139, 148, 158, 0.2)',
      lightHover: 'rgba(139, 148, 158, 0.5)',
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },
  
  fontSize: {
    xs: '10px',
    sm: '11px',
    base: '12px',
    md: '13px',
    lg: '14px',
    xl: '16px',
    '2xl': '18px',
    '3xl': '20px',
    '4xl': '24px',
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
  },
  
  transition: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  
  zIndex: {
    dropdown: 9999,
    modal: 1000,
    tooltip: 100,
  },
}

// Helper function to get CSS custom property value
export const getCSSVariable = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName)
}

// Helper function to set CSS custom property value
export const setCSSVariable = (variableName, value) => {
  document.documentElement.style.setProperty(variableName, value)
}

export default theme
