import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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

interface Post {
    id: number;
    title: string;
    content: string | null;
    created_at: string;
    user: {
        id: number;
        username: string;
    };
    group: {
        id: number;
        name: string;
        code: string;
    };
    comments_count: number;
    votes_sum_value: number | null;
    user_vote: {
        value: number;
    } | null;
}

interface Props {
    q: string;
    groups: Group[];
    users: User[];
    posts: Post[];
}

export default function SearchIndex({ q, groups, users, posts }: Props) {
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

    const hasResults =
        groups.length > 0 || users.length > 0 || posts.length > 0;

    return (
        <AppLayout>
            <div className="rounded-md bg-white p-6 shadow">
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
                                        <div
                                            key={post.id}
                                            className="flex rounded-md border border-gray-200 bg-white"
                                        >
                                            {/* Vote Column */}
                                            <div className="flex w-10 flex-col items-center rounded-l-md bg-gray-50 pt-2 pb-2">
                                                <button
                                                    onClick={() =>
                                                        handleVote(post.id, 1)
                                                    }
                                                    className={`rounded p-1 hover:bg-gray-200 ${
                                                        post.user_vote
                                                            ?.value === 1
                                                            ? 'text-orange-500'
                                                            : 'text-gray-400 hover:text-orange-500'
                                                    }`}
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
                                                    className={`text-xs font-bold ${
                                                        post.user_vote
                                                            ?.value === 1
                                                            ? 'text-orange-500'
                                                            : post.user_vote
                                                                    ?.value ===
                                                                -1
                                                              ? 'text-indigo-500'
                                                              : 'text-gray-900'
                                                    }`}
                                                >
                                                    {post.votes_sum_value || 0}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleVote(post.id, -1)
                                                    }
                                                    className={`rounded p-1 hover:bg-gray-200 ${
                                                        post.user_vote
                                                            ?.value === -1
                                                            ? 'text-indigo-500'
                                                            : 'text-gray-400 hover:text-indigo-500'
                                                    }`}
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

                                            {/* Post Content */}
                                            <div className="p-3">
                                                <div className="mb-1 flex items-center text-xs text-gray-500">
                                                    <Link
                                                        href={`/g/${post.group.code}`}
                                                        className="font-bold text-gray-900 hover:underline"
                                                    >
                                                        g/{post.group.code}
                                                    </Link>
                                                    <span className="mx-1">
                                                        •
                                                    </span>
                                                    <span>
                                                        Posted by{' '}
                                                        <Link
                                                            href={`/u/${post.user.username}`}
                                                            className="hover:underline"
                                                        >
                                                            u/
                                                            {post.user.username}
                                                        </Link>
                                                    </span>
                                                    <span className="mx-1">
                                                        •
                                                    </span>
                                                    <span>
                                                        {dayjs(
                                                            post.created_at,
                                                        ).fromNow()}
                                                    </span>
                                                </div>

                                                <Link
                                                    href={`/posts/${post.id}`}
                                                >
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                {post.content && (
                                                    <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                                                        {post.content}
                                                    </p>
                                                )}

                                                <div className="mt-2 flex items-center space-x-4 text-xs font-bold text-gray-500">
                                                    <Link
                                                        href={`/posts/${post.id}`}
                                                        className="flex items-center space-x-1 rounded p-1 hover:bg-gray-100"
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
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
                                                        <span>
                                                            {
                                                                post.comments_count
                                                            }{' '}
                                                            Comments
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
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
