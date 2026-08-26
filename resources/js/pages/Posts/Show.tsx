import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface User {
    id: number;
    username: string;
}

interface Group {
    id: number;
    name: string;
    code: string;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: User;
}

interface Post {
    id: number;
    title: string;
    content: string | null;
    created_at: string;
    user: User;
    group: Group;
    comments_count: number;
    votes_count: number;
    comments: Comment[];
}

interface Props {
    post: Post;
}

export default function ShowPost({ post }: Props) {
    const { auth } = usePage<any>().props;
    const {
        data,
        setData,
        post: submitPost,
        processing,
        reset,
        errors,
    } = useForm({
        content: '',
    });

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        submitPost(`/posts/${post.id}/comments`, {
            preserveScroll: true,
            onSuccess: () => reset('content'),
        });
    };

    return (
        <AppLayout>
            <div className="rounded-md bg-white shadow">
                {/* Post Header */}
                <div className="border-b border-gray-100 p-6">
                    <div className="mb-2 flex items-center text-xs text-gray-500">
                        <Link
                            href={`/g/${post.group.code}`}
                            className="mr-1 font-bold text-gray-900 hover:underline"
                        >
                            g/{post.group.code}
                        </Link>
                        <span>•</span>
                        <span className="mx-1">Posted by</span>
                        <Link
                            href={`/u/${post.user.username}`}
                            className="mr-1 hover:underline"
                        >
                            u/{post.user.username}
                        </Link>
                        <span>{dayjs(post.created_at).fromNow()}</span>
                    </div>

                    <h1 className="mb-4 text-2xl font-bold text-gray-900">
                        {post.title}
                    </h1>

                    {post.content && (
                        <div className="mt-4 whitespace-pre-wrap text-gray-800">
                            {post.content}
                        </div>
                    )}

                    <div className="mt-6 flex items-center space-x-4 text-sm font-bold text-gray-500">
                        <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-1">
                            <button className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-orange-500">
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
                            <span className="text-gray-900">
                                {post.votes_count || 0}
                            </span>
                            <button className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-indigo-500">
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
                        <div className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-100">
                            <svg
                                className="mr-1.5 h-5 w-5"
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
                            {post.comments_count} Comments
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="rounded-b-md bg-gray-50 p-6">
                    {auth?.user ? (
                        <form onSubmit={submitComment} className="mb-8">
                            <p className="mb-2 text-sm text-gray-600">
                                Comment as{' '}
                                <span className="font-bold text-gray-900">
                                    {auth.user.username}
                                </span>
                            </p>
                            <textarea
                                rows={4}
                                className="w-full rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                placeholder="What are your thoughts?"
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                                required
                            />
                            {errors.content && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.content}
                                </div>
                            )}
                            <div className="mt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Comment
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-8 flex items-center justify-between rounded border border-gray-200 bg-white p-4">
                            <p className="font-medium text-gray-600">
                                Log in or sign up to leave a comment
                            </p>
                            <div>
                                <Link
                                    href="/login"
                                    className="mr-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex space-x-3"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500">
                                            {comment.user.username
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center text-xs text-gray-500">
                                            <Link
                                                href={`/u/${comment.user.username}`}
                                                className="mr-2 font-bold text-gray-900 hover:underline"
                                            >
                                                {comment.user.username}
                                            </Link>
                                            <span>
                                                {dayjs(
                                                    comment.created_at,
                                                ).fromNow()}
                                            </span>
                                        </div>
                                        <div className="text-sm whitespace-pre-wrap text-gray-800">
                                            {comment.content}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-4 text-center text-gray-500">
                                No comments yet. Be the first to share what you
                                think!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
