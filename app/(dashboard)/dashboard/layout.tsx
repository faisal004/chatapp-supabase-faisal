import { Container } from '@/components/container'
import Sidebar from '../_components/sidebar'


const Browselayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex h-full ">
                <Sidebar />

                <Container>{children}  </Container>
            </div>
        </>
    )
}

export default Browselayout