import SearchInput from '@shared/components/SearchInput'
import React from 'react'

interface HeaderProps {
  onSearch: (searchTerm: string) => void
  searchDebounceDelay?: number
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchDebounceDelay = 300
}) => {
  return (
    <header className="bg-white border-b border-gray-200 flex">
      <div className="container mx-auto px-4 py-4">
        <div className="flex sm:flex-row flex-col items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-600">Opendoor</h1>
          </div>
          <SearchInput
            placeholder="Search by address..."
            onSearch={onSearch}
            debounceDelay={searchDebounceDelay}
          />
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Read more
              </a>
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Login
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
