import { useState, useEffect } from 'react'
import { TodoContext } from './TodoContext.js'
import TodoService from '../services/TodoService'

// Initialize the service
const todoService = new TodoService()

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [assignees] = useState([
    { id: 1, name: 'John Doe', avatar: '👨‍💻' },
    { id: 2, name: 'Jane Smith', avatar: '👩‍💻' },
    { id: 3, name: 'Bob Johnson', avatar: '👨‍💼' },
    { id: 4, name: 'Alice Brown', avatar: '👩‍🎨' },
  ])

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = todoService.loadTodos()
    if (savedTodos.length === 0) {
      // Add some sample todos if none exist
      const sampleTodos = [
        {
          id: 1,
          title: 'Implement drag and drop functionality',
          description: 'Add smooth drag and drop between columns for better UX',
          priority: 'high',
          assigneeId: 1,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'in-progress',
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
          status: 'todo',
          comments: []
        },
        {
          id: 3,
          title: 'Add search and filtering',
          description: 'Implement search functionality to find todos quickly',
          priority: 'low',
          assigneeId: null,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          status: 'backlog',
          comments: []
        }
      ]
      setTodos(sampleTodos)
      todoService.saveTodos(sampleTodos)
    } else {
      setTodos(savedTodos)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    todoService.saveTodos(todos)
  }, [todos])

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

  const value = {
    todos,
    assignees,
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
    closeTodo,
    reopenTodo,
    addComment,
    updateComment,
    deleteComment
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}
