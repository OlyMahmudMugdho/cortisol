import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface User {
    id: number;
    username: string;
}

interface UserDropdownProps {
    user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 rounded border border-transparent p-1 hover:border-gray-200 focus:outline-none"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-gray-500">
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
                <div className="hidden flex-col items-start lg:flex">
                    <span className="text-xs font-semibold text-gray-700">
                        {user.username}
                    </span>
                </div>
                <svg
                    className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {dropdownOpen && (
                <div className="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none">
                    <Link
                        href={`/u/${user.username}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Profile
                    </Link>
                    <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        User Settings
                    </Link>
                    <div className="my-1 border-t border-gray-100"></div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Log Out
                    </Link>
                </div>
            )}
        </div>
    );
}
