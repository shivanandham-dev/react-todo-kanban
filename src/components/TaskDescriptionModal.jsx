import { useState, useEffect } from 'react'
import { X, Calendar, User, AlertTriangle, Settings, Grid, ArrowUp, Link, Image, List, Code, Quote, AtSign, Hash, Bold, Italic, Trash2 } from 'lucide-react'
import { useTodo } from '../hooks/useTodo'
import { EditButton } from './ui'

const TaskDescriptionModal = ({ todo, onClose, onUpdate }) => {
  const { assignees, updateTodo, addComment, updateComment, deleteComment, closeTodo, reopenTodo } = useTodo()
  const [comment, setComment] = useState('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  
  // Local state to track current todo (gets updated when we make changes)
  const [currentTodo, setCurrentTodo] = useState(todo)
  
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    priority: todo.priority || 'medium',
    assigneeId: todo.assigneeId || ''
  })

  // Inline editing states for sidebar fields
  const [editingAssignee, setEditingAssignee] = useState(false)
  const [editingPriority, setEditingPriority] = useState(false)
  const [editingStatus, setEditingStatus] = useState(false)

  const priorityColors = {
    low: '#28a745',
    medium: '#f6a434',
    high: '#f85149'
  }

  // Update status when defaultStatus changes
  useEffect(() => {
    if (todo.defaultStatus) {
      setEditData(prev => ({ ...prev, status: todo.defaultStatus }))
    }
  }, [todo.defaultStatus])

  // Handle escape key to exit editing modes
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsEditingTitle(false)
        setIsEditingDescription(false)
        setEditingAssignee(false)
        setEditingPriority(false)
        setEditingStatus(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleTitleSave = () => {
    updateTodo(todo.id, { title: editData.title })
    setCurrentTodo(prev => ({ ...prev, title: editData.title }))
    setIsEditingTitle(false)
  }

  const handleTitleCancel = () => {
    setEditData(prev => ({ ...prev, title: todo.title }))
    setIsEditingTitle(false)
  }

  const handleDescriptionSave = () => {
    updateTodo(todo.id, { description: editData.description })
    setCurrentTodo(prev => ({ ...prev, description: editData.description }))
    setIsEditingDescription(false)
  }

  const handleDescriptionCancel = () => {
    setEditData(prev => ({ ...prev, description: todo.description }))
    setIsEditingDescription(false)
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      addComment(todo.id, {
        authorId: 1, // Default to first user for demo
        content: comment.trim()
      })
      setComment('')
    }
  }

  const handleCommentEdit = (commentId, content) => {
    updateComment(todo.id, commentId, { content })
    setEditingCommentId(null)
  }

  const handleCommentDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(todo.id, commentId)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  const getAuthorName = (authorId) => {
    const author = assignees.find(a => a.id === authorId)
    return author ? author.name : 'Unknown User'
  }

  const getAuthorAvatar = (authorId) => {
    const author = assignees.find(a => a.id === authorId)
    return author ? author.avatar : '👤'
  }

  // Inline editing functions
  const handleAssigneeEdit = () => {
    setEditingAssignee(true)
  }

  const handlePriorityEdit = () => {
    setEditingPriority(true)
  }

  const handleStatusEdit = () => {
    setEditingStatus(true)
  }

  const handleAssigneeChange = (assigneeId) => {
    const newAssigneeId = assigneeId ? parseInt(assigneeId) : null
    updateTodo(todo.id, { assigneeId: newAssigneeId })
    setCurrentTodo(prev => ({ ...prev, assigneeId: newAssigneeId }))
    setEditData(prev => ({ ...prev, assigneeId: newAssigneeId }))
    setEditingAssignee(false)
  }

  const handlePriorityChange = (priority) => {
    updateTodo(todo.id, { priority })
    setCurrentTodo(prev => ({ ...prev, priority }))
    setEditData(prev => ({ ...prev, priority }))
    setEditingPriority(false)
  }

  const handleStatusChange = (status) => {
    updateTodo(todo.id, { status })
    setCurrentTodo(prev => ({ ...prev, status }))
    setEditData(prev => ({ ...prev, status }))
    setEditingStatus(false)
  }

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="task-modal-header">
          <div className="task-modal-title">
            {isEditingTitle ? (
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="edit-title-input"
              />
            ) : (
              <h1>{currentTodo.title}</h1>
            )}
            <span className="task-number">#{todo.id}</span>
          </div>
          
          <div className="task-modal-actions">
            {isEditingTitle ? (
              <>
                <button className="btn-secondary" onClick={handleTitleCancel}>Cancel</button>
                <button className="btn-primary" onClick={handleTitleSave}>Save</button>
              </>
            ) : (
              <>
                <EditButton onClick={() => setIsEditingTitle(true)} size={16}>
                  Edit Title
                </EditButton>
                <button className="btn-secondary" onClick={onClose}>
                  <X size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="task-modal-body">
          {/* Left Content Panel */}
          <div className="task-content-panel">
            {/* Description */}
            <div className="task-description">
              <div className="task-author">
                <span className="avatar">{getAuthorAvatar(todo.assigneeId)}</span>
                <span className="author-name">{getAuthorName(todo.assigneeId)}</span>
                <span className="author-action">opened this {formatDate(todo.createdAt)}</span>
              </div>
              
              <div className="description-header">
                <h3>Description</h3>
                {!isEditingDescription && (
                  <EditButton 
                    onClick={() => setIsEditingDescription(true)}
                    className="description-edit-btn"
                  >
                    Edit
                  </EditButton>
                )}
              </div>
              
              {isEditingDescription ? (
                <div className="description-edit">
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                    className="edit-description-input"
                    placeholder="Add a description..."
                    rows="4"
                  />
                  <div className="description-edit-actions">
                    <button className="btn-secondary" onClick={handleDescriptionCancel}>
                      Cancel
                    </button>
                    <button className="btn-primary" onClick={handleDescriptionSave}>
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="description-text">
                  {currentTodo.description || 'No description provided.'}
                </div>
              )}
            </div>

            {/* Activity Feed */}
            <div className="task-activity">
              <div className="activity-item">
                <div className="activity-avatar">👤</div>
                <div className="activity-content">
                  <span className="activity-user">System</span>
                  <span className="activity-action">created this item {formatDate(todo.createdAt)}</span>
                </div>
              </div>
              {todo.status !== 'no-status' && (
                <div className="activity-item">
                  <div className="activity-avatar">📋</div>
                  <div className="activity-content">
                    <span className="activity-user">System</span>
                    <span className="activity-action">moved this to {todo.status.replace('-', ' ')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="task-comments">
              <h3 className="comments-title">Comments ({todo.comments?.length || 0})</h3>
              
              {/* Existing Comments */}
              {todo.comments && todo.comments.length > 0 && (
                <div className="comments-list">
                  {todo.comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <span className="avatar">{getAuthorAvatar(comment.authorId)}</span>
                        <span className="comment-author">{getAuthorName(comment.authorId)}</span>
                        <span className="comment-date">{formatDate(comment.createdAt)}</span>
                        <div className="comment-actions">
                          <EditButton 
                            onClick={() => setEditingCommentId(comment.id)}
                            size={14}
                            className="comment-action-btn"
                          />
                          <button 
                            className="comment-action-btn delete"
                            onClick={() => handleCommentDelete(comment.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {editingCommentId === comment.id ? (
                        <div className="comment-edit">
                          <textarea
                            value={comment.content}
                            onChange={(e) => updateComment(todo.id, comment.id, { content: e.target.value })}
                            className="comment-edit-input"
                            rows="3"
                          />
                          <div className="comment-edit-actions">
                            <button 
                              className="btn-secondary"
                              onClick={() => setEditingCommentId(null)}
                            >
                              Cancel
                            </button>
                            <button 
                              className="btn-primary"
                              onClick={() => handleCommentEdit(comment.id, comment.content)}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="comment-content">
                          {comment.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Comment */}
              <div className="task-comment-section">
                <div className="comment-header">
                  <span className="avatar">👤</span>
                  <div className="comment-tabs">
                    <button className="tab active">Write</button>
                    <button className="tab">Preview</button>
                  </div>
                </div>
                
                <div className="comment-toolbar">
                  <button className="toolbar-btn"><Hash size={14} /></button>
                  <button className="toolbar-btn"><Bold size={14} /></button>
                  <button className="toolbar-btn"><Italic size={14} /></button>
                  <button className="toolbar-btn"><List size={14} /></button>
                  <button className="toolbar-btn"><Code size={14} /></button>
                  <button className="toolbar-btn"><Link size={14} /></button>
                  <button className="toolbar-btn"><Image size={14} /></button>
                  <button className="toolbar-btn"><Quote size={14} /></button>
                  <button className="toolbar-btn"><AtSign size={14} /></button>
                </div>
                
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Use Markdown to format your comment"
                  className="comment-input"
                  rows="4"
                />
                
                <div className="comment-footer">
                  <div className="file-upload">
                    <Link size={14} />
                    <span>Paste, drop, or click to add files</span>
                  </div>
                  <div className="comment-actions">
                    {todo.status === 'closed' ? (
                      <button 
                        className="btn-secondary"
                        onClick={() => {
                          reopenTodo(todo.id)
                          if (onUpdate) onUpdate()
                        }}
                      >
                        Reopen item
                      </button>
                    ) : (
                      <button 
                        className="btn-secondary"
                        onClick={() => {
                          closeTodo(todo.id)
                          if (onUpdate) onUpdate()
                        }}
                      >
                        Close item
                      </button>
                    )}
                    <button className="btn-primary" onClick={handleCommentSubmit}>
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="task-sidebar">
            {/* Assignee */}
            <div className="sidebar-section">
              <div className="section-header">
                <User size={16} />
                <span>Assignees</span>
                <button className="settings-btn" onClick={handleAssigneeEdit}>
                  <Settings size={14} />
                </button>
              </div>
              <div className="section-content">
                {editingAssignee ? (
                  <div className="inline-edit">
                    <select
                      value={currentTodo.assigneeId || ''}
                      onChange={(e) => handleAssigneeChange(e.target.value)}
                      className="sidebar-select"
                    >
                      <option value="">Unassigned</option>
                      {assignees.map(assignee => (
                        <option key={assignee.id} value={assignee.id}>
                          {assignee.avatar} {assignee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="assignee-info">
                    {(() => {
                      const currentAssigneeId = editData.assigneeId !== undefined ? editData.assigneeId : todo.assigneeId;
                      const currentAssignee = assignees.find(a => a.id === currentAssigneeId);
                      return currentAssignee ? (
                        <>
                          <span className="avatar">{currentAssignee.avatar}</span>
                          <span>{currentAssignee.name}</span>
                        </>
                      ) : (
                        <span className="unassigned">No one - Assign yourself</span>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Priority */}
            <div className="sidebar-section">
              <div className="section-header">
                <AlertTriangle size={16} />
                <span>Priority</span>
                <button className="settings-btn" onClick={handlePriorityEdit}>
                  <Settings size={14} />
                </button>
              </div>
              <div className="section-content">
                {editingPriority ? (
                  <div className="inline-edit">
                    <select
                      value={currentTodo.priority}
                      onChange={(e) => handlePriorityChange(e.target.value)}
                      className="sidebar-select"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                ) : (
                  <div className="priority-info">
                    {(editData.priority || todo.priority) && (
                      <span
                        className="priority-badge"
                        style={{ backgroundColor: priorityColors[editData.priority || todo.priority] }}
                      >
                        {editData.priority || todo.priority}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="sidebar-section">
              <div className="section-header">
                <Grid size={16} />
                <span>Status</span>
                <button className="settings-btn" onClick={handleStatusEdit}>
                  <Settings size={14} />
                </button>
              </div>
              <div className="section-content">
                {editingStatus ? (
                  <div className="inline-edit">
                    <select
                      value={currentTodo.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="sidebar-select"
                    >
                      <option value="no-status">No Status</option>
                      <option value="backlog">Backlog</option>
                      <option value="in-design">In Design</option>
                      <option value="ready-to-estimate">Ready to Estimate</option>
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                ) : (
                  <div className="status-info">
                    <span className="status-badge">{(editData.status || todo.status).replace('-', ' ')}</span>
                    <ArrowUp size={14} />
                  </div>
                )}
              </div>
            </div>

            {/* Created Date */}
            <div className="sidebar-section">
              <div className="section-header">
                <Calendar size={16} />
                <span>Created</span>
              </div>
              <div className="section-content">
                <span className="date-info">{new Date(todo.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Development */}
            <div className="sidebar-section">
              <div className="section-header">
                <Code size={16} />
                <span>Development</span>
              </div>
              <div className="section-content">
                <div className="dev-links">
                  <a href="#" className="dev-link">Create a branch for this issue</a>
                  <span> or </span>
                  <a href="#" className="dev-link">link a pull request</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDescriptionModal
