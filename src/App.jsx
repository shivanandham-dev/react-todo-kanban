import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { TodoProvider } from './context/TodoContext.jsx'

function App() {
  return (
    <TodoProvider>
      <div className="app">
        <main>
          <KanbanBoard />
        </main>
      </div>
    </TodoProvider>
  )
}

export default App
