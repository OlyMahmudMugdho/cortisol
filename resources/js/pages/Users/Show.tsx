import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import { Link, usePage, router } from '@inertiajs/react';

interface User {
    id: number;
    username: string;
    created_at: string;
}

interface Group {
    id: number;
    name: string;
    code: string;
}

interface Post {
    id: number;
    title: string;
    content: string | null;
    created_at: string;
    user: User;
    group: Group;
    comments_count: number;
    votes_sum_value: number | null;
    user_vote: {
        value: number;
    } | null;
}

interface PaginationData {
    data: Post[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Props {
    profileUser: User;
    posts: PaginationData;
}

export default function ShowUser({ profileUser, posts }: Props) {
    const { auth } = usePage<any>().props;

    const handleVote = (postId: number, value: number) => {
        if (!auth?.user) {
            window.location.href = '/login';
            return;
        }
        router.post(
            `/posts/${postId}/vote`,
            { value },
            { preserveScroll: true },
        );
    };

    return (
        <AppLayout>
            <div className="mb-4 flex items-center space-x-4 rounded-md bg-white p-4 shadow sm:p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
                    {profileUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        u/{profileUser.username}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Joined{' '}
                        {new Date(profileUser.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="mb-2 text-lg font-bold text-gray-900">Posts</h2>
                {posts.data.length === 0 ? (
                    <div className="rounded-md bg-white p-6 text-center text-gray-500 shadow">
                        <p>
                            u/{profileUser.username} hasn't posted anything yet.
                        </p>
                    </div>
                ) : (
                    posts.data.map((p) => (
                        <div
                            key={p.id}
                            className="flex overflow-hidden rounded-md border border-gray-200 bg-white shadow hover:border-gray-300"
                        >
                            <div className="flex w-10 flex-col items-center border-r border-gray-100 bg-gray-50 pt-2">
                                <button
                                    onClick={() => handleVote(p.id, 1)}
                                    className={`hover:text-orange-500 ${p.user_vote?.value === 1 ? 'text-orange-500' : 'text-gray-400'}`}
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 15l7-7 7 7"
                                        />
                                    </svg>
                                </button>
                                <span
                                    className={`my-1 text-sm font-bold ${p.user_vote?.value === 1 ? 'text-orange-500' : p.user_vote?.value === -1 ? 'text-indigo-500' : 'text-gray-800'}`}
                                >
                                    {p.votes_sum_value || 0}
                                </span>
                                <button
                                    onClick={() => handleVote(p.id, -1)}
                                    className={`hover:text-indigo-500 ${p.user_vote?.value === -1 ? 'text-indigo-500' : 'text-gray-400'}`}
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-full p-3">
                                <div className="mb-1 flex items-center text-xs text-gray-500">
                                    <Link
                                        href={`/g/${p.group.code}`}
                                        className="mr-1 font-bold text-gray-900 hover:underline"
                                    >
                                        g/{p.group.code}
                                    </Link>
                                    <span>•</span>
                                    <span className="ml-1">
                                        {new Date(
                                            p.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900">
                                    <Link href={`/posts/${p.id}`}>
                                        {p.title}
                                    </Link>
                                </h3>
                                {p.content && (
                                    <p className="mb-2 line-clamp-3 text-sm text-gray-700">
                                        {p.content}
                                    </p>
                                )}
                                <div className="flex items-center space-x-4 text-xs font-bold text-gray-500">
                                    <Link
                                        href={`/posts/${p.id}`}
                                        className="flex items-center rounded p-1 hover:bg-gray-100"
                                    >
                                        <svg
                                            className="mr-1 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                        {p.comments_count || 0} Comments
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {posts.last_page > 1 && (
                    <div className="flex items-center justify-between py-4">
                        {posts.prev_page_url ? (
                            <Link
                                href={posts.prev_page_url}
                                className="rounded-full border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                        ) : (
                            <div />
                        )}
                        {posts.next_page_url ? (
                            <Link
                                href={posts.next_page_url}
                                className="rounded-full border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
