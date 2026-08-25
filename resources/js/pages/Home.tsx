import { Link } from '@inertiajs/react';
import React from 'react';
import AppLayout from '../layouts/AppLayout';

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
    votes_count: number;
}

interface PaginationData {
    data: Post[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface HomeProps {
    posts: PaginationData;
}

export default function Home({ posts }: HomeProps) {
    return (
        <AppLayout>
            <div className="space-y-4">
                {posts.data.length === 0 ? (
                    <div className="rounded-md bg-white p-6 text-center text-gray-500 shadow">
                        No posts yet. Be the first to post!
                    </div>
                ) : (
                    posts.data.map((post) => (
                        <div
                            key={post.id}
                            className="flex overflow-hidden rounded-md border border-gray-200 bg-white shadow hover:border-gray-300"
                        >
                            {/* Upvote sidebar */}
                            <div className="flex w-10 flex-col items-center border-r border-gray-100 bg-gray-50 pt-2">
                                <button className="text-gray-400 hover:text-orange-500">
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
                                <span className="my-1 text-sm font-bold text-gray-800">
                                    {post.votes_count || 0}
                                </span>
                                <button className="text-gray-400 hover:text-blue-500">
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
                            <div className="w-full p-3">
                                <div className="mb-1 flex items-center text-xs text-gray-500">
                                    <Link
                                        href={`/g/${post.group.code}`}
                                        className="mr-1 font-bold text-gray-900 hover:underline"
                                    >
                                        g/{post.group.code}
                                    </Link>
                                    <span className="mr-1">•</span>
                                    <span>Posted by</span>
                                    <Link
                                        href={`/u/${post.user.username}`}
                                        className="mx-1 hover:underline"
                                    >
                                        u/{post.user.username}
                                    </Link>
                                    <span>
                                        {new Date(
                                            post.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900">
                                    <Link href={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                {post.content && (
                                    <p className="mb-2 line-clamp-3 text-sm text-gray-700">
                                        {post.content}
                                    </p>
                                )}
                                <div className="flex items-center space-x-4 text-xs font-bold text-gray-500">
                                    <Link
                                        href={`/posts/${post.id}`}
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
                                        {post.comments_count || 0} Comments
                                    </Link>
                                    <button className="flex items-center rounded p-1 hover:bg-gray-100">
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
                                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                            />
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {/* Pagination */}
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
