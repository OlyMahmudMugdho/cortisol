import React from 'react';
import { Link } from '@inertiajs/react';

interface Group {
    id: number;
    name: string;
    code: string;
    users_count: number;
}

interface SearchGroupListProps {
    groups: Group[];
}

export default function SearchGroupList({ groups }: SearchGroupListProps) {
    if (groups.length === 0) return null;

    return (
        <div>
            <h2 className="mb-4 border-b pb-2 text-sm font-bold tracking-wider text-gray-500 uppercase">
                Communities
            </h2>
            <ul className="divide-y divide-gray-100">
                {groups.map((group) => (
                    <li
                        key={group.id}
                        className="flex items-center justify-between py-4"
                    >
                        <div className="flex items-center">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-500">
                                g/
                            </div>
                            <div>
                                <Link
                                    href={`/g/${group.code}`}
                                    className="text-lg font-bold text-gray-900 hover:underline"
                                >
                                    g/{group.code}
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {group.name} • {group.users_count} Members
                                </p>
                            </div>
                        </div>
                        <Link
                            href={`/g/${group.code}`}
                            className="rounded-full bg-gray-200 px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-300"
                        >
                            View
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
