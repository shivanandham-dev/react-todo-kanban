import { create } from 'zustand'
import { serviceFactory } from '../services/ServiceFactory.js'
import { STATUS_TYPES } from '../types/index.js'

export const useTodoStore = create((set, get) => ({
  // State
  todos: [],
  loading: true,
  assignees: serviceFactory.getAssigneeService().getAllAssignees(),

  // Actions
  setTodos: (todos) => set({ todos }),
  setLoading: (loading) => set({ loading }),

  // Initialize store with sample data or load from localStorage
  initializeStore: async () => {
    const todoService = serviceFactory.getTodoService()
    
    try {
      set({ loading: true })
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
        set({ todos: sampleTodos })
        todoService.saveTodos(sampleTodos)
      } else if (savedTodos) {
        set({ todos: savedTodos })
      } else {
        set({ todos: [] })
      }
    } catch (error) {
      console.error('Error loading todos:', error)
      set({ todos: [] })
    } finally {
      set({ loading: false })
    }
  },

  // Todo CRUD operations
  addTodo: (todo) => {
    const todoService = serviceFactory.getTodoService()
    const newTodo = todoService.createTodo(todo)
    set((state) => {
      const updatedTodos = [...state.todos, newTodo]
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  updateTodo: (id, updates) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.updateTodo(state.todos, id, updates)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  deleteTodo: (id) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.deleteTodo(state.todos, id)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  moveTodo: (id, newStatus) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.moveTodo(state.todos, id, newStatus)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  closeTodo: (id) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.closeTodo(state.todos, id)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  reopenTodo: (id) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.reopenTodo(state.todos, id)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  // Comment operations
  addComment: (todoId, comment) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.addComment(state.todos, todoId, comment)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  updateComment: (todoId, commentId, updates) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.updateComment(state.todos, todoId, commentId, updates)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  },

  deleteComment: (todoId, commentId) => {
    const todoService = serviceFactory.getTodoService()
    set((state) => {
      const updatedTodos = todoService.deleteComment(state.todos, todoId, commentId)
      // Save to localStorage
      try {
        todoService.saveTodos(updatedTodos)
      } catch (error) {
        console.error('Error saving todos:', error)
      }
      return { todos: updatedTodos }
    })
  }
}))
