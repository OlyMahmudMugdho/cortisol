import React from 'react';
import { Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    username: string;
}

interface SearchUserListProps {
    users: User[];
}

export default function SearchUserList({ users }: SearchUserListProps) {
    if (users.length === 0) return null;

    return (
        <div>
            <h2 className="mb-4 border-b pb-2 text-sm font-bold tracking-wider text-gray-500 uppercase">
                Users
            </h2>
            <ul className="divide-y divide-gray-100">
                {users.map((u) => (
                    <li
                        key={u.id}
                        className="flex items-center justify-between py-4"
                    >
                        <div className="flex items-center">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-500">
                                u/
                            </div>
                            <div>
                                <Link
                                    href={`/u/${u.username}`}
                                    className="text-lg font-bold text-gray-900 hover:underline"
                                >
                                    u/{u.username}
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {u.name}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={`/u/${u.username}`}
                            className="rounded-full bg-gray-200 px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-300"
                        >
                            Profile
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
