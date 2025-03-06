'use client'

import { useSidebar } from '@/store/use-sidebar'
import { MessagesSquare } from 'lucide-react'

const Logo = () => {
  const { collapsed, } = useSidebar(
    (state) => state,
  )
  return (

    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center bottom-0 justify-center pt-4 mb-4 ">
          <div className="h-auto p-2">
            <MessagesSquare className='size-5' />
          </div>
        </div>
      )}
      {!collapsed && (
        <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full justify-between'>
          <p className='font-semibold text-primary'>
            chats
          </p>
          <div className="h-auto p-2">
            <MessagesSquare className='size-5' />
          </div>
        </div>
      )}
    </>
  )
}

export default Logo