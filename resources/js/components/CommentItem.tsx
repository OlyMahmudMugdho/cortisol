import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: {
        id: number;
        username: string;
    };
    votes_sum_value: number | null;
    user_vote: {
        value: number;
    } | null;
}

interface CommentItemProps {
    comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
    const { auth } = usePage<any>().props;

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
                <div className="mt-2 flex items-center space-x-2 text-xs font-bold text-gray-500">
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
            </div>
        </div>
    );
}
