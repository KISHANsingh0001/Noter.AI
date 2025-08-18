import React from 'react'
import Header from './_components/header'
import Sidebar from './_components/Sidebar'

function DashboardLayout({children}) {
  return (
    <div>
        <div className='md:w-64 h-screen fixed'>
            <Sidebar/>
        </div>
        <div className='md:ml-64 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800'>
            <Header/>
            <div className='p-10 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 border'>
            {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout