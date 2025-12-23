'use client';

import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import ToasterProvider from "./ToasterProvider";
import Header from "@/components/ui/Header";


export default function MainProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <ToasterProvider />
            <div className="bg-gray-200 min-h-screen">

            <Header />
            <main className="">

                {children}
            </main>
            </div>
        </AuthProvider>
    );
}