import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import PostItem, { Post } from '../../components/PostItem';
import SearchGroupList from '../../components/SearchGroupList';
import SearchUserList from '../../components/SearchUserList';

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
                        <SearchGroupList groups={groups} />

                        {/* Users */}
                        <SearchUserList users={users} />

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
