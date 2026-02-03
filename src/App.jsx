import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart/index.jsx'
import { Wishlist } from './pages/Wishlist/index.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wishlist' element={<Wishlist />} />
    </Routes>
  )
}

export default App