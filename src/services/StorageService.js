// Storage service for handling data persistence
// Follows Single Responsibility Principle

export class StorageService {
  constructor(storageKey) {
    this.storageKey = storageKey
  }

  // Load data from storage
  load() {
    try {
      const savedData = localStorage.getItem(this.storageKey)
      return savedData ? JSON.parse(savedData) : null
    } catch (error) {
      console.error(`Error loading data from ${this.storageKey}:`, error)
      return null
    }
  }

  // Save data to storage
  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      return true
    } catch (error) {
      console.error(`Error saving data to ${this.storageKey}:`, error)
      return false
    }
  }

  // Clear data from storage
  clear() {
    try {
      localStorage.removeItem(this.storageKey)
      return true
    } catch (error) {
      console.error(`Error clearing data from ${this.storageKey}:`, error)
      return false
    }
  }

  // Check if storage is available
  isAvailable() {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }
}
