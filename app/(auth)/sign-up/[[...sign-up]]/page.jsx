import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (<div className='flex items-center justify-center h-screen  bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800'>
       <SignUp />
    </div>)
}