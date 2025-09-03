import React, { useState, useEffect } from 'react'
import { useTodo } from '../hooks/useTodo'
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../types/index.js'
import Modal from './ui/Modal'
import Input from './ui/Input'
import Select from './ui/Select'
import Button from './ui/Button'

const TodoFormModal = ({ 
  isOpen, 
  onClose, 
  mode = 'add', // 'add' or 'edit'
  todo = null, // Required for edit mode
  defaultStatus = 'no-status',
  onSuccess 
}) => {
  const { addTodo, updateTodo, assignees } = useTodo()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assigneeId: '',
    status: defaultStatus
  })

  // Update form data when todo changes (for edit mode)
  useEffect(() => {
    if (mode === 'edit' && todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
        assigneeId: todo.assigneeId ? todo.assigneeId.toString() : '',
        status: todo.status || 'no-status'
      })
    } else if (mode === 'add') {
      // Reset form for add mode
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        assigneeId: '',
        status: defaultStatus
      })
    }
  }, [mode, todo, defaultStatus])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const todoData = {
      ...formData,
      assigneeId: formData.assigneeId ? parseInt(formData.assigneeId) : null
    }

    if (mode === 'edit' && todo) {
      updateTodo(todo.id, todoData)
    } else {
      addTodo(todoData)
    }

    if (onSuccess) {
      onSuccess()
    }
    onClose()
  }

  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    ...assignees.map(assignee => ({
      value: assignee.id.toString(),
      label: assignee.name
    }))
  ]

  const modalTitle = mode === 'edit' ? 'Edit Item' : 'Add New Item'
  const submitButtonText = mode === 'edit' ? 'Update Item' : 'Add Item'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="todo-form">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter item title"
          required
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter item description"
          type="textarea"
        />

        <div className="form-row">
          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={PRIORITY_OPTIONS}
          />

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
          />
        </div>

        <Select
          label="Assignee"
          name="assigneeId"
          value={formData.assigneeId}
          onChange={handleChange}
          options={assigneeOptions}
        />

        <div className="form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TodoFormModal
