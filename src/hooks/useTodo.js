import { useTodoStore } from '../stores/todoStore.js'

export const useTodo = () => {
  return useTodoStore()
}
