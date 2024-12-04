import { useAutoAnimate } from "@formkit/auto-animate/react";
import Sidebar from "@/components/Sidebar";
import AppBar from "@/components/AppBar";

import "@/styles/App.css";

export default function AppLayout({ children }) {
    const [parent] = useAutoAnimate({ duration: 300 });
    return (
        <div className="flex size-full">
            <Sidebar />
            <div className="ml-14 flex flex-1 flex-col overflow-hidden bg-background-secondary p-1.5 md:ml-0">
                <AppBar />
                <main
                    className="flex flex-1 flex-col gap-8 overflow-y-auto overflow-x-hidden rounded-xl bg-background-primary p-3 sm:rounded-2xl sm:px-5"
                    ref={parent}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
