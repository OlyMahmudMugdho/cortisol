import React from 'react';
import { router, usePage } from '@inertiajs/react';

interface CommentVoteBlockProps {
    commentId: number;
    votesSum: number;
    userVote: number | null;
}

export default function CommentVoteBlock({
    commentId,
    votesSum,
    userVote,
}: CommentVoteBlockProps) {
    const { auth } = usePage<any>().props;

    const handleVote = (value: number) => {
        if (!auth?.user) {
            window.location.href = '/login';
            return;
        }
        router.post(
            `/comments/${commentId}/vote`,
            { value },
            { preserveScroll: true },
        );
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => handleVote(1)}
                className={`rounded p-1 hover:bg-gray-200 hover:text-orange-500 ${userVote === 1 ? 'bg-gray-100 text-orange-500' : 'text-gray-400'}`}
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
                    userVote === 1
                        ? 'text-orange-500'
                        : userVote === -1
                          ? 'text-indigo-500'
                          : 'text-gray-900'
                }`}
            >
                {votesSum || 0}
            </span>
            <button
                onClick={() => handleVote(-1)}
                className={`rounded p-1 hover:bg-gray-200 hover:text-indigo-500 ${userVote === -1 ? 'bg-gray-100 text-indigo-500' : 'text-gray-400'}`}
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
    );
}
