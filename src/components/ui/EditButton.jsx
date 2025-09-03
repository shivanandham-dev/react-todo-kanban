import { Edit } from 'lucide-react'

const EditButton = ({ onClick, children = 'Edit', size = 14, className = '' }) => {
  return (
    <button 
      className={`btn-secondary edit-btn ${className}`}
      onClick={onClick}
    >
      <Edit size={size} />
      {children}
    </button>
  )
}

export default EditButton
