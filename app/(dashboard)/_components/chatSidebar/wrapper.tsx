'use client'

import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/store/use-chatsidebar'
interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useChatSidebar((state) => state)
  return (
    <aside
      className={cn(
        'flex fixed right-0  flex-col w-[60px] transition-all duration-200 ease-in-out lg:w-60 h-full bg-background border-l border-[#d9dadc] z-50',
        collapsed && 'lg:w-[60px]',
        'md:translate-x-0 translate-x-full' 
      )}
    >
      {children}
    </aside>
  )
}