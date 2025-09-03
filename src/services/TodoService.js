class TodoService {
  constructor(storageKey = 'todos') {
    this.storageKey = storageKey
  }

  // Load todos from storage
  loadTodos() {
    try {
      const savedTodos = localStorage.getItem(this.storageKey)
      return savedTodos ? JSON.parse(savedTodos) : []
    } catch (error) {
      console.error('Error loading todos:', error)
      return []
    }
  }

  // Save todos to storage
  saveTodos(todos) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(todos))
      return true
    } catch (error) {
      console.error('Error saving todos:', error)
      return false
    }
  }

  // Get todos by status
  getTodosByStatus(todos, status) {
    return todos.filter(todo => todo.status === status)
  }

  // Get todo by ID
  getTodoById(todos, id) {
    return todos.find(todo => todo.id === id)
  }

  // Generate unique ID
  generateId() {
    return Date.now()
  }

  // Create new todo
  createTodo(todoData) {
    return {
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      status: 'no-status',
      comments: [],
      ...todoData
    }
  }

  // Update todo
  updateTodo(todos, id, updates) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    )
  }

  // Delete todo
  deleteTodo(todos, id) {
    return todos.filter(todo => todo.id !== id)
  }

  // Move todo between statuses
  moveTodo(todos, id, newStatus) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus } : todo
    )
  }

  // Close todo
  closeTodo(todos, id) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, status: 'closed', closedAt: new Date().toISOString() } : todo
    )
  }

  // Reopen todo
  reopenTodo(todos, id) {
    return todos.map(todo => 
      todo.id === id ? { ...todo, status: 'no-status', closedAt: null } : todo
    )
  }

  // Add comment to todo
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

  // Update comment
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

  // Delete comment
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
}

export default TodoService
