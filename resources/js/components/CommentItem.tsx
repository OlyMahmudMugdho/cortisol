import React, { useState } from 'react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    parent_id: number | null;
    post_id: number;
    user: {
        id: number;
        username: string;
    };
    votes_sum_value: number | null;
    user_vote: {
        value: number;
    } | null;
    replies?: Comment[];
}

interface CommentItemProps {
    comment: Comment;
    depth?: number;
}

export default function CommentItem({ comment, depth = 0 }: CommentItemProps) {
    const { auth } = usePage<any>().props;
    const [isReplying, setIsReplying] = useState(false);

    const {
        data,
        setData,
        post: submitReplyPost,
        processing,
        errors,
        reset,
    } = useForm({
        content: '',
        parent_id: comment.id,
    });

    const submitReply = (e: React.FormEvent) => {
        e.preventDefault();
        submitReplyPost(`/posts/${comment.post_id}/comments`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
                setIsReplying(false);
            },
        });
    };

    const handleVote = (value: number) => {
        if (!auth?.user) {
            window.location.href = '/login';
            return;
        }
        router.post(
            `/comments/${comment.id}/vote`,
            { value },
            { preserveScroll: true },
        );
    };

    return (
        <div
            className={`flex flex-col ${depth > 0 ? 'mt-4 border-l-2 border-gray-100 pl-4' : ''}`}
        >
            <div className="flex space-x-3">
                <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500">
                        {comment.user.username.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center text-xs text-gray-500">
                        <Link
                            href={`/u/${comment.user.username}`}
                            className="mr-2 font-bold text-gray-900 hover:underline"
                        >
                            {comment.user.username}
                        </Link>
                        <span>{dayjs(comment.created_at).fromNow()}</span>
                    </div>
                    <div className="text-sm break-words whitespace-pre-wrap text-gray-800">
                        {comment.content}
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-xs font-bold text-gray-500">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleVote(1)}
                                className={`rounded p-1 hover:bg-gray-200 hover:text-orange-500 ${comment.user_vote?.value === 1 ? 'bg-gray-100 text-orange-500' : 'text-gray-400'}`}
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
                                        d="M5 15l7-7 7 7"
                                    />
                                </svg>
                            </button>
                            <span
                                className={`${
                                    comment.user_vote?.value === 1
                                        ? 'text-orange-500'
                                        : comment.user_vote?.value === -1
                                          ? 'text-indigo-500'
                                          : 'text-gray-900'
                                }`}
                            >
                                {comment.votes_sum_value || 0}
                            </span>
                            <button
                                onClick={() => handleVote(-1)}
                                className={`rounded p-1 hover:bg-gray-200 hover:text-indigo-500 ${comment.user_vote?.value === -1 ? 'bg-gray-100 text-indigo-500' : 'text-gray-400'}`}
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
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        </div>

                        {auth?.user && depth < 5 && (
                            <button
                                onClick={() => setIsReplying(!isReplying)}
                                className="flex items-center rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
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
                                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                    />
                                </svg>
                                Reply
                            </button>
                        )}
                    </div>

                    {isReplying && (
                        <div className="mt-4">
                            <form onSubmit={submitReply}>
                                <textarea
                                    rows={3}
                                    className="w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder={`Replying to ${comment.user.username}...`}
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                                {errors.content && (
                                    <div className="mt-1 text-xs text-red-500">
                                        {errors.content}
                                    </div>
                                )}
                                <div className="mt-2 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsReplying(false)}
                                        className="rounded-full px-4 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Recursively render replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 flex flex-col space-y-4">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
