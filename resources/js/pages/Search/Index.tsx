import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import PostItem, { Post } from '../../components/PostItem';

interface Group {
    id: number;
    name: string;
    code: string;
    users_count: number;
}

interface User {
    id: number;
    name: string;
    username: string;
}

interface Props {
    q: string;
    groups: Group[];
    users: User[];
    posts: Post[];
}

export default function SearchIndex({ q, groups, users, posts }: Props) {
    const hasResults =
        groups.length > 0 || users.length > 0 || posts.length > 0;

    return (
        <AppLayout>
            <div className="rounded-md bg-white p-4 shadow sm:p-6">
                <h1 className="mb-6 border-b pb-4 text-xl font-bold text-gray-900">
                    Search Results for "{q}"
                </h1>

                {!hasResults ? (
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
                        <p>No results found matching your search.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Communities */}
                        {groups.length > 0 && (
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
                                                        {group.users_count}{' '}
                                                        Members
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

                        {/* Users */}
                        {users.length > 0 && (
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
                        )}

                        {/* Posts */}
                        {posts.length > 0 && (
                            <div>
                                <h2 className="mb-4 border-b pb-2 text-sm font-bold tracking-wider text-gray-500 uppercase">
                                    Posts
                                </h2>
                                <div className="space-y-4">
                                    {posts.map((post) => (
                                        <PostItem key={post.id} post={post} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
