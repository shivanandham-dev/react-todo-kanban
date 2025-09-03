import React from 'react'
import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'

const PriorityBadge = ({ priority, size = 'medium', showIcon = true }) => {
  const priorityConfig = {
    high: {
      label: 'HIGH',
      color: '#f85149',
      icon: AlertTriangle,
      bgColor: '#f85149'
    },
    medium: {
      label: 'MEDIUM',
      color: '#f6a434',
      icon: Clock,
      bgColor: '#f6a434'
    },
    low: {
      label: 'LOW',
      color: '#28a745',
      icon: CheckCircle,
      bgColor: '#28a745'
    },
    none: {
      label: 'NONE',
      color: '#656d76',
      icon: XCircle,
      bgColor: '#656d76'
    }
  }

  const config = priorityConfig[priority] || priorityConfig.none
  const IconComponent = config.icon

  const sizeClasses = {
    small: 'priority-badge-sm',
    medium: 'priority-badge-md',
    large: 'priority-badge-lg'
  }

  return (
    <span 
      className={`priority-badge ${sizeClasses[size]}`}
      style={{ 
        backgroundColor: config.bgColor,
        color: '#ffffff'
      }}
    >
      {showIcon && <IconComponent size={14} />}
      <span>{config.label}</span>
    </span>
  )
}

export default PriorityBadge
