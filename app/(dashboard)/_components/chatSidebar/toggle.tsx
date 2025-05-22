'use client'

import { Button } from '@/components/ui/button'
import { useChatSidebar } from '@/store/use-chatsidebar'
import {  Menu } from 'lucide-react'
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from 'react-icons/tb'

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar(
    (state) => state,
  )
  return (
    
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center bottom-0 justify-center pt-4 mb-4 ">
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2 ">
           <TbLayoutSidebarLeftCollapseFilled  />
            </Button>
        </div>
      )}
      {!collapsed && (
        <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full justify-between'>
            <p className='font-semibold text-primary'>
                Collapse
            </p>
            <Button onClick={onCollapse} variant="ghost" className="h-auto p-2">
            <TbLayoutSidebarRightCollapseFilled size={40} />
            </Button>
        </div>
      )}
    </>
  )
}

export default Toggle