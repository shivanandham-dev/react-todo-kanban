import React from 'react'

const StatusBadge = ({ status, size = 'medium' }) => {
  const statusConfig = {
    'no-status': {
      label: 'No Status',
      color: '#8b949e',
      bgColor: '#21262d'
    },
    'backlog': {
      label: 'Backlog',
      color: '#f85149',
      bgColor: '#21262d'
    },
    'in-design': {
      label: 'In Design',
      color: '#f6a434',
      bgColor: '#21262d'
    },
    'ready-to-estimate': {
      label: 'Ready to Estimate',
      color: '#6f42c1',
      bgColor: '#21262d'
    },
    'todo': {
      label: 'Todo',
      color: '#0366d6',
      bgColor: '#21262d'
    },
    'in-progress': {
      label: 'In Progress',
      color: '#28a745',
      bgColor: '#21262d'
    },
    'closed': {
      label: 'Closed',
      color: '#656d76',
      bgColor: '#21262d'
    }
  }

  const config = statusConfig[status] || statusConfig['no-status']

  const sizeClasses = {
    small: 'status-badge-sm',
    medium: 'status-badge-md',
    large: 'status-badge-lg'
  }

  return (
    <span 
      className={`status-badge ${sizeClasses[size]}`}
      style={{ 
        backgroundColor: config.bgColor,
        color: config.color,
        border: `1px solid ${config.color}`
      }}
    >
      {config.label}
    </span>
  )
}

export default StatusBadge
