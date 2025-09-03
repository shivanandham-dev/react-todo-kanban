// Assignee service for managing assignee data
// Follows Single Responsibility Principle

export class AssigneeService {
  constructor() {
    this.assignees = [
      { id: 1, name: 'John Doe', avatar: '👨‍💻' },
      { id: 2, name: 'Jane Smith', avatar: '👩‍💻' },
      { id: 3, name: 'Bob Johnson', avatar: '👨‍💼' },
      { id: 4, name: 'Alice Brown', avatar: '👩‍🎨' },
    ]
  }

  // Get all assignees
  getAllAssignees() {
    return [...this.assignees]
  }

  // Get assignee by ID
  getAssigneeById(id) {
    return this.assignees.find(assignee => assignee.id === id)
  }

  // Add new assignee
  addAssignee(assigneeData) {
    const newAssignee = {
      id: this.generateId(),
      ...assigneeData
    }
    this.assignees.push(newAssignee)
    return newAssignee
  }

  // Update assignee
  updateAssignee(id, updates) {
    this.assignees = this.assignees.map(assignee =>
      assignee.id === id ? { ...assignee, ...updates } : assignee
    )
    return this.getAssigneeById(id)
  }

  // Delete assignee
  deleteAssignee(id) {
    this.assignees = this.assignees.filter(assignee => assignee.id !== id)
    return true
  }

  // Get assignee options for select components
  getAssigneeOptions() {
    return [
      { value: '', label: 'Unassigned' },
      ...this.assignees.map(assignee => ({
        value: assignee.id.toString(),
        label: assignee.name
      }))
    ]
  }

  // Generate unique ID
  generateId() {
    const maxId = Math.max(...this.assignees.map(a => a.id), 0)
    return maxId + 1
  }
}
