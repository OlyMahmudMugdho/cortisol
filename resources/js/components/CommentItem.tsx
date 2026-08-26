import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import CreateCommentForm from './CreateCommentForm';
import CommentVoteBlock from './CommentVoteBlock';
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
                        <CommentVoteBlock
                            commentId={comment.id}
                            votesSum={comment.votes_sum_value || 0}
                            userVote={comment.user_vote?.value || null}
                        />

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
                            <CreateCommentForm
                                postId={comment.post_id}
                                parentId={comment.id}
                                username={auth.user.username}
                                placeholder={`Replying to ${comment.user.username}...`}
                                onSuccess={() => setIsReplying(false)}
                                onCancel={() => setIsReplying(false)}
                                autoFocus={true}
                                rows={3}
                            />
                        </div>
                    )}
                </div>
            </div>

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
