import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-end p-5 shadow-sm border-b-2 h-5 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 border'>
        <UserButton/>
    </div>
  )
}

export default Header
