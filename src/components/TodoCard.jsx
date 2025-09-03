import React, { useState } from 'react'
import { MoreHorizontal, MessageCircle, User } from 'lucide-react'
import { useTodo } from '../hooks/useTodo'
import PriorityBadge from './ui/PriorityBadge'

const TodoCard = ({ todo, onEdit, onViewDetails }) => {
  const { assignees, deleteTodo } = useTodo()
  const [showDropdown, setShowDropdown] = useState(false)

  const assignee = assignees.find(a => a.id === todo.assigneeId)
  const commentCount = todo.comments?.length || 0

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteTodo(todo.id)
    }
    setShowDropdown(false)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', todo.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = (e) => {
    e.dataTransfer.clearData()
  }

  return (
    <div 
      className="todo-card" 
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="todo-header">
        <div className="title-row">
          <h3 className="todo-title" onClick={() => onViewDetails(todo)}>
            {todo.title}
          </h3>
          <PriorityBadge priority={todo.priority} size="small" />
        </div>
        
        <div className="todo-menu">
          <button 
            className="menu-btn" 
            onClick={toggleDropdown}
            aria-label="More options"
          >
            <MoreHorizontal size={16} />
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => {
                onEdit(todo)
                setShowDropdown(false)
              }} className="dropdown-item">
                Edit
              </button>
              <button onClick={handleDelete} className="dropdown-item delete">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}

      <div className="todo-meta">
        <div className="todo-info">
          {assignee ? (
            <div className="assignee">
              <span className="avatar">{assignee.avatar}</span>
              <span className="name">{assignee.name}</span>
            </div>
          ) : (
            <div className="assignee unassigned">
              <User size={12} />
              <span>Unassigned</span>
            </div>
          )}
          
          <div className="todo-number">
            todo-kanban #{todo.id}
          </div>
        </div>

        <div className="todo-actions">
          {/* <StatusBadge status={todo.status} size="small" /> */}
          {commentCount > 0 && (
            <div className="comment-count">
              <MessageCircle size={14} />
              <span>{commentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoCard
