// Service factory for dependency injection
// Follows Dependency Inversion Principle

import TodoService from './TodoService.js'
import { AssigneeService } from './AssigneeService.js'
import { StorageService } from './StorageService.js'

export class ServiceFactory {
  constructor() {
    this._todoService = null
    this._assigneeService = null
    this._storageService = null
  }

  // Get or create TodoService instance
  getTodoService(storageKey = 'todos') {
    if (!this._todoService) {
      this._todoService = new TodoService(storageKey)
    }
    return this._todoService
  }

  // Get or create AssigneeService instance
  getAssigneeService() {
    if (!this._assigneeService) {
      this._assigneeService = new AssigneeService()
    }
    return this._assigneeService
  }

  // Get or create StorageService instance
  getStorageService(storageKey) {
    if (!this._storageService) {
      this._storageService = new StorageService(storageKey)
    }
    return this._storageService
  }

  // Reset all services (useful for testing)
  reset() {
    this._todoService = null
    this._assigneeService = null
    this._storageService = null
  }

  // Set custom service implementations (useful for testing or different environments)
  setTodoService(todoService) {
    this._todoService = todoService
  }

  setAssigneeService(assigneeService) {
    this._assigneeService = assigneeService
  }

  setStorageService(storageService) {
    this._storageService = storageService
  }
}

// Export singleton instance
export const serviceFactory = new ServiceFactory()
