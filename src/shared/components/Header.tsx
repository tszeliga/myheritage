import React from 'react'
import SearchInput from './SearchInput'

interface HeaderProps {
  onSearch?: (searchTerm: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-white border-b border-gray-200 flex-shrink-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">Opendoor</h1>
          </div>
          <SearchInput 
              placeholder="Search by address..."
              onSearch={onSearch}
            />
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
