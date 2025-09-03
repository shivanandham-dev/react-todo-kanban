# Todo Kanban App

A modern, GitHub issue-style todo management application built with React and Vite. This app provides a kanban board interface for organizing and tracking tasks with features similar to GitHub issues.

## Features

- **Kanban Board Layout**: Three columns (To Do, In Progress, Done) for organizing tasks
- **GitHub Issue-like Design**: Clean, modern UI that mimics GitHub's issue interface
- **Drag & Drop**: Move todos between columns by dragging and dropping
- **Assignee Management**: Assign todos to team members with avatar support
- **Priority Levels**: Set priority (Low, Medium, High) with color-coded badges
- **Search Functionality**: Search todos by title or description
- **Local Storage**: All data is persisted in the browser's localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Changes are saved automatically

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd todo-kanban
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating Todos

1. Click the "Add Todo" button in the top-right corner
2. Fill in the todo details:
   - **Title** (required): The main task description
   - **Description** (optional): Additional details about the task
   - **Priority**: Choose between Low, Medium, or High
   - **Assignee**: Select a team member or leave unassigned
3. Click "Create Todo" to add the todo to the board

### Managing Todos

- **Move Todos**: Drag and drop todos between columns to change their status
- **Edit Priority**: Click the three-dot menu on any todo to change priority
- **Change Assignee**: Use the menu to reassign todos to different team members
- **Delete Todos**: Remove todos using the delete option in the menu
- **Search**: Use the search bar to find specific todos

### Columns

- **To Do**: New tasks that haven't been started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard.jsx      # Main board component
│   ├── KanbanColumn.jsx     # Individual column component
│   ├── TodoCard.jsx         # Individual todo card
│   └── AddTodoModal.jsx     # Modal for creating new todos
├── context/
│   └── TodoContext.jsx      # State management and localStorage
├── App.jsx                  # Main app component
└── main.jsx                 # App entry point
```

## Technologies Used

- **React 18**: Modern React with hooks and context
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Custom styling with modern CSS features
- **LocalStorage API**: Client-side data persistence

## Customization

### Adding New Assignees

Edit the `assignees` array in `src/context/TodoContext.jsx`:

```javascript
const [assignees] = useState([
  { id: 1, name: 'John Doe', avatar: '👨‍💻' },
  { id: 2, name: 'Jane Smith', avatar: '👩‍💻' },
  // Add more assignees here
])
```

### Changing Colors

Modify the color variables in `src/App.css`:

```css
.column-header {
  border-top-color: #your-color-here;
}
```

### Adding New Columns

Update the `columns` array in `src/components/KanbanBoard.jsx`:

```javascript
const columns = [
  { id: 'todo', title: 'To Do', color: '#0366d6' },
  { id: 'in-progress', title: 'In Progress', color: '#f6a434' },
  { id: 'review', title: 'Review', color: '#6f42c1' }, // New column
  { id: 'done', title: 'Done', color: '#28a745' }
]
```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Browser Support

This app works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- LocalStorage API
- Drag and Drop API

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## License

This project is open source and available under the MIT License.
