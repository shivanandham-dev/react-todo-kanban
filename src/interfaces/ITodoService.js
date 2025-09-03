/* eslint-disable no-unused-vars */
// Interface for TodoService to follow ISP and DIP principles

export class ITodoService {
  // Data persistence methods
  loadTodos() {
    throw new Error('loadTodos must be implemented')
  }

  saveTodos(_todos) {
    throw new Error('saveTodos must be implemented')
  }

  // Todo CRUD operations
  createTodo(_todoData) {
    throw new Error('createTodo must be implemented')
  }

  updateTodo(_todos, _id, _updates) {
    throw new Error('updateTodo must be implemented')
  }

  deleteTodo(_todos, _id) {
    throw new Error('deleteTodo must be implemented')
  }

  // Todo status operations
  moveTodo(_todos, _id, _newStatus) {
    throw new Error('moveTodo must be implemented')
  }

  closeTodo(_todos, _id) {
    throw new Error('closeTodo must be implemented')
  }

  reopenTodo(_todos, _id) {
    throw new Error('reopenTodo must be implemented')
  }

  // Comment operations
  addComment(_todos, _todoId, _comment) {
    throw new Error('addComment must be implemented')
  }

  updateComment(_todos, _todoId, _commentId, _updates) {
    throw new Error('updateComment must be implemented')
  }

  deleteComment(_todos, _todoId, _commentId) {
    throw new Error('deleteComment must be implemented')
  }

  // Utility methods
  getTodosByStatus(_todos, _status) {
    throw new Error('getTodosByStatus must be implemented')
  }

  getTodoById(_todos, _id) {
    throw new Error('getTodoById must be implemented')
  }

  generateId() {
    throw new Error('generateId must be implemented')
  }
}
