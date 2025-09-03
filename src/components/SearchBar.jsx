import { Search } from 'lucide-react'

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Q Filter by keyword or by field..." }) => {
  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
