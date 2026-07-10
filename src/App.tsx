import { useState } from 'react'
import Landing from './pages/Landing'
import Order from './pages/Order'

export default function App() {
  const [page, setPage] = useState<'landing' | 'order'>('landing')

  if (page === 'order') {
    return <Order onBack={() => setPage('landing')} />
  }

  return <Landing onOrder={() => setPage('order')} />
}
