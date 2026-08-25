import { Link, usePage } from '@inertiajs/react';
import React, { ReactNode } from 'react';

interface User {
    id: number;
    name: string;
    username: string;
}

interface SharedProps {
    auth?: {
        user?: User;
    };
    [key: string]: any;
}

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { auth } = usePage<SharedProps>().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 justify-between">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex flex-shrink-0 items-center"
                            >
                                <span className="text-xl font-bold text-orange-600">
                                    Cortisol
                                </span>
                            </Link>
                        </div>

                        <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                            <div className="w-full max-w-lg lg:max-w-xs">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full rounded-full border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-orange-500 focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:outline-none sm:text-sm"
                                        placeholder="Search Cortisol..."
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.username}
                                    </span>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href="/login"
                                        className="rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-full bg-orange-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-orange-700"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="mx-auto flex max-w-7xl space-x-6 pt-6 pb-12 sm:px-6 lg:px-8">
                <div className="flex-1">{children}</div>
                {/* Sidebar (can be customized per page if needed, but we'll add a generic one here for now, or just let pages manage it) */}
                <div className="hidden w-80 shrink-0 lg:block">
                    <div className="sticky top-20 rounded-lg bg-white p-4 shadow">
                        <h2 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">
                            About Cortisol
                        </h2>
                        <p className="mb-4 text-sm text-gray-600">
                            The front page of your custom reddit clone. Share,
                            vote, and discuss.
                        </p>
                        {user && (
                            <Link
                                href="/posts/create"
                                className="block w-full rounded-full bg-orange-600 px-4 py-2 text-center font-bold text-white hover:bg-orange-700"
                            >
                                Create Post
                            </Link>
                        )}
                        {!user && (
                            <Link
                                href="/register"
                                className="block w-full rounded-full bg-orange-600 px-4 py-2 text-center font-bold text-white hover:bg-orange-700"
                            >
                                Join Cortisol
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
