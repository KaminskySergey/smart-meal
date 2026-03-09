import MainProvider from "@/app/providers/MainProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {

    return <MainProvider>
        {children}
    </MainProvider>
}