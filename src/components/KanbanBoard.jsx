import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTodo } from '../hooks/useTodo'
import { useSearch } from '../hooks/useSearch.js'
import { COLUMN_CONFIG } from '../types/index.js'
import KanbanColumn from './KanbanColumn'
import TodoFormModal from './TodoFormModal'
import TaskDescriptionModal from './TaskDescriptionModal'
import SearchBar from './SearchBar'

const KanbanBoard = () => {
  const { todos, loading } = useTodo()
  const { searchTerm, filteredItems, updateSearchTerm } = useSearch(todos)
  
  const [showFormModal, setShowFormModal] = useState(false)
  const [formModalMode, setFormModalMode] = useState('add') // 'add' or 'edit'
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [addToColumn, setAddToColumn] = useState(null)

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

  // Show loading state while todos are being loaded
  if (loading) {
    return (
      <div className="kanban-board">
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Ensure filteredItems is always an array
  const safeFilteredTodos = filteredItems || []

  return (
    <div className="kanban-board">
      <div className="board-header">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={updateSearchTerm}
        />
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

      <div className="board-columns" style={{ gridTemplateColumns: `repeat(${COLUMN_CONFIG.length}, 1fr)` }}>
        {COLUMN_CONFIG.map(column => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            subtitle={column.subtitle}
            color={column.color}
            todos={safeFilteredTodos.filter(todo => todo.status === column.id)}
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
