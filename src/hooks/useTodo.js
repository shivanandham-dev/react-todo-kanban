import { useState, useEffect } from 'react'
import { todoStore } from '../store/todoStore.js'

export const useTodo = () => {
  const [state, setState] = useState(todoStore.getState())

  useEffect(() => {
    const unsubscribe = todoStore.subscribe(setState)
    return unsubscribe
  }, [])

  return {
    ...state,
    addTodo: todoStore.addTodo.bind(todoStore),
    updateTodo: todoStore.updateTodo.bind(todoStore),
    deleteTodo: todoStore.deleteTodo.bind(todoStore),
    moveTodo: todoStore.moveTodo.bind(todoStore),
    closeTodo: todoStore.closeTodo.bind(todoStore),
    reopenTodo: todoStore.reopenTodo.bind(todoStore),
    addComment: todoStore.addComment.bind(todoStore),
    updateComment: todoStore.updateComment.bind(todoStore),
    deleteComment: todoStore.deleteComment.bind(todoStore)
  }
}
