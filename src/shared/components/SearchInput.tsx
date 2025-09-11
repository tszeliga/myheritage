import { useDebounce } from '@shared/hooks/useDebounce'
import React, { useEffect, useState } from 'react'

interface SearchInputProps {
  placeholder?: string
  onSearch: (searchTerm: string) => void
  className?: string
  debounceDelay?: number
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  debounceDelay = 300
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay)

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className={`relative w-full sm:w-64 my-4 sm:my-0 ${className}`}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-8 pr-8 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <svg
        className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
          title="Clear search"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchInput
