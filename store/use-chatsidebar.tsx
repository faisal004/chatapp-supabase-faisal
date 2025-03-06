import { create } from "zustand"

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void
}

export const useChatSidebar = create<SidebarStore>((set) => ({
    collapsed: true,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}))