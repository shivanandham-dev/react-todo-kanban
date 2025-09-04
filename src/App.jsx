import { useState, useEffect } from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { serviceFactory } from './services/ServiceFactory.js'
import { STATUS_TYPES } from './types/index.js'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [assignees] = useState(serviceFactory.getAssigneeService().getAllAssignees())

  // Get services from factory
  const todoService = serviceFactory.getTodoService()

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      setLoading(true)
      const savedTodos = todoService.loadTodos()
      if (savedTodos && savedTodos.length === 0) {
        // Add some sample todos if none exist
        const sampleTodos = [
          {
            id: 1,
            title: 'Implement drag and drop functionality',
            description: 'Add smooth drag and drop between columns for better UX',
            priority: 'high',
            assigneeId: 1,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            status: STATUS_TYPES.IN_PROGRESS,
            comments: [
              {
                id: 1,
                authorId: 1,
                content: 'This is looking great! The drag and drop feels smooth.',
                createdAt: new Date(Date.now() - 3600000).toISOString()
              }
            ]
          },
          {
            id: 2,
            title: 'Design responsive mobile layout',
            description: 'Ensure the app works well on mobile devices',
            priority: 'medium',
            assigneeId: 2,
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            status: STATUS_TYPES.TODO,
            comments: []
          },
          {
            id: 3,
            title: 'Add search and filtering',
            description: 'Implement search functionality to find todos quickly',
            priority: 'low',
            assigneeId: null,
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            status: STATUS_TYPES.BACKLOG,
            comments: []
          }
        ]
        setTodos(sampleTodos)
        todoService.saveTodos(sampleTodos)
      } else if (savedTodos) {
        setTodos(savedTodos)
      } else {
        setTodos([])
      }
    } catch (error) {
      console.error('Error loading todos:', error)
      setTodos([])
    } finally {
      setLoading(false)
    }
  }, [todoService])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!loading && todos.length > 0) {
      try {
        todoService.saveTodos(todos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
    }
  }, [todos, todoService, loading])

  const addTodo = (todo) => {
    const newTodo = todoService.createTodo(todo)
    setTodos(prev => [...prev, newTodo])
  }

  const updateTodo = (id, updates) => {
    setTodos(prev => todoService.updateTodo(prev, id, updates))
  }

  const deleteTodo = (id) => {
    setTodos(prev => todoService.deleteTodo(prev, id))
  }

  const moveTodo = (id, newStatus) => {
    setTodos(prev => todoService.moveTodo(prev, id, newStatus))
  }

  const closeTodo = (id) => {
    setTodos(prev => todoService.closeTodo(prev, id))
  }

  const reopenTodo = (id) => {
    setTodos(prev => todoService.reopenTodo(prev, id))
  }

  const addComment = (todoId, comment) => {
    setTodos(prev => todoService.addComment(prev, todoId, comment))
  }

  const updateComment = (todoId, commentId, updates) => {
    setTodos(prev => todoService.updateComment(prev, todoId, commentId, updates))
  }

  const deleteComment = (todoId, commentId) => {
    setTodos(prev => todoService.deleteComment(prev, todoId, commentId))
  }

  return (
    <div className="app">
      <main>
        <KanbanBoard 
          todos={todos}
          assignees={assignees}
          loading={loading}
          addTodo={addTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          moveTodo={moveTodo}
          closeTodo={closeTodo}
          reopenTodo={reopenTodo}
          addComment={addComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
        />
      </main>
    </div>
  )
}

export default App
