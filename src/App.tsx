import { Outlet } from 'react-router-dom'

function AppContent() {
  return <Outlet />
}

function App() {
  return <AppContent />
}

export default App
