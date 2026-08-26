import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface Post {
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

interface PostItemProps {
    post: Post;
    showGroup?: boolean;
}

export default function PostItem({ post, showGroup = true }: PostItemProps) {
    const { auth } = usePage<any>().props;

    const handleVote = (value: number) => {
        if (!auth?.user) {
            window.location.href = '/login';
            return;
        }
        router.post(
            `/posts/${post.id}/vote`,
            { value },
            { preserveScroll: true },
        );
    };

    return (
        <div className="flex overflow-hidden rounded-md border border-gray-200 bg-white shadow hover:border-gray-300">
            {/* Upvote sidebar */}
            <div className="flex w-10 flex-col items-center border-r border-gray-100 bg-gray-50 pt-2 pb-2">
                <button
                    onClick={() => handleVote(1)}
                    className={`rounded p-1 hover:text-orange-500 ${post.user_vote?.value === 1 ? 'text-orange-500' : 'text-gray-400'}`}
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
                        post.user_vote?.value === 1
                            ? 'text-orange-500'
                            : post.user_vote?.value === -1
                              ? 'text-indigo-500'
                              : 'text-gray-800'
                    }`}
                >
                    {post.votes_sum_value || 0}
                </span>
                <button
                    onClick={() => handleVote(-1)}
                    className={`rounded p-1 hover:text-indigo-500 ${post.user_vote?.value === -1 ? 'text-indigo-500' : 'text-gray-400'}`}
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

            {/* Post content */}
            <div className="w-full min-w-0 p-3">
                <div className="mb-1 flex flex-wrap items-center text-xs text-gray-500">
                    {showGroup && (
                        <>
                            <Link
                                href={`/g/${post.group.code}`}
                                className="mr-1 font-bold text-gray-900 hover:underline"
                            >
                                g/{post.group.code}
                            </Link>
                            <span className="mx-1">•</span>
                        </>
                    )}
                    <span>Posted by</span>
                    <Link
                        href={`/u/${post.user.username}`}
                        className="mx-1 hover:underline"
                    >
                        u/{post.user.username}
                    </Link>
                    <span>{dayjs(post.created_at).fromNow()}</span>
                </div>
                <Link href={`/posts/${post.id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900">
                        {post.title}
                    </h3>
                </Link>
                {post.content && (
                    <div className="mt-1 line-clamp-3 text-sm break-words text-gray-600">
                        {post.content}
                    </div>
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
                        <span>{post.comments_count} Comments</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
