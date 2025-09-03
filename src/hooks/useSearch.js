import { useState, useMemo } from 'react'

// Custom hook for search functionality
// Follows Single Responsibility Principle
export const useSearch = (items, searchFields = ['title', 'description']) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = useMemo(() => {
    // Ensure items is always an array
    const safeItems = items || []
    
    if (!searchTerm.trim()) {
      return safeItems
    }

    const lowerSearchTerm = searchTerm.toLowerCase()
    
    return safeItems.filter(item => 
      searchFields.some(field => {
        const fieldValue = item[field]
        return fieldValue && fieldValue.toLowerCase().includes(lowerSearchTerm)
      })
    )
  }, [items, searchTerm, searchFields])

  const updateSearchTerm = (newTerm) => {
    setSearchTerm(newTerm)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return {
    searchTerm,
    filteredItems,
    updateSearchTerm,
    clearSearch
  }
}
