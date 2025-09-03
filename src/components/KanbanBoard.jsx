import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useTodo } from '../hooks/useTodo'
import KanbanColumn from './KanbanColumn'
import TodoFormModal from './TodoFormModal'
import TaskDescriptionModal from './TaskDescriptionModal'

const KanbanBoard = () => {
  const { todos } = useTodo()
  const [showFormModal, setShowFormModal] = useState(false)
  const [formModalMode, setFormModalMode] = useState('add') // 'add' or 'edit'
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [addToColumn, setAddToColumn] = useState(null)

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { 
      id: 'no-status', 
      title: 'No Status', 
      color: '#8b949e',
      subtitle: 'Unassigned items'
    },
    { 
      id: 'backlog', 
      title: 'Backlog', 
      color: '#f85149',
      subtitle: 'Items to be reviewed'
    },
    { 
      id: 'in-design', 
      title: 'In Design', 
      color: '#f6a434',
      subtitle: 'Needs Tech Architecting & UX/UI'
    },
    { 
      id: 'ready-to-estimate', 
      title: 'Ready to Estimate', 
      color: '#6f42c1',
      subtitle: 'Ready to review and scope'
    },
    { 
      id: 'todo', 
      title: 'Todo', 
      color: '#0366d6',
      subtitle: 'This item hasn\'t been started'
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      color: '#28a745',
      subtitle: 'This is actively being worked on'
    },
    { 
      id: 'closed', 
      title: 'Closed', 
      color: '#656d76',
      subtitle: 'Completed items'
    }
  ]

  const handleAddItem = (columnId) => {
    setAddToColumn(columnId)
    setFormModalMode('add')
    setShowFormModal(true)
  }



  const handleEditTodo = (todo) => {
    setSelectedTodo(todo)
    setFormModalMode('edit')
    setShowFormModal(true)
  }

  const handleViewDetails = (todo) => {
    setSelectedTodo(todo)
    setShowTaskModal(true)
  }

  const handleTaskModalClose = () => {
    setShowTaskModal(false)
    setSelectedTodo(null)
  }

  const handleTaskModalUpdate = () => {
    setShowTaskModal(false)
    setSelectedTodo(null)
  }

  const handleFormModalClose = () => {
    setShowFormModal(false)
    setSelectedTodo(null)
  }

  return (
    <div className="kanban-board">
      <div className="board-header">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Q Filter by keyword or by field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button
          className="add-todo-btn"
          onClick={() => {
            setFormModalMode('add')
            setShowFormModal(true)
          }}
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="board-columns" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            subtitle={column.subtitle}
            color={column.color}
            todos={filteredTodos.filter(todo => todo.status === column.id)}
            columnId={column.id}
            onAddItem={handleAddItem}
            onEdit={handleEditTodo}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {showFormModal && (
        <TodoFormModal
          isOpen={showFormModal}
          onClose={handleFormModalClose}
          mode={formModalMode}
          todo={formModalMode === 'edit' ? selectedTodo : null}
          defaultStatus={addToColumn}
          onSuccess={() => setShowFormModal(false)}
        />
      )}

      {showTaskModal && selectedTodo && (
        <TaskDescriptionModal
          todo={selectedTodo}
          onClose={handleTaskModalClose}
          onUpdate={handleTaskModalUpdate}
        />
      )}
    </div>
  )
}

export default KanbanBoard
