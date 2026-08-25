import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';

interface Group {
    id: number;
    name: string;
    code: string;
    users_count: number;
}

interface Props {
    q: string;
    groups: Group[];
}

export default function SearchIndex({ q, groups }: Props) {
    return (
        <AppLayout>
            <div className="rounded-md bg-white p-6 shadow">
                <h1 className="mb-6 text-xl font-bold text-gray-900">
                    Search Results for "{q}"
                </h1>

                {groups.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                        <svg
                            className="mx-auto mb-3 h-12 w-12 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p>No communities found matching your search.</p>
                    </div>
                ) : (
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
                                                {group.name} •{' '}
                                                {group.users_count} Members
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
                )}
            </div>
        </AppLayout>
    );
}
