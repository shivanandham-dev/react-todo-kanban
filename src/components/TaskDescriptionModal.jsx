import { useState, useEffect } from 'react'
import { X, Edit, Calendar, User, AlertTriangle, Settings, Grid, ArrowUp, Link, Image, List, Code, Quote, AtSign, Hash, Bold, Italic, Trash2 } from 'lucide-react'
import { useTodo } from '../hooks/useTodo'

const TaskDescriptionModal = ({ todo, onClose, onUpdate }) => {
  const { assignees, updateTodo, addComment, updateComment, deleteComment, closeTodo, reopenTodo } = useTodo()
  const [comment, setComment] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    priority: todo.priority || 'medium',
    assigneeId: todo.assigneeId || ''
  })

  const assignee = assignees.find(a => a.id === todo.assigneeId)
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

  const handleSave = () => {
    updateTodo(todo.id, editData)
    setIsEditing(false)
    if (onUpdate) onUpdate()
  }

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority || 'medium',
      assigneeId: todo.assigneeId || ''
    })
    setIsEditing(false)
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

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="task-modal-header">
          <div className="task-modal-title">
            {isEditing ? (
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="edit-title-input"
              />
            ) : (
              <h1>{todo.title}</h1>
            )}
            <span className="task-number">#{todo.id}</span>
          </div>
          
          <div className="task-modal-actions">
            {isEditing ? (
              <>
                <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn-primary" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                  <Edit size={16} />
                  Edit
                </button>
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
              
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  className="edit-description-input"
                  placeholder="Add a description..."
                  rows="4"
                />
              ) : (
                <div className="description-text">
                  {todo.description || 'No description provided.'}
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
                          <button 
                            className="comment-action-btn"
                            onClick={() => setEditingCommentId(comment.id)}
                          >
                            <Edit size={14} />
                          </button>
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
                <button className="settings-btn">
                  <Settings size={14} />
                </button>
              </div>
              <div className="section-content">
                {isEditing ? (
                  <select
                    value={editData.assigneeId}
                    onChange={(e) => setEditData(prev => ({ ...prev, assigneeId: e.target.value ? parseInt(e.target.value) : null }))}
                    className="sidebar-select"
                  >
                    <option value="">Unassigned</option>
                    {assignees.map(assignee => (
                      <option key={assignee.id} value={assignee.id}>
                        {assignee.avatar} {assignee.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="assignee-info">
                    {assignee ? (
                      <>
                        <span className="avatar">{assignee.avatar}</span>
                        <span>{assignee.name}</span>
                      </>
                    ) : (
                      <span className="unassigned">No one - Assign yourself</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Priority */}
            <div className="sidebar-section">
              <div className="section-header">
                <AlertTriangle size={16} />
                <span>Priority</span>
                <button className="settings-btn">
                  <Settings size={14} />
                </button>
              </div>
              <div className="section-content">
                {isEditing ? (
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
                    className="sidebar-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                ) : (
                  <div className="priority-info">
                    {todo.priority && (
                      <span
                        className="priority-badge"
                        style={{ backgroundColor: priorityColors[todo.priority] }}
                      >
                        {todo.priority}
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
                <button className="settings-btn">
                  <Settings size={14} />
                </button>
              </div>
              <div className="section-content">
                <div className="status-info">
                  <span className="status-badge">{todo.status.replace('-', ' ')}</span>
                  <ArrowUp size={14} />
                </div>
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
