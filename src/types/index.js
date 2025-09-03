// Type definitions for the Todo application

export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
}

export const STATUS_TYPES = {
  NO_STATUS: 'no-status',
  BACKLOG: 'backlog',
  IN_DESIGN: 'in-design',
  READY_TO_ESTIMATE: 'ready-to-estimate',
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  CLOSED: 'closed'
}

export const COLUMN_CONFIG = [
  { 
    id: STATUS_TYPES.NO_STATUS, 
    title: 'No Status', 
    color: '#8b949e',
    subtitle: 'Unassigned items'
  },
  { 
    id: STATUS_TYPES.BACKLOG, 
    title: 'Backlog', 
    color: '#f85149',
    subtitle: 'Items to be reviewed'
  },
  { 
    id: STATUS_TYPES.IN_DESIGN, 
    title: 'In Design', 
    color: '#f6a434',
    subtitle: 'Needs Tech Architecting & UX/UI'
  },
  { 
    id: STATUS_TYPES.READY_TO_ESTIMATE, 
    title: 'Ready to Estimate', 
    color: '#6f42c1',
    subtitle: 'Ready to review and scope'
  },
  { 
    id: STATUS_TYPES.TODO, 
    title: 'Todo', 
    color: '#0366d6',
    subtitle: 'This item hasn\'t been started'
  },
  { 
    id: STATUS_TYPES.IN_PROGRESS, 
    title: 'In Progress', 
    color: '#28a745',
    subtitle: 'This is actively being worked on'
  },
  { 
    id: STATUS_TYPES.CLOSED, 
    title: 'Closed', 
    color: '#656d76',
    subtitle: 'Completed items'
  }
]

export const PRIORITY_OPTIONS = [
  { value: PRIORITY_LEVELS.HIGH, label: 'High' },
  { value: PRIORITY_LEVELS.MEDIUM, label: 'Medium' },
  { value: PRIORITY_LEVELS.LOW, label: 'Low' }
]

export const STATUS_OPTIONS = COLUMN_CONFIG.map(column => ({
  value: column.id,
  label: column.title
}))
