'use client'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state)
  return (
    <aside
      className={cn(
        'flex left-0 fixed flex-col w-[60px] transition-all duration-200 ease-in-out lg:w-60 h-full bg-background border-r border-[#d9dadc] z-50',
        collapsed && 'lg:w-[60px]',
      )}
    >
      {children}
    </aside>
  )
}