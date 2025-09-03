import { useTodo } from '../hooks/useTodo'
import TodoCard from './TodoCard'
import { Plus } from 'lucide-react'

const KanbanColumn = ({ 
  title, 
  subtitle, 
  color, 
  todos, 
  columnId, 
  onAddItem, 
  onEdit, 
  onViewDetails 
}) => {
  const { moveTodo } = useTodo()

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const todoId = parseInt(e.dataTransfer.getData('text/plain'))
    if (todoId) {
      moveTodo(todoId, columnId)
    }
  }

  const handleAddItem = () => {
    if (onAddItem) {
      onAddItem(columnId)
    }
  }

  return (
    <div className="kanban-column">
      <div className="column-header" style={{ borderTopColor: color }}>
        <div>
          <h3>{title}</h3>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
        <span className="todo-count">{todos.length}</span>
      </div>
      <div
        className="column-content"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div 
          className="todos-container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {todos.map(todo => (
            <TodoCard 
              key={todo.id} 
              todo={todo} 
              onEdit={onEdit}
              onViewDetails={onViewDetails}
            />
          ))}
          {todos.length === 0 && (
            <div className="empty-column">
              <p>No items here</p>
            </div>
          )}
        </div>
        <button className="add-item-btn" onClick={handleAddItem}>
          <Plus size={16} />
          Add item
        </button>
      </div>
    </div>
  )
}

export default KanbanColumn
