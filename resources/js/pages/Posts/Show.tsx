import React, { useState, useMemo } from 'react';
import AppLayout from '../../layouts/AppLayout';
import CommentItem, { Comment } from '../../components/CommentItem';
import { Link, useForm, usePage, router } from '@inertiajs/react';
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

interface Post {
    id: number;
    title: string;
    content: string | null;
    created_at: string;
    user: User;
    group: Group;
    comments_count: number;
    comments?: Comment[];
    votes_sum_value: number | null;
    user_vote: {
        value: number;
    } | null;
}

interface Props {
    post: Post;
}

export default function ShowPost({ post }: Props) {
    const { auth } = usePage<any>().props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const {
        data,
        setData,
        post: submitCommentPost,
        processing,
        errors,
        reset,
    } = useForm({
        content: '',
    });

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        submitCommentPost(`/posts/${post.id}/comments`, {
            preserveScroll: true,
            onSuccess: () => reset('content'),
        });
    };

    return (
        <AppLayout>
            <div className="rounded-md bg-white shadow">
                {/* Post Header */}
                <div className="border-b border-gray-100 p-4 sm:p-6">
                    <div className="mb-2 flex items-start justify-between">
                        <div className="flex flex-wrap items-center text-xs text-gray-500">
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
                        {auth?.user?.id === post.user.id && (
                            <div className="relative ml-auto">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center rounded p-2 text-gray-500 hover:bg-gray-100"
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
                                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                        />
                                    </svg>
                                </button>
                                {isMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsMenuOpen(false)}
                                        ></div>
                                        <div className="ring-opacity-5 absolute right-0 z-20 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                                            <Link
                                                href={`/posts/${post.id}/edit`}
                                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                <svg
                                                    className="mr-3 h-4 w-4 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Edit Post
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <svg
                                                    className="mr-3 h-4 w-4 text-red-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Delete Post
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <h1 className="mb-4 text-2xl font-bold text-gray-900">
                        {post.title}
                    </h1>

                    {post.content && (
                        <div className="mt-4 break-words whitespace-pre-wrap text-gray-800">
                            {post.content}
                        </div>
                    )}

                    <div className="mt-6 flex items-center space-x-4 text-sm font-bold text-gray-500">
                        <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-1">
                            <button
                                onClick={() => handleVote(1)}
                                className={`rounded p-1 hover:bg-gray-200 hover:text-orange-500 ${post.user_vote?.value === 1 ? 'text-orange-500' : 'text-gray-400'}`}
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
                                className={`text-gray-900 ${
                                    post.user_vote?.value === 1
                                        ? 'text-orange-500'
                                        : post.user_vote?.value === -1
                                          ? 'text-indigo-500'
                                          : ''
                                }`}
                            >
                                {post.votes_sum_value || 0}
                            </span>
                            <button
                                onClick={() => handleVote(-1)}
                                className={`rounded p-1 hover:bg-gray-200 hover:text-indigo-500 ${post.user_vote?.value === -1 ? 'text-indigo-500' : 'text-gray-400'}`}
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
                <div className="rounded-b-md bg-gray-50 p-4 sm:p-6">
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
                        {commentsTree.length > 0 ? (
                            post.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment as any}
                                />
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

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black p-4">
                    <div className="relative w-full max-w-md rounded-lg bg-white shadow">
                        <div className="flex items-center justify-between rounded-t border-b p-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                Delete post?
                            </h3>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-600">
                                Once you delete this post, it can't be restored.
                            </p>
                        </div>
                        <div className="flex items-center justify-end rounded-b border-t border-gray-200 p-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="mr-3 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => {
                                    router.delete(`/posts/${post.id}`);
                                }}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
const commentsTree = useMemo(() => {
    if (!post.comments) return [];
    const commentMap: Record<number, Comment> = {};
    const roots: Comment[] = [];

    // Initialize map
    post.comments.forEach((c) => {
        commentMap[c.id] = { ...c, replies: [] };
    });

    // Build tree
    post.comments.forEach((c) => {
        if (c.parent_id) {
            if (commentMap[c.parent_id]) {
                commentMap[c.parent_id].replies!.push(commentMap[c.id]);
            }
        } else {
            roots.push(commentMap[c.id]);
        }
    });

    return roots;
}, [post.comments]);
