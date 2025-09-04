import { serviceFactory } from '../services/ServiceFactory.js'
import { STATUS_TYPES } from '../types/index.js'

class TodoStore {
  constructor() {
    this.todos = []
    this.loading = true
    this.assignees = serviceFactory.getAssigneeService().getAllAssignees()
    this.todoService = serviceFactory.getTodoService()
    this.subscribers = new Set()
    
    this.initializeStore()
  }

  // Subscribe to store changes
  subscribe(callback) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  // Notify all subscribers of changes
  notify() {
    this.subscribers.forEach(callback => callback(this.getState()))
  }

  // Get current state
  getState() {
    return {
      todos: this.todos,
      assignees: this.assignees,
      loading: this.loading
    }
  }

  // Initialize store with data from localStorage
  async initializeStore() {
    try {
      this.loading = true
      this.notify()
      
      const savedTodos = this.todoService.loadTodos()
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
        this.todos = sampleTodos
        this.todoService.saveTodos(sampleTodos)
      } else if (savedTodos) {
        this.todos = savedTodos
      } else {
        this.todos = []
      }
    } catch (error) {
      console.error('Error loading todos:', error)
      this.todos = []
    } finally {
      this.loading = false
      this.notify()
    }
  }

  // Save todos to localStorage
  saveTodos() {
    if (!this.loading && this.todos.length > 0) {
      try {
        this.todoService.saveTodos(this.todos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
    }
  }

  // Todo actions
  addTodo(todo) {
    const newTodo = this.todoService.createTodo(todo)
    this.todos = [...this.todos, newTodo]
    this.saveTodos()
    this.notify()
  }

  updateTodo(id, updates) {
    this.todos = this.todoService.updateTodo(this.todos, id, updates)
    this.saveTodos()
    this.notify()
  }

  deleteTodo(id) {
    this.todos = this.todoService.deleteTodo(this.todos, id)
    this.saveTodos()
    this.notify()
  }

  moveTodo(id, newStatus) {
    this.todos = this.todoService.moveTodo(this.todos, id, newStatus)
    this.saveTodos()
    this.notify()
  }

  closeTodo(id) {
    this.todos = this.todoService.closeTodo(this.todos, id)
    this.saveTodos()
    this.notify()
  }

  reopenTodo(id) {
    this.todos = this.todoService.reopenTodo(this.todos, id)
    this.saveTodos()
    this.notify()
  }

  addComment(todoId, comment) {
    this.todos = this.todoService.addComment(this.todos, todoId, comment)
    this.saveTodos()
    this.notify()
  }

  updateComment(todoId, commentId, updates) {
    this.todos = this.todoService.updateComment(this.todos, todoId, commentId, updates)
    this.saveTodos()
    this.notify()
  }

  deleteComment(todoId, commentId) {
    this.todos = this.todoService.deleteComment(this.todos, todoId, commentId)
    this.saveTodos()
    this.notify()
  }
}

// Create and export a singleton instance
export const todoStore = new TodoStore()
