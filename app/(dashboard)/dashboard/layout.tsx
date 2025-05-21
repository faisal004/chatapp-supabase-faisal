
import AppLayoutWithPresence from '@/providers/app-online-provider'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../_components/app-sidebar'


const Browselayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <SidebarTrigger />
        <AppLayoutWithPresence>

        {children}

        </AppLayoutWithPresence>
      </main>
    </SidebarProvider>
    )
}

export default Browselayout