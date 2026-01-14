import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrolltoTop from './ScrolltoTop'

const Root = () => {
  return (
    <div>
        <Navbar></Navbar>
        <ScrolltoTop></ScrolltoTop>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Root