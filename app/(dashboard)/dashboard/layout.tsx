import { Container } from '@/components/container'
import Sidebar from '../_components/sidebar'
import AppLayoutWithPresence from '@/providers/app-online-provider'


const Browselayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex h-full ">
                <Sidebar />

                <Container>
                    <AppLayoutWithPresence>
                    {children}
                    </AppLayoutWithPresence>
                     </Container>
            </div>
        </>
    )
}

export default Browselayout