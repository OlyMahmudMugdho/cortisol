import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import SearchBar from './SearchBar';
import UserDropdown from './UserDropdown';

interface Group {
    id: number;
    name: string;
    code: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    groups?: Group[];
}

interface SharedProps {
    auth?: {
        user?: User;
    };
    [key: string]: any;
}

export default function Navbar() {
    const { auth } = usePage<SharedProps>().props;
    const user = auth?.user;

    return (
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
                        <SearchBar />
                    </div>

                    <div className="ml-4 flex items-center space-x-4">
                        {user ? (
                            <UserDropdown user={user} />
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
    );
}
