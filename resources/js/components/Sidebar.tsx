import React from 'react';
import { Link, usePage } from '@inertiajs/react';

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

export default function Sidebar() {
    const { auth } = usePage<SharedProps>().props;
    const user = auth?.user;

    return (
        <div className="hidden w-80 shrink-0 lg:block">
            {user ? (
                <>
                    <div className="sticky top-20 rounded-lg bg-white p-4 shadow">
                        <div className="space-y-2">
                            <Link
                                href="/posts/create"
                                className="block w-full rounded-full bg-orange-600 px-4 py-2 text-center font-bold text-white hover:bg-orange-700"
                            >
                                Create Post
                            </Link>
                            <Link
                                href="/groups/create"
                                className="block w-full rounded-full border border-orange-600 px-4 py-2 text-center font-bold text-orange-600 hover:bg-orange-50"
                            >
                                Create Community
                            </Link>
                        </div>
                    </div>

                    {user.groups && user.groups.length > 0 && (
                        <div className="sticky top-[180px] mt-4 rounded-lg bg-white p-4 shadow">
                            <h2 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">
                                Your Communities
                            </h2>
                            <ul className="space-y-2">
                                {user.groups.map((group) => (
                                    <li key={group.id}>
                                        <Link
                                            href={`/g/${group.code}`}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-500"
                                        >
                                            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs">
                                                g/
                                            </span>
                                            {group.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <div className="sticky top-20 rounded-lg bg-white p-4 shadow">
                    <Link
                        href="/register"
                        className="block w-full rounded-full bg-orange-600 px-4 py-2 text-center font-bold text-white hover:bg-orange-700"
                    >
                        Join Cortisol
                    </Link>
                </div>
            )}
        </div>
    );
}
