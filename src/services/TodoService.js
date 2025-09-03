import { ITodoService } from '../interfaces/ITodoService.js'
import { StorageService } from './StorageService.js'
import { STATUS_TYPES } from '../types/index.js'

class TodoService extends ITodoService {
  constructor(storageKey = 'todos') {
    super()
    this.storageService = new StorageService(storageKey)
  }

  // Data persistence methods
  loadTodos() {
    const todos = this.storageService.load()
    return todos || []
  }

  saveTodos(todos) {
    return this.storageService.save(todos)
  }

  // Todo CRUD operations
  createTodo(todoData) {
    return {
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      status: STATUS_TYPES.NO_STATUS,
      comments: [],
      ...todoData
    }
  }

  updateTodo(todos, id, updates) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    )
  }

  deleteTodo(todos, id) {
    return todos.filter(todo => todo.id !== id)
  }

  // Todo status operations
  moveTodo(todos, id, newStatus) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus } : todo
    )
  }

  closeTodo(todos, id) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, status: STATUS_TYPES.CLOSED, closedAt: new Date().toISOString() } : todo
    )
  }

  reopenTodo(todos, id) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, status: STATUS_TYPES.NO_STATUS, closedAt: null } : todo
    )
  }

  // Comment operations
  addComment(todos, todoId, comment) {
    const newComment = {
      id: this.generateId(),
      authorId: comment.authorId,
      content: comment.content,
      createdAt: new Date().toISOString()
    }

    return todos.map(todo => 
      todo.id === todoId 
        ? { ...todo, comments: [...(todo.comments || []), newComment] }
        : todo
    )
  }

  updateComment(todos, todoId, commentId, updates) {
    return todos.map(todo => 
      todo.id === todoId 
        ? {
            ...todo,
            comments: (todo.comments || []).map(comment =>
              comment.id === commentId ? { ...comment, ...updates } : comment
            )
          }
        : todo
    )
  }

  deleteComment(todos, todoId, commentId) {
    return todos.map(todo => 
      todo.id === todoId 
        ? {
            ...todo,
            comments: (todo.comments || []).filter(comment => comment.id !== commentId)
          }
        : todo
    )
  }

  // Utility methods
  getTodosByStatus(todos, status) {
    return todos.filter(todo => todo.status === status)
  }

  getTodoById(todos, id) {
    return todos.find(todo => todo.id === id)
  }

  generateId() {
    return Date.now()
  }
}

export default TodoService
