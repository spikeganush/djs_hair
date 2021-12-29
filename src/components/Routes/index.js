import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//components
import Header from '../Header'
import Footer from '../Footer'
//Pages
import Home from '../../pages/Home'

function index() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default index
