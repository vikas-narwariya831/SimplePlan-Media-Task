import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import HomeRoutes from './views/Home/HomeRoutes'
function App() {
  return (
    <BrowserRouter>
      <HomeRoutes />
    </BrowserRouter>
  )
}

export default App