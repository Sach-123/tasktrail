import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const Container = () => {
  return (
    <div className='w-[80%] m-auto'>
        <Header />
        <Outlet />
    </div>
  )
}

export default Container