import React from 'react';
import { router, usePage } from '@inertiajs/react';

interface PostVoteBlockProps {
    postId: number;
    votesSum: number;
    userVote: number | null;
    isVertical?: boolean;
}

export default function PostVoteBlock({
    postId,
    votesSum,
    userVote,
    isVertical = false,
}: PostVoteBlockProps) {
    const { auth } = usePage<any>().props;

    const handleVote = (value: number) => {
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

    const flexClass = isVertical ? 'flex-col' : 'space-x-1';
    const bgClass = isVertical
        ? 'bg-transparent'
        : 'bg-gray-100 rounded-full px-2 py-1';
    const activeColorClass = isVertical ? '' : 'text-orange-500';

    return (
        <div className={`flex items-center ${flexClass} ${bgClass}`}>
            <button
                onClick={() => handleVote(1)}
                className={`rounded p-1 hover:text-orange-500 ${!isVertical && 'hover:bg-gray-200'} ${
                    userVote === 1 ? 'text-orange-500' : 'text-gray-400'
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
                className={`${isVertical ? 'text-xs font-bold' : 'text-gray-900'} ${
                    userVote === 1
                        ? 'text-orange-500'
                        : userVote === -1
                          ? 'text-indigo-500'
                          : isVertical
                            ? 'text-gray-800'
                            : ''
                }`}
            >
                {votesSum || 0}
            </span>
            <button
                onClick={() => handleVote(-1)}
                className={`rounded p-1 hover:text-indigo-500 ${!isVertical && 'hover:bg-gray-200'} ${
                    userVote === -1 ? 'text-indigo-500' : 'text-gray-400'
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
    );
}
