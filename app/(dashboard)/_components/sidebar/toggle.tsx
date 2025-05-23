'use client'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/use-sidebar'
import {  Menu } from 'lucide-react'

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar(
    (state) => state,
  )
  return (
    
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center bottom-0 justify-center pt-4 mb-4 ">
            <Button onMouseEnter={onExpand} variant="ghost" className="h-auto p-2">
              <Menu   className='h-4 w-4'  />
            </Button>
        </div>
      )}
      {!collapsed && (
        <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full justify-between'>
            <p className='font-semibold text-primary'>
                Collapse
            </p>
            <Button onClick={onCollapse} variant="ghost" className="h-auto p-2">
              <Menu  className='h-4 w-4' />
            </Button>
        </div>
      )}
    </>
  )
}

export default Toggle