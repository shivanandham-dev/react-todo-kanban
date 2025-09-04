import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { useTodoStore } from './stores/todoStore.js'
import { useEffect } from 'react'

function App() {
  const initializeStore = useTodoStore((state) => state.initializeStore)

  useEffect(() => {
    initializeStore()
  }, [initializeStore])

  return (
    <div className="app">
      <main>
        <KanbanBoard />
      </main>
    </div>
  )
}

export default App
