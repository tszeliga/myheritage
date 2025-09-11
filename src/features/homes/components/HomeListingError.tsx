import React from 'react'

type HomeListingErrorProps = {
  error: string
  onRefetch: () => void
}

const HomeListingError: React.FC<HomeListingErrorProps> = ({
  error,
  onRefetch
}) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-red-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.308 15.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load homes
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRefetch}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default HomeListingError
