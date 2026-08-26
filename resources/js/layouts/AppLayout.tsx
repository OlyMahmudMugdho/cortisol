import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="mx-auto flex max-w-7xl flex-col px-4 pt-4 pb-12 sm:px-6 lg:flex-row lg:space-x-6 lg:px-8">
                <div className="w-full min-w-0 flex-1">{children}</div>
                {/* Sidebar */}
                <Sidebar />
            </main>
        </div>
    );
}
